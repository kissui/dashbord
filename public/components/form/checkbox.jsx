'use strict';
import React from 'react';

module.exports = React.createClass({
    getInitialState: function () {
        return {
            'checked': this.props.onIsCheck
        }
    },
    handleSingleCheck: function () {
        this.setState({
            'checked': !this.state.checked
        });
        this.props.onSingleChecked(!this.state.checked,this.props.index);
    },
    render: function () {
        return (
            <input type="checkBox"
                   defaultChecked={this.state.checked}
                   onChange={this.handleSingleCheck}
            />
        )
    }
});

var InputCheckboxAll = React.createClass({
    handleChange: function (event) {
        this.props.handleChange(event)
    },
    render: function () {
        return (
            <input
                type='checkbox'
                {...this.props}
                onChange={this.handleChange}/>
        )
    }
});

var InputCheckbox = React.createClass({
    getInitialState: function () {
        return {
            checked: this.props.checked
        }
    },
    render: function () {
        var checkedValue = this.props.allChecked ? true : this.state.checked;
        return (
            <input
                checked={checkedValue}
                type='checkbox'
                {...this.props}/>
        )
    }
});