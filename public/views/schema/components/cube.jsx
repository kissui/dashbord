'use strict';
import React from 'react';
import http from '../../../lib/http';

module.exports = React.createClass({
    getInitialState: function () {
        return {
            fileState: null,

        }
    },
    componentDidMount: function () {
        this.getCubeData();
    },
    getCubeData: function () {
        http.get('/api/?c=cube.cubes&ac=index')
            .then(data=>data.data)
            .then((data)=> {
                console.log('@cubeData: ', data);
                if (data.errcode === 10000) {
                    this.setState({
                        cubeData: data.data
                    });
                    this.props.onSaveCubeId(data.data[0].id, data.data[0].dimensions)
                }
            })
    },
    onChangeFirst: function () {
        let cube = this.state.cubeData;
        let id = this.refs.first.value;
        this.setState({
            cubeSelectSecond: cube[id].dimensions,
            firstId: cube[id].id,
            firstIndex: id
        });
        this.props.onSaveCubeId(cube[id].id, cube[id].dimensions)
    },
    onChangeSecond: function () {
        let cube = this.state.cubeData;
        let firstIndex = this.state.firstIndex;
        let secondIndex = this.refs.second.value;
        this.setState({
            dimension: cube[firstIndex].dimensions[secondIndex],
            dimensionIndex: secondIndex
        });
        this.props.onSaveDimesionId(cube[firstIndex].dimensions[secondIndex].id,cube[firstIndex].dimensions[secondIndex]);
        console.log(cube[firstIndex].dimensions[secondIndex].id, 'cube[firstIndex]')
    },
    render: function () {
        let list = null,
            cubeFirstSelect,
            cubeSecondSelect;
        let firstIndex = this.state.firstIndex ? this.state.firstIndex : 0;
        let dimension = this.state.dimension,
            dataField,
            dimensionField;
        if (this.state.cubeData) {
            console.log('@firstIndex: ', this.state.firstIndex);
            cubeFirstSelect = this.state.cubeData.map((item, i)=> {
                return (
                    <option value={i} key={i}>{item.name}</option>
                )
            });
            if (this.state.cubeData[firstIndex].dimensions[0] === 1) {
                cubeSecondSelect = <option>暂无可选CUBE</option>;
                dataField = <td>暂无指标</td>;
                dimensionField = <td>暂无指标</td>
            }

        }
        if (this.state.cubeSelectSecond) {

            let changeDimension = this.state.cubeSelectSecond[0];
            if (changeDimension != 1) {
                console.log('@secondIndex: ', this.state.dimensionIndex, this.state.firstIndex);
                cubeSecondSelect = this.state.cubeSelectSecond.map((item, i)=> {
                    if (item === 1) return <option value="0" key={i}>暂无可选CUBE</option>;
                    return (
                        <option value={i} key={i}>{item.title}</option>
                    )
                });
                dataField = changeDimension.data_fields.map((item, i)=> {
                    return (
                        <td key={i}>
                            {item.title}
                        </td>
                    )
                });
                dimensionField = changeDimension.dimension_fields.map((item, i)=> {
                    return (
                        <td key={i}>
                            {item.title}
                        </td>
                    )
                })
            } else {
                console.log('@second2Index: ', this.state.dimensionIndex, this.state.firstIndex);
                dataField = <td>暂无指标</td>;
                dimensionField = <td>暂无指标</td>
            }
        }
        if (dimension && this.state.cubeSelectSecond[0] != 1) {
            dataField = dimension.data_fields.map((item, i)=> {
                return (
                    <td key={i}>
                        {item.title}
                    </td>
                )
            });
            dimensionField = dimension.dimension_fields.map((item, i)=> {
                return (
                    <td key={i}>
                        {item.title}
                    </td>
                )
            })
        }
        return (
            <div className="folder-body shim">
                <div className="body-header">
                    <h2>选择数据源:</h2>
                </div>
                <div className="form-inline">
                    <label>选择数据源:</label>
                    <select ref="first" className="form-control" onChange={this.onChangeFirst}>
                        {cubeFirstSelect}
                    </select>
                    <label>选择CUBE:</label>
                    <select ref="second" className="form-control" onChange={this.onChangeSecond}>
                        {cubeSecondSelect}
                    </select>
                </div>
                <div className="row padding">
                    <div className="col-md-6">
                        <div className="table-responsive">
                            <table className="table">
                                <tbody>
                                <tr>
                                    {dataField}
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="table-responsive">
                            <table className="table">
                                <tbody>
                                <tr>
                                    {dimensionField}
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});