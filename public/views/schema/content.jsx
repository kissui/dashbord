'use strict';
import React from 'react';
import http from '../../lib/http';
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
    componentDidMount: function () {
        this.initialFileData();
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            contentDefault: nextProps.currentPage,
            fileId: nextProps.fileId,
            onFileOption: nextProps.onFileOption,
            createFileState: nextProps.createFileState
        });
        if(nextProps.fileId) {
             this.initialFileData(nextProps.fileId)
        }
        console.log('@nextProps.createFileState', nextProps.createFileState)
    },
    initialFileData: function (fileId) {
        let id = fileId ? fileId : 1;
        http.get('/api/?c=table.tables&ac=index&id=' + id)
            .then(data => data.data)
            .then((data) => {
                console.log(data, '@table');
                if (data.errcode === 10000) {
                    if (data.data && data.msg === 'success') {
                        this.setState({
                            fileData: data.data,
                            createFileState: false
                        });
                    } else {
                        this.setState({
                            fileData: null
                        })
                    }

                } else {
                    this.setState({
                        errMsg: true
                    })
                }


            })
    },
    onState: function (id,folderId) {
        this.props.onState(id,folderId)
    },
    render: function () {
        console.log(this.state.createFileState,'@fileoption}')
        let fileData = this.state.fileData,
            content;
        if (fileData) {
            let viewHeader = {'title': fileData.title};
            content = (
                <div>
                    <ViewHeader viewHeader={viewHeader}/>
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
                {this.state.createFileState ? <CreateFilePage onState={this.onState}/> : content}
            </div>
        )
    }
});