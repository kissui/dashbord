'use strict';
import React from 'react';
import http from '../../lib/http';
import ViewHeader from './widget/viewHeader';
import ViewBody from './widget/viewBody';
import Loading from '../../components/loading/loading';
import OptionFile from './onFileOption';
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
        setTimeout(()=> {
            http.get('/api/?c=table.tables&ac=index&id=' + id)
                .then(data => data.data)
                .then((data) => {
                    console.log(data, '@table');
                    if (data.errcode === 10000) {
                        this.setState({
                            fileData: data.data
                        })
                    } else {
                        this.setState({
                            errMsg: true
                        })
                    }


                })
        }, 3000)

    },
    render: function () {
        let fileData = this.state.fileData,
            content;
        console.log('@fileData: ', fileData)
        if (fileData) {
            let viewHeader = {'title': fileData.title};
            content = (
                <div>
                    <ViewHeader viewHeader={viewHeader}/>
                    <ViewBody viewBody={this.state.fileData}/>
                </div>

            )
        } else if (this.state.errMsg) {
            content = <div>{this.state.errMsg}</div>
        } else {
            content = <Loading/>
        }
        return (
            <div className="content">
                <OptionFile onFileOpen={this.state.onFileOption}>
                    <div className="file-option">
                        fuck
                    </div>
                </OptionFile>
                {content}
            </div>
        )
    }
});