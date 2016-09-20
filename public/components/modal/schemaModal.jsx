'use strict';
import React from 'react';
import Header from './header';

module.exports = React.createClass({
    closeModal: function () {
      this.props.onClick();
    },
    render: function () {
        return (
            <div className="finder-modal">
                <Header title="创建文件夹" onClick={this.closeModal}/>
                <div className="modal-body">
                    <form className="form-inline">
                        <label>文件夹名称:</label>
                        <input type="text" className="form-control"/>
                    </form>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-primary">确定</button>
                    <button className="btn">取消</button>
                </div>
            </div>
        )
    }
});