'use strict';
import React from "react";
import http from "../../lib/http";
import Folder from "./components/folder";
import Cube from "./components/cube";
import HeadPage from "./components/file";
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
        let fields = [];
        state.cubeConf.map((item, i)=> {
            fields = _.concat(fields, item.fields.dimension_fields.concat(item.fields.data_fields));
        });
        fields.map((item, i)=> {
            item["seq_no"] = i;
        });
        let data = {
            'folder_id': state.folderId,
            'title': value,
            'cubes': cubes,
            'cube_conf': state.cubeConf,
            'fields': fields
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
    handleCheckBox: function (value, i) {
        let state = this.state;
        let dataFieldsLen = state.dimension.data_fields.length;
        let dimensionLen = state.dimension.dimension_fields.length;
        let defaultChecked = [];
        for (let df = 0; df < dimensionLen; df++) {
            defaultChecked.push(true);
        }
        let checkedField = [];
        if (!this.state.dataFieldsChecked) {
            for (let d = 0; d < dataFieldsLen; d++) {
                if (d === i) {
                    checkedField.push(false);
                } else {
                    checkedField.push(true)
                }

            }
            this.setState({
                dataFieldsChecked: checkedField,
                totalFieldChecked: defaultChecked.concat(checkedField)
            })
        } else {
            let temp = this.state.dataFieldsChecked;
            for (let f = 0; f < dataFieldsLen; f++) {
                if (i === f) {
                    temp[i] = value;
                    this.setState({
                        dataFieldsChecked: temp,
                        totalFieldChecked: defaultChecked.concat(temp)
                    })
                }
            }
        }
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