'use strict';
import React from "react";
import http from "../../../lib/http";
import Folder from "../components/folder";
import CubeModule from './widget/cube';
import HeadPage from "./widget/newHead";
import HandleTablePage from '../components/handleTable';
import DragModdule from './widget/drag';
import Loadingpage from '../../../components/loading/loading';
import Utils from '../../../lib/utils';
module.exports = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function () {
		return {
			loading: false
		}
	},
	componentDidMount: function () {
		const {onParams} = this.props;
		if (onParams.fileId) {
			http.get('/api/?c=table.tables&ac=index&id=' + onParams.fileId)
				.then(data => data.data)
				.then((data) => {
					if (data.errcode === 10000) {
						if (data.data && data.msg === 'success') {
							this.setState({
								initialFileConf: data.data
							})
						}
					}
				});
		} else {
			this.setState({
				loading: true
			})
		}

	},
	handleGetCubeId: function (cubeConf, tableConf) {
		const {onParams} = this.props;
		onParams.tableConf = tableConf;
		let data_fields = [];
		cubeConf.map((item, i)=> {
			data_fields = item.fields.data_fields ? _.concat(data_fields, item.fields.data_fields) : [];
		});
		if (data_fields && data_fields.length > 0) {
			_.remove(data_fields, (item)=> {
				return item.selected === false
			});
		}
		let defaultDataFields;
		if (tableConf && _.has(tableConf, 'fields')) {
			defaultDataFields = tableConf.fields.data_fields;
		} else {
			defaultDataFields = data_fields;
		}
		this.setState({
			cubeConf: cubeConf,
			dragConf: defaultDataFields
		});

	},
	handleFolderId: function (id) {
		this.setState({
			folderId: id,
		})
	},
	handleCommit: function (conf) {
		const {fileName, cubeConf, folderId, dragConf, tableOptionConf} = this.state;
		let path;
		let data_fields = [];
		if (!dragConf) {
			cubeConf.map((item, i)=> {
				data_fields = _.concat(data_fields, item.fields.data_fields);
			});
			_.remove(data_fields, (item)=> {
				return item.selected === false
			});
		} else {
			data_fields = this.state.dragConf;
		}

		let dimension_fields = cubeConf[0].fields.dimension_fields;
		console.log(fileName, cubeConf, folderId, dragConf, tableOptionConf);
		let data = {
			'folder_id': folderId,
			'title': fileName,
			'cube_conf': cubeConf,
			'table_conf': {
				'fields': {
					'dimension_fields': dimension_fields,
					'data_fields': data_fields
				},
				'sum': _.isObject(tableOptionConf) ? tableOptionConf.sum : false,
				'mean': _.isObject(tableOptionConf) ? tableOptionConf.mean : false
			}
		};
		if (conf && conf.name === 'update') {
			path = '/api/?c=table.tables&ac=update&id=' + conf.fileId;
			data.title = fileName;
		} else {
			path = '/api/?c=table.tables&ac=add';

		}
		http.post(path, data)
			.then(data=>data.data)
			.then((data)=> {
				if (data.errcode === 10000) {
					let res = data.data;
					this.context.router.push({
						pathname: '/group/table/report/'+ res.folder_id +'/' + res.id,
						state: {
							folderId: res.folder_id,
							fileId: res.id
						}
					})
				} else {
					console.log(data);
					Utils.delayPop(data.msg, 2000);
				}
			})
	},
	handleSetName: function (value) {
		this.setState({
			fileName: value
		})
	},
	handleCheckBox: function (value, index, cubeIndex) {
		let tempCube = this.state.cubeConf;
		let tempFields = tempCube[cubeIndex].fields;
		let dataFields = tempCube[cubeIndex].fields.data_fields;
		dataFields.map((item, i)=> {
			if (i === index) {
				item.selected = value
			}
		});
		tempFields.data_fields = dataFields;
		// 处理drag事件的数据
		if (value === true) {
			this.setState({
				dragConf: _.concat(this.state.dragConf, tempCube[cubeIndex].fields.data_fields[index])
			})
		} else {
			this.setState({
				dragConf: _.remove(this.state.dragConf, (item)=> {
					return item.title != tempCube[cubeIndex].fields.data_fields[index].title
				})
			});
		}
		this.setState({
			cubeConf: tempCube,
			dragStart: false
		});

	},
	handleChangeTableConf: function (conf) {
		console.log(conf);
		this.setState({
			tableOptionConf: conf
		})
	},
	handleSaveDragConf: function (conf) {
		this.setState({
			dragConf: conf
		})
	},
	handleReceiveDateRange: function (dateRange) {
		console.log(dateRange)
	},
	render: function () {
		let onConf = this.props.onParams, content = <Loadingpage/>;
		const {dragConf, dragStart, initialFileConf} = this.state;
		if (onConf.fileId) {
			onConf.name = 'update';
			onConf.initFileConf = initialFileConf;
		} else {
			onConf.name = 'new';
		}
		if (initialFileConf || this.state.loading) {
			content = (
				<div>
					<div className="file-body">
						<HeadPage
							onReceiveFileName={this.handleSetName}
							onTypeConf={onConf}
							onReceiveFolderId={this.handleFolderId}
						/>
						{/*<Folder onFolderId={this.handleFolderId}/>*/}
						<CubeModule
							onGetCubeConf={onConf}
							onSaveCubeId={this.handleGetCubeId}
							onChecked={this.handleCheckBox}
						/>
						<HandleTablePage
							onChange={this.handleChangeTableConf}
							onConf={onConf}
							onReceiveDateRange={this.handleReceiveDateRange}
						/>
						<DragModdule
							onDefaultConf={onConf}
							onChangeConf={dragConf}
							onIsFirst={dragStart}
							onHandleDrag={this.handleSaveDragConf}
						/>
					</div>
					<div className="file-footer text-center">
						<button className="btn btn-primary"
								onClick={this.handleCommit.bind(this, onConf)}>
							保存
						</button>
					</div>
				</div>
			)
		}
		return (
			<div className="create-file">
				{content}
			</div>
		)
	}
})
;