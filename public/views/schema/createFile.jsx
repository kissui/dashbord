'use strict';
import React from "react";
import http from "../../lib/http";
import Folder from "./components/folder";
import Cube from "./components/cube";
import HeadPage from "./components/file";
import HandleTablePage from './components/handleTable';
import Drag from './components/drag';
module.exports = React.createClass({
    getInitialState: function () {
        return {
            isForbid: false
        }
    },
    handleGetCubeId: function (cubeConf) {
        this.setState({
            cubeConf: cubeConf
        });

    },
    handleFolderId: function (id) {
        this.setState({
            folderId: id,
        })
    },
    handleCommit: function (conf) {
        let value = this.state.fileName;
        let state = this.state;
        let path;
        let cubes = [];
        state.cubeConf.map((item, i)=> {
            cubes.push(item.cubes)
        });
        let dimension_fields = [];
        let data_fields = [];
        state.cubeConf.map((item, i)=> {
            dimension_fields = _.concat(dimension_fields, item.fields.dimension_fields);
            data_fields = _.concat(data_fields, item.fields.data_fields);
        });

        _.remove(data_fields,(item)=>{
            return item.selected === false
        });
        let data = {
            'folder_id': state.folderId,
            'title': value,
            'cubes': cubes,
            'cube_conf': state.cubeConf,
            'table_conf': {
                'fields': {
                    'dimension_fields': dimension_fields,
                    'data_fields': data_fields
                },
            }
        };
        if (conf && conf.name === 'editFile') {
            path = '/api/?c=table.tables&ac=update&id=' + conf.conf.id;
            data.title = this.state.fileName ? this.state.fileName : conf.conf.title;
        } else {
            path = '/api/?c=table.tables&ac=add';

        }
        http.post(path, data)
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
        this.setState({
            cubeConf: tempCube
        });
    },
    handleCancel: function () {
        this.props.onCancel();
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
                    {<Cube
                        onGetCubeConf={this.props.onConf}
                        onSaveCubeId={this.handleGetCubeId}
                        onChecked={this.handleCheckBox}
                    />}
                    <HandleTablePage/>
                    {/*<Drag onTable={this.props.onConf}/>*/}
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