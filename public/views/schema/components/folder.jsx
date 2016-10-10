'use strict';

import React from 'react';
import http from '../../../lib/http';

module.exports = React.createClass({
    getInitialState: function () {
        return {
            selectFolderEq: 0
        }
    },
    componentDidMount: function () {
        this.getFolderListData();
    },
    getFolderListData: function () {
        http.get('/api/?c=table.folder&ac=tree')
            .then(data=>data.data)
            .then((data)=> {
                if (data.errcode === 10000 && data.data.length > 0) {
                    this.setState({
                        folderData: data.data
                    });
                    this.props.onFolderId(data.data[0].id)
                } else {
                    this.setState({
                        folderData: null
                    })
                }
            })
    },
    handleSelect: function (i, id) {
        this.setState({
            selectFolderEq: i
        });
        this.props.onFolderId(id)
    },
    render: function () {
        let list = null;
        if (this.state.folderData) {
            list = this.state.folderData.map((item, i)=> {
                return (
                    <li className={this.state.selectFolderEq === i && 'active'} key={i}
                        onClick={this.handleSelect.bind(null, i, item.id)} ref="id"
                        value={item.id}>
                        <i className="fa fa-folder"></i>
                        <span>{item.title}</span>
                        {this.state.selectFolderEq === i && (<i className="fa fa-check success"></i>)}
                    </li>
                )
            })
        }
        return (
            <div className="row shim">
                <label className="col-md-2 control-label">根目录:</label>
                <div className="col-md-10">
                    <ul className="folder-list">
                        {list}
                    </ul>
                </div>
            </div>
        )
    }
});