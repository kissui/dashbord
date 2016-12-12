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
        let data_fields = [];
        let sessionConf = JSON.parse(sessionStorage.getItem('SCHEMA_FILE_DETAIL'));
        cubeConf.map((item, i)=> {
            data_fields = _.concat(data_fields, item.fields.data_fields);
        });
        if (data_fields && data_fields.length > 0) {
            _.remove(data_fields, (item)=> {
                return item.selected === false
            });
        }
        let defaultDataFields;
        if(sessionConf.table_conf && _.has(sessionConf.table_conf,'fields')) {
            defaultDataFields = JSON.parse(sessionStorage.getItem('SCHEMA_FILE_DETAIL')).table_conf.fields.data_fields;
        }
        this.setState({
            cubeConf: cubeConf,
            dragConf: defaultDataFields ? defaultDataFields : data_fields
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
        let data = {
            'folder_id': state.folderId,
            'title': value,
            'cube_conf': state.cubeConf,
            'data_cycle_type': state.dateCycleType,
            'table_conf': {
                'fields': {
                    'dimension_fields': dimension_fields,
                    'data_fields': data_fields
                },
                'sum': _.isObject(state.tableOptionConf) ? state.tableOptionConf.sum : false,
                'mean': _.isObject(state.tableOptionConf) ? state.tableOptionConf.mean : false
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
        console.log('@selectBox: ',value);
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
                    <HandleTablePage
                        onChange={this.handleChangeTableConf}
                        onReceiveCycle={this.handleReceiveCycle}
                        onConf={this.props.onConf}
                    />
                    <Drag
                        onDefaultConf={this.props.onConf}
                        onChangeConf={this.state.dragConf}
                        onIsFirst={this.state.dragStart}
                        onHandleDrag={this.handleSaveDragConf}
                    />
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