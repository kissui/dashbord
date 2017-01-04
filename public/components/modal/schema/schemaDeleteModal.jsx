'use strict';
import React from 'react';
import Header from '../header';
import http from '../../../lib/http';

module.exports = React.createClass({
    getInitialState: function () {
        return {
            folderDetail: this.props.currentFinderDetail
        }
    },
    closeModal: function () {
        this.props.onClick();
    },
    deleteFinder: function () {
        let data = this.state.finderDetail;
        http.get('/api/?c=table.folder&ac=del&id=' + data.id)
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
        const {folderDetail} = this.state;
        let index = _.findIndex(folderDetail.lists,item=>{
            return item.id == folderDetail.folderId
        });
        let title = folderDetail.lists[index].title;
        return (
            <div className="finder-modal">
                <Header title="提示" onClick={this.closeModal}/>
                <div className="modal-body">
                    <form className="form-inline">
                        <label>文件夹名称:</label>
                        <span>【{title}】</span>
                    </form>
                    {this.state.errMsg ?
                        <div className="msg-warning">{this.state.errMsg}</div> : null}
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