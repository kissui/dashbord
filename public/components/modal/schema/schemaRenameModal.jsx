'use strict';
import React from 'react';
import http from '../../../lib/http';

module.exports =React.createClass({
    render: function () {
        return (
            <div className="finder-modal">
                <Header title="重命名" onClick={this.closeModal}/>
                <div className="modal-body">
                    <form className="form-inline">
                        <label>文件夹名称:</label>
                        <input type="text"
                               onChange={this.handleInputChange}
                               className="form-control"
                               ref="finderName"
                               placeholder="文件名称"/>
                    </form>
                    {!this.state.initialInputState && this.state.changeState ?
                        <div className="msg-warning">文件夹名称不能为空</div> : null}
                </div>
                <div className="modal-footer">
                    <button className="btn btn-primary"
                            onClick={this.handleAddSchemaFinder}
                            disabled={this.state.initialInputState && 'disabled'}
                    >确定
                    </button>
                    <button className="btn" onClick={this.closeModal}>取消</button>
                </div>
            </div>
        )
    }
});
