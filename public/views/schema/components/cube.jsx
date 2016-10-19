'use strict';
import React from 'react';
import http from '../../../lib/http';
import Dimensionmodule from './dimension';
import _ from 'lodash';
import SelectTest from '../components/formSelect';
import cube from '../../../components/cube/cube';
module.exports = React.createClass({
    getInitialState: function () {
        return {
            fileState: null,

        }
    },
    componentDidMount: function () {
        this.getCubeData(this.props.onGetCubeConf);
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.onGetCubeConf) {
            // console.log('@cubeConf',nextProps.onGetCubeConf)
        }
    },
    getCubeData: function (cubeConf) {
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
                    if (cubeConf.conf && cubeConf.name == 'editFile') {
                        let editCubeConf = JSON.parse(sessionStorage.getItem('SCHEMA_FILE_DETAIL')).cube_conf;
                        this.setState({
                            cubeData: data.data,
                            tempCubeConf: editCubeConf,
                            initCubeConf: [tempCubeConf]
                        });
                        this.props.onSaveCubeId(editCubeConf)
                    } else {
                        // this.props.onSaveCubeId(data.data[0].id, data.data[0].dimensions[0])
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
    setChangeCube: function (data, conf, index) {

        let defaultCube = this.state.cubeData;
        if (conf.linkWork == 'cube') {
            let dimension = defaultCube[conf.selectedIndex].dimensions[0];
            data[index] = {
                cube_id: conf.value,
                dimension_id: dimension.id,
                cubeIndex: conf.selectedIndex,
                cubes: conf.value + '.' + dimension.id,
                dimensionIndex: 0,
                title: dimension.title,
                fields: _.assign({}, {
                    data_fields: dimension.data_fields,
                    dimension_fields: dimension.dimension_fields,
                })
            }
        } else {
            let cubeId = data[index].cube_id;
            let cubeIndex = _.findIndex(defaultCube, (item)=> {
                return item.id === cubeId;
            });
            let dimension = defaultCube[cubeIndex].dimensions[conf.selectedIndex]
            data[index] = {
                dimension_id: conf.value,
                cubes: data[index].cube_id + '.' + conf.value,
                cubeIndex: cubeIndex,
                dimensionIndex: conf.selectedIndex,
                title: dimension.title,
                fields: _.assign({}, {
                    data_fields: dimension.data_fields,
                    dimension_fields: dimension.dimension_fields,
                })
            }
        }
        return data
    },
    handleChangeCube: function (conf, index) {
        let initCubeDefaultData = this.state.tempCubeConf;
        let CUBE = new cube(this.state.cubeData);
        this.setState({
            tempCubeConf: CUBE.selectedData(initCubeDefaultData, conf, index),
        });
        this.props.onSaveCubeId(CUBE.selectedData(initCubeDefaultData, conf, index))
    },
    handleChangeDimension: function (conf, index) {
        let initCubeDefaultData = this.state.tempCubeConf;
        let CUBE = new cube(this.state.cubeData);
        this.setState({
            tempCubeConf: CUBE.selectedData(initCubeDefaultData, conf, index),
        });
        this.props.onSaveCubeId(CUBE.selectedData(initCubeDefaultData, conf, index))
    },
    handleAddCube: function () {
        this.setState({
            tempCubeConf: _.concat(this.state.tempCubeConf, this.state.initCubeConf)
        })
    },
    render: function () {
        let content;
        if (this.state.tempCubeConf) {
            content = this.state.tempCubeConf.map((item, key) => {
                return (
                    <div className="shim" key={key}>
                        <div className="cube-delete">
                            <i className="fa fa-minus"></i>
                        </div>
                        <div className="form-inline">
                            <div className="form-group">
                                <label>选择数据源:</label>
                                <SelectTest
                                    initData={this.state.cubeData}
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
                                    initData={this.state.cubeData[item.cubeIndex].dimensions}
                                    defaultText="暂无CUBE"
                                    onIndex={key}
                                    linkWork="dimension"
                                    selectIndex={item.dimension_id ? item.dimension_id : 0}
                                    onSaveData={this.handleChangeDimension}
                                />
                            </div>
                        </div>
                        <Dimensionmodule
                            onData={this.state.cubeData[item.cubeIndex].dimensions[item.dimensionIndex]}
                            defaultText="暂无数据"
                            onIndex={key}
                            onOperatePage={this.props.onGetCubeConf.name}
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