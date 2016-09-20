'use strict';
import React from 'react';

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