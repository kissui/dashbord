'use strict';
import React from 'react';
import Header from '../header';
import http from '../../../lib/http';

module.exports = React.createClass({
    closeModal: function () {
        this.props.onClick();
    },
    deleteFinder: function () {
        let data = this.props.currentFinderDetail;
        console.log(data,'@delete_id')
        http.get('/api/?c=table.folder&ac=del&id=' + data.id)
            .then(data => data.data)
            .then((data) => {
                console.log(data, '@delete');
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
        return (
            <div className="finder-modal">
                <Header title="提示" onClick={this.closeModal}/>
                <div className="modal-body">
                    您当前确定删除当前文件夹!
                </div>
                <div className="modal-footer">
                    <button className="btn btn-primary"
                            onClick={this.deleteFinder}>
                        确定
                    </button>
                    <button className="btn" onClick={this.closeModal}>取消</button>
                </div>
            </div>
        )
    }
});