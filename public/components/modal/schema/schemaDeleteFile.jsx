'use strict';

import React from 'react';
import Header from '../header';
import http from '../../../lib/http';

module.exports = React.createClass({
    getInitialState: function () {
        return {
            fileData: this.props.currentFileDetail
        }
    },
    closeModal: function () {
        this.props.onClick();
    },
    handleDeleteFile: function () {
        let data = this.state.fileData;
        http.get('/api/?c=table.tables&ac=del&id=' + data.id)
            .then(data => data.data)
            .then((data) => {
                if (data.errcode === 10000) {
                    this.props.menuChange();

                } else {
                    this.setState({
                        errMsg: data.msg
                    })
                }
            })
    },
    render: function () {
        console.log(this.state.fileData);
        return (
            <div className="finder-modal">
                <Header title="删除工作表" onClick={this.closeModal}/>
                <div className="modal-body">
                    <form className="form-inline">
                        <label>工作表名称:</label>
                        <span>{this.state.fileData['title']}</span>
                    </form>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-primary"
                            onClick={this.handleDeleteFile}
                    >确定
                    </button>
                    <button className="btn" onClick={this.closeModal}>取消</button>
                </div>
            </div>
        )
    }
});