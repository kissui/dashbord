'use strict';
import React from 'react';
import http from '../../../../lib/http';
import Dimensionmodule from './dimension';
import _ from 'lodash';
import SelectTest from '../components/formSelect';
import cube from '../../../../components/cube/cube';
module.exports = React.createClass({
	getInitialState: function () {
		return {
			fileState: null,
			fileDetail: this.props.onFileDetail
		}
	},
	componentDidMount: function () {
		const {onFileDetail, onFileCubeConf} = this.props;
		this.getCubeData(onFileDetail, onFileCubeConf.cube_conf);
	},
	componentWillReceiveProps: function (nextProps) {
		if (nextProps.onGetCubeConf) {
			// console.log('@cubeConf',nextProps.onGetCubeConf)
		}
	},
	getCubeData: function (fileDetail, cubeConf) {
		http.get('/api/?c=cube.cubes&ac=index')
			.then(data=>data.data)
			.then((data)=> {
				if (data.errcode === 10000) {
					let tempCubeConf = _.assign({}, {
						cubes: data.data[0].id + '.' + data.data[0].dimensions[0].id,
						cube_id: data.data[0].id,
						dimension_id: data.data[0].dimensions[0].id,
						cubeIndex: 0,
						dimensionIndex: 0,
						title: data.data[0].dimensions[0].title,
						fields: _.assign({}, {
							data_fields: data.data[0].dimensions[0].data_fields,
							dimension_fields: data.data[0].dimensions[0].dimension_fields,
						})
					});
					if (fileDetail && fileDetail.fileOpType == 'edit') {
						this.setState({
							cubeData: data.data,
							tempCubeConf: cubeConf,
							initCubeConf: [tempCubeConf]
						});
						this.props.onSaveCubeId(cubeConf)
					} else {
						this.setState({
							cubeData: data.data,
							tempCubeConf: [tempCubeConf],
							initCubeConf: [tempCubeConf]
						});
						this.props.onSaveCubeId([tempCubeConf])
					}

				}
			})
	},
	handleCheckBox: function (value, i, cubeIndex) {
		this.props.onChecked(value, i, cubeIndex)
	},
	handleChangeCube: function (conf, index) {
		const {tempCubeConf, cubeData, fileDetail, changeDragList} = this.state;
		let initCubeDefaultData = tempCubeConf;
		let CUBE = new cube(cubeData);
		let cubeList = CUBE.selectedData(initCubeDefaultData, conf, index);
		this.setState({
			tempCubeConf: cubeList,
			isChange: true,
		});
		if (fileDetail.fileOpType == 'edit' && changeDragList) {
			this.props.onSaveCubeId(cubeList,'change')
		} else {
			this.props.onSaveCubeId(cubeList)
		}

	},
	handleChangeDimension: function (conf, index) {
		const {tempCubeConf, cubeData, fileDetail, changeDragList} = this.state;
		let CUBE = new cube(cubeData);
		let cubeList = CUBE.selectedData(tempCubeConf, conf, index);
		this.setState({
			tempCubeConf: cubeList,
			isChange: true,
		});
		if(fileDetail.fileOpType ==='edit' && changeDragList) {
			this.props.onSaveCubeId(cubeList,'change')
		} else {
			this.props.onSaveCubeId(cubeList)
		}

	},
	handleAddCube: function () {
		this.setState({
			tempCubeConf: _.concat(this.state.tempCubeConf, this.state.initCubeConf),
			changeDragList: true
		});
	},
	handleDeleteCube: function (index) {

		let temp = this.state.tempCubeConf;
		_.remove(temp, (current, key)=> {
			return key == index
		});
		this.setState({
			tempCubeConf: temp,
			changeDragList: false
		});
		this.props.onSaveCubeId(temp)
	},
	render: function () {
		const {fileDetail, tempCubeConf, cubeData, isChange} = this.state;
		let content;
		if (tempCubeConf) {
			content = tempCubeConf.map((item, key) => {
				return (
					<div className="shim" key={key}>
						{tempCubeConf.length > 1 &&
						<div className="cube-delete" onClick={this.handleDeleteCube.bind(null, key)}>
							<i className="fa fa-minus"></i>
						</div>}
						<div className="form-inline">
							<div className="form-group">
								<label>选择数据源:</label>
								<SelectTest
									initData={cubeData}
									defaultText="暂无数据源"
									onIndex={key}
									linkWork="cube"
									selectIndex={item.cube_id}
									onSaveData={this.handleChangeCube}
								/>
							</div>
							<div className="form-group pl-25">
								<label>选择CUBE:</label>
								<SelectTest
									initData={cubeData[item.cubeIndex].dimensions}
									defaultText="暂无CUBE"
									onIndex={key}
									linkWork="dimension"
									selectIndex={item.dimension_id ? item.dimension_id : 0}
									onSaveData={this.handleChangeDimension}
								/>
							</div>
						</div>
						<Dimensionmodule
							onData={cubeData[item.cubeIndex].dimensions[item.dimensionIndex]}
							defaultText="暂无数据"
							onChange={isChange}
							onIndex={key}
							onOperatePage={fileDetail.fileOpType}
							onSingleChecked={this.handleCheckBox}
						/>
					</div>
				)
			})
		}
		return (
			<div className="folder-body shim">
				<div className="body-header">
					<h2>选择数据源:</h2>
					<div className="cube-add" onClick={this.handleAddCube}>
						<i className="fa fa-plus-square"></i>
					</div>
				</div>
				{content}
			</div>
		)
	}
});