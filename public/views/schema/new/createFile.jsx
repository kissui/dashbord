'use strict';
import React from "react";
import http from "../../../lib/http";
import Folder from "./components/folder";
import Cube from "./components/cube";
import HeadPage from "./components/file";
import HandleTablePage from './components/handleTable';
import Drag from './components/drag';
module.exports = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function () {
		return {
			isForbid: false,
			fileDetail: this.props.onFileDetail,
		}
	},
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			fileDetail: nextProps.onFileDetail
		})
	},
	componentDidMount: function () {
		this.setState({
			folderList: JSON.parse(sessionStorage.getItem('SIDEBAR_LIST')),
			fileCubeConf: JSON.parse(sessionStorage.getItem('SCHEMA_FILE_DETAIL'))
		});
	},
	handleGetCubeId: function (cubeConf, editChangeState) {
		const {fileCubeConf, fileDetail} = this.state;
		let data_fields = [];
		cubeConf.map((item, i)=> {
			if (item.fields.data_fields)
				data_fields = _.concat(data_fields, item.fields.data_fields);
		});
		if (data_fields && data_fields.length > 0) {
			_.remove(data_fields, (item)=> {
				return item.selected === false
			});
		}
		let defaultDataFields;
		if (fileDetail.fileOpType === 'edit') {
			if (fileCubeConf.table_conf && _.has(fileCubeConf.table_conf, 'fields')) {
				defaultDataFields = fileCubeConf.table_conf.fields.data_fields;
			}
		}
		console.log(fileDetail, defaultDataFields, data_fields)

		this.setState({
			cubeConf: cubeConf,
			dragConf: editChangeState ? data_fields : defaultDataFields ? defaultDataFields : data_fields
		});

	},

	handleCommit: function (conf) {
		let value = this.state.fileName;
		let state = this.state;
		let path;
		let data_fields = [];
		if (!this.state.dragConf) {
			state.cubeConf.map((item, i)=> {
				data_fields = _.concat(data_fields, item.fields.data_fields);
			});
			_.remove(data_fields, (item)=> {
				return item.selected === false
			});
		} else {
			data_fields = this.state.dragConf;
		}

		let dimension_fields = state.cubeConf[0].fields.dimension_fields;
		console.log(state.folderId, '@state.folderId');
		let data = {
			'folder_id': state.folderId,
			'title': value,
			'cube_conf': state.cubeConf,
			'table_conf': {
				'date_conf': {
					data_cycle_type: state.dateCycleType,
					default_date_range: '7',
				},
				'fields': {
					'dimension_fields': dimension_fields,
					'data_fields': data_fields
				},
				'sum': _.isObject(state.tableOptionConf) ? state.tableOptionConf.sum : false,
				'mean': _.isObject(state.tableOptionConf) ? state.tableOptionConf.mean : false
			}
		};
		// return;
		if (state.fileDetail.fileOpType === 'edit') {
			path = '/api/?c=table.tables&ac=update&id=' + state.fileDetail.fileId;
			data.title = this.state.fileName ? this.state.fileName : conf.conf.title;
		} else {
			path = '/api/?c=table.tables&ac=add';

		}
		http.post(path, data)
			.then(data=>data.data)
			.then((data)=> {
				if (data.errcode === 10000) {
					this.context.router.push({
						pathname: '/index/report/schema/' + state.fileDetail.folderId + '/' + data.data.id
					});
					// this.props.onState(data.data.id, state.folderId)
				}
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
	handleReceiveCycle: function (value) {
		this.setState({
			dateCycleType: value
		});
		console.log('@selectBox: ', value);
	},
	handleCancel: function () {
		this.props.onCancel();
	},
	handleChangeTableConf: function (conf) {
		this.setState({
			tableOptionConf: conf
		})
	},
	handleSaveDragConf: function (conf) {
		this.setState({
			dragConf: conf
		})
	},
	/** receive report head conf**/
	handleReceiveHeadConf: function (conf) {
		const {fileDetail} = this.state;
		this.setState({
			fileName: conf.fileName,
			folderId: conf.folderId,
			fileDetail: {
				fileOpType: fileDetail.fileOpType,
				folderId: conf.folderId
			}
		})
	},
	/** end **/
	render: function () {
		const {fileDetail, folderList, fileCubeConf} = this.state;
		return (
			<div className="create-file">
				<div className="shim">
					<h4>{fileDetail.fileOpType === 'edit' ? '编辑工作表' : "添加工作表"}</h4>
				</div>
				<div className="file-body">
					{folderList && <HeadPage onReceiveHeadConf={this.handleReceiveHeadConf}
											 onFolderList={folderList}
											 onFileDetail={fileDetail}
					/>}
					{fileCubeConf && <Cube
						onFileCubeConf={fileCubeConf}
						onSaveCubeId={this.handleGetCubeId}
						onChecked={this.handleCheckBox}
						onFileDetail={fileDetail}
					/>}
					{/*<HandleTablePage*/}
					{/*onChange={this.handleChangeTableConf}*/}
					{/*onReceiveCycle={this.handleReceiveCycle}*/}
					{/*onConf={this.props.onConf}*/}
					{/*/>*/}
					{fileDetail && <Drag
						onFileDetail={fileDetail}
						onFileParams={fileCubeConf}
						onChangeConf={this.state.dragConf}
						onIsFirst={this.state.dragStart}
						onHandleDrag={this.handleSaveDragConf}
					/>}
				</div>
				<div className="file-footer text-center">
					<button className="btn btn-primary"
							onClick={this.handleCommit.bind(this, this.props.onConf)}>
						保存
					</button>
					<button className="btn btn-default"
							onClick={this.handleCancel}>
						取消
					</button>
				</div>
			</div>
		)
	}
})
;