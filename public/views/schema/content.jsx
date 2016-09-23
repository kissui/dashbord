'use strict';
import React from 'react';
import http from '../../lib/http';
import ViewHeader from './widget/viewHeader';
import ViewBody from './widget/viewBody';
import Loading from '../../components/loading/loading';
module.exports = React.createClass({
    getInitialState: function () {
        return {
            contentDefault: null,
        }
    },
    componentWillMount: function () {
        this.initialFileData();
    },
    componentWillReceiveProps: function (nextProps) {
        console.log(nextProps.currentPage, nextProps.fileId)
        this.setState({
            contentDefault: nextProps.currentPage,
            fileId: nextProps.fileId
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
                    this.setState({
                        fileData: data.data
                    })
                } else {

                }


            })
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
        } else {
            <Loading/>
        }
        return (
            <div className="content">
                {content}
            </div>
        )
    }
});