'use strict';
import React from 'react';
import http from '../../lib/http';
import Folder from './components/folder';
import Cube from './components/cube';
import HeadPage from './components/file';
module.exports = React.createClass({
    getInitialState: function () {
        return {
            isForbid: false
        }
    },
    handleGetCubeId: function (id, dimensions) {
        this.setState({
            cubeId: id,
            dimensionId: dimensions[0].id,
            dimension: dimensions[0]
        })
    },
    handleGetDimensionId: function (id, dimension) {
        this.setState({
            dimensionId: id,
            dimension: dimension,
        })
    },
    handleFolderId: function (id) {
        this.setState({
            folderId: id,
        })
    },
    handleCommit: function () {
        let value = this.state.fileName;
        let state = this.state;
        let cubes = state.cubeId + "." + state.dimensionId;
        let fields = [];
        let tempArr = state.dimension.dimension_fields.concat(state.dimension.data_fields)
        for (let i = 0; i < tempArr.length; i++) {
            let tempObject = {};
            fields.push((function (i) {
                tempObject["val_conf"] = cubes + '.' + tempArr[i].field_id;
                tempObject["seq_no"] = i;
                tempObject['selected'] = true;
                return tempObject
            })(i))
        }
        console.log('@postData: ', this.state);
        let data = {
            'folder_id': state.folderId,
            'title': value,
            'cubes': [cubes],
            'fields': fields
        };
        http.post('/api/?c=table.tables&ac=add', data)
            .then(data=>data.data)
            .then((data)=> {
                if (data.errcode === 10000) {
                    this.props.onState(data.data.id, state.folderId)
                }
            })
    },
    handleSetName: function (value) {
        this.setState({
            fileName: value
        })
    },
    render: function () {
        return (
            <div className="create-file">
                <div className="file-body">
                    <HeadPage onSetName={this.handleSetName}
                              onHeadConf={this.props.onConf}
                              onFolderId={this.handleFolderId}
                    />
                    {this.props.onConf.name === 'globalFile' && <Folder onFolderId={this.handleFolderId}/>}
                    <Cube
                        onSaveCubeId={this.handleGetCubeId}
                        onSaveDimesionId={this.handleGetDimensionId}
                    />
                </div>
                <button className="btn btn-primary"
                        onClick={this.handleCommit}>
                    保存
                </button>
            </div>
        )
    }
});