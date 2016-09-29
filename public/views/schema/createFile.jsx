'use strict';
import React from 'react';
import http from '../../lib/http';
import Folder from './components/folder';
import Cube from './components/cube';
var extend = function (out) {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
        var obj = arguments[i];

        if (!obj)
            continue;

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object')
                    out[key] = extend(out[key], obj[key]);
                else
                    out[key] = obj[key];
            }
        }
    }

    return out;
};
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
        let value = this.refs.fileName.value;
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
        let data = {
            'folder_id': state.folderId,
            'title': value,
            'cubes': [cubes],
            'fields': fields
        };
        http.post('/api/?c=table.tables&ac=add', data)
            .then(data=>data.data)
            .then((data)=> {
                if(data.errcode === 10000) {
                    this.props.onState(data.data.id,state.folderId)
                }
            })
    },
    handleSetName: function () {
        if (this.refs.fileName.value) {
            this.setState({
                isForbid: this.refs.fileName.value
            })
        }
    },
    render: function () {
        console.log('@createFileState;;;;;;;;', this.state);
        return (
            <div className="create-file">
                <div className="file-body">
                    <div className="row shim">
                        <div className="col-md-10">
                            <input type="text"
                                   className="form-control"
                                   placeholder="请输入你要创建的工作表名称"
                                   ref="fileName"
                                   onChange={this.handleSetName}
                            />
                        </div>
                        <label className="col-md-2 control-label">工作表名称:</label>
                    </div>
                    <Folder onFolderId={this.handleFolderId}/>
                    <Cube
                        onSaveCubeId={this.handleGetCubeId}
                        onSaveDimesionId={this.handleGetDimensionId}
                    />
                </div>
                <button className="btn btn-primary"
                        disabled={!this.state.isForbid && 'disabled'}
                        onClick={this.handleCommit}>
                    保存
                </button>
            </div>
        )
    }
});