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
    render: function () {
        let box = this.state.optionIsOpen ? <div>{this.props.children}</div> : null;

        return (
            <div>
                {box}
            </div>

        )
    }
});