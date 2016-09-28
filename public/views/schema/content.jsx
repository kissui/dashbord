'use strict';
import React from 'react';
import http from '../../lib/http';
import ViewHeader from './widget/viewHeader';
import ViewBody from './widget/viewBody';
import Loading from '../../components/loading/loading';
import OptionFile from './onFileOption';
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
            onFileOption: nextProps.onFileOption
        });
        nextProps.fileId ? this.initialFileData(nextProps.fileId) : null
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
                            fileData: data.data
                        })
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
    onState: function (id) {
        this.props.onState(id)
    },
    render: function () {
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
                <OptionFile onFileOpen={this.state.onFileOption} onState={this.onState}>
                    <CreateFilePage onState={this.onState}/>
                </OptionFile >
                {this.state.onFileOption ? null : content}
            </div>
        )
    }
});