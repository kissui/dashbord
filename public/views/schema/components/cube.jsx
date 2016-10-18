'use strict';
import React from 'react';
import http from '../../../lib/http';
import Dimensionmodule from './dimension';
import _ from 'lodash';
import SelectTest from '../components/formSelect';
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
                    let cubes,
                        currentCubeIndex,
                        dimensionIndex;
                    if (cubeConf.conf && cubeConf.name == 'editFile') {

                        cubes = cubeConf.conf.cubes.join('').split('.');
                        currentCubeIndex = _.findIndex(data.data, (o) => {
                            return o.id == cubes[0];
                        });
                        dimensionIndex = _.findIndex(data.data[currentCubeIndex].dimensions, (item) => {
                            return item.id == cubes[1]
                        });
                        this.props.onSaveCubeId(data.data[currentCubeIndex].id, data.data[currentCubeIndex].dimensions[dimensionIndex]);
                    } else {
                        this.props.onSaveCubeId(data.data[0].id, data.data[0].dimensions[0])
                    }
                    this.setState({
                        cubeData: data.data,
                        defaultCubeIndex: currentCubeIndex ? currentCubeIndex : 0,
                        defaultDimensionIndex: dimensionIndex ? dimensionIndex : 0,
                        cubeId: cubes ? cubes[0] : 0,
                        dimensionId: cubes ? cubes[1] : 0
                    });


                }
            })
    },
    handleCheckBox: function (value, i) {
        this.props.onChecked(value, i)
    },
    handleChangeCube: function (conf) {
        this.setState({
            defaultCubeIndex: conf.selectedIndex,
            defaultDimensionIndex: 0
        });
        this.props.onSaveCubeId(this.state.cubeData[conf.selectedIndex].id, this.state.cubeData[conf.selectedIndex].dimensions[0])
    },
    handleChangeDimension: function (conf) {
        this.setState({
            defaultDimensionIndex: conf.selectedIndex,
        })
    },
    render: function () {
        let selectedCubeData;
        let selectedDimensionData;
        let currentDimensionData;
        if (this.state.cubeData) {
            selectedCubeData = this.state.cubeData;
            selectedDimensionData = selectedCubeData[this.state.defaultCubeIndex].dimensions;
            currentDimensionData = selectedDimensionData[this.state.defaultDimensionIndex];
        }
        return (
            <div className="folder-body shim">
                <div className="body-header">
                    <h2>选择数据源:</h2>
                    <div className="cube-add">
                        <i className="fa fa-plus-square"></i>
                    </div>
                </div>
                <div className="form-inline">
                    <div className="form-group">
                        <label>选择数据源:</label>
                        <SelectTest
                            initData={selectedCubeData}
                            defaultText="暂无数据源"
                            selectIndex={this.state.cubeId}
                            onSaveData={this.handleChangeCube}
                        />
                    </div>
                    <div className="form-group pl-25">
                        <label>选择CUBE:</label>
                        <SelectTest
                            initData={selectedDimensionData}
                            defaultText="暂无CUBE"
                            selectIndex={this.state.dimensionId}
                            onSaveData={this.handleChangeDimension}
                        />
                    </div>

                </div>
                <Dimensionmodule
                    onData={currentDimensionData}
                    defaultText="暂无数据"
                    onSingleChecked={this.handleCheckBox}
                />
            </div>
        )
    }
});