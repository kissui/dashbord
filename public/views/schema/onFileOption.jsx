'use strict';
import React from 'react';

module.exports = React.createClass({
    getInitialState: function () {
        return {
            'optionIsOpen': false
        }
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.onFileOpen) {
            this.setState({
                'optionIsOpen': true,
            })
        }
    },
    componentDidMount: function () {

    },
    onState: function (id) {
        this.props.onState(id);
    },
    render: function () {
        let box = this.props.onFileOpen ? <div>{this.props.children}</div> : null;

        return (
            <div>
                {box}
            </div>

        )
    }
});