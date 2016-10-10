'use strict';
import React from 'react';
/**
 * @TODO modal-header
 * @props onClick 此属性为传递事件 执行close modal 通讯到finderModal的closeModal函数
 * @type {any}
 */
module.exports = React.createClass({
    closeModal: function () {
        this.props.onClick();
    },
    render: function () {
        return (
            <div className="modal-header text-center">
                <h2 ref="subtitle">{this.props.title}</h2>
                <i className="glyphicon glyphicon-remove" onClick={this.closeModal}></i>
            </div>
        )
    }
});