'use strict';

import React from 'react';
import Header from '../header';
import http from '../../../lib/http';

module.exports = React.createClass({
    getInitialState: function () {
        return {
            'defaultFile': null
        }
    },
    closeModal: function () {
        this.props.onClick()
    },
    handleInputChange: function () {
        this.setState({
            initialInputState: this.refs.finderName.value
        })
    },
    handleAddSchemaFinder: function () {

    },
    render: function () {
        return (
            <div className="finder-modal">
                <Header title="添加工作表" onClick={this.closeModal}/>
                <div className="modal-body">
                    <form className="form-inline">
                        <label>文件夹名称:</label>
                        <input type="text"
                               onChange={this.handleInputChange}
                               className="form-control"
                               ref="finderName"
                               placeholder="文件名称"/>
                    </form>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-primary"
                            onClick={this.handleAddSchemaFinder}
                            disabled={!this.state.initialInputState && 'disabled'}
                    >确定
                    </button>
                    <button className="btn" onClick={this.closeModal}>取消</button>
                </div>
            </div>
        )
    }
});