'use strict';
import React from 'react';
import http from '../../lib/http';
import {Link, History, Router} from 'react-router';
import ViewHeader from './widget/viewHeader';
import ViewBody from './widget/viewBody';
import Loading from '../../components/loading/loading';
import CreateFilePage from './createFile';
module.exports = React.createClass({
    getInitialState: function () {
        return {
            contentDefault: null,
        }
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            contentDefault: nextProps.currentPage,
            fileId: nextProps.fileId,
            onFileOption: nextProps.onFileOption,
            createFileState: nextProps.createFileState
        });
        if (nextProps.fileId) {
            this.initialFileData(nextProps.fileId)
        }
    },
    initialFileData: function (fileId) {
        let id = fileId ? fileId : 1;
        var _this = this;
        http.get('/api/?c=table.tables&ac=index&id=' + id)
            .then(data => data.data)
            .then((data) => {
                if (data.errcode === 10000) {
                    if (data.data && data.msg === 'success') {
                        _this.setState({
                            fileData: data.data,
                            createFileState: false
                        });
                        sessionStorage.setItem('SCHEMA_FILE_DETAIL', JSON.stringify({
                            fileID: data.data.id,
                            folderID: data.data.folder_id
                        }));
                    } else {
                        _this.setState({
                            fileData: null
                        })
                    }

                } else {
                    _this.setState({
                        errMsg: true
                    })
                }


            })
    },
    onState: function (id, folderId) {
        this.props.onState(id, folderId)
    },
    handleAddFile: function () {
        this.props.onAddFile('schema', 'globalFile')
    },
    handleEditFile: function (conf) {
        this.props.onEditFile('schema', 'editFile', conf.folder_id, conf)
    },
    handleHideCreateFilePage: function () {
        let fileId = JSON.parse(sessionStorage.getItem('SCHEMA_FILE_DETAIL')).fileID;
        this.initialFileData(fileId);
    },
    render: function () {
        let fileData = this.state.fileData,
            content;
        if (fileData) {
            content = (
                <div>
                    <ViewHeader
                        viewHeader={fileData}
                        onAddFile={this.handleAddFile}
                        onEditFile={this.handleEditFile}
                        onChangeChart={this.handleChangeChart}
                    />
                    <ViewBody viewBody={this.state.fileData}/>
                </div>

            )

        } else if (fileData === null) {
            content = (
                <div className="content-warning">
                    <h2>当前工作表暂无数据</h2>
                </div>
            );
        } else if (this.state.errMsg) {
            content = (
                <div className="content-warning">
                    <h2>{this.state.errMsg}</h2>
                </div>
            );
        } else {
            content = <Loading/>
        }
        return (
            <div className="content">
                {this.state.createFileState ?
                    <CreateFilePage
                        onState={this.onState}
                        onConf={this.state.onFileOption}
                        onCancel={this.handleHideCreateFilePage}
                    /> : content}
            </div>
        )
    }
});