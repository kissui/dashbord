'use strict';
import React from 'react';

module.exports = React.createClass({
    getInitialState: function () {
        return {
            'checked': this.props.onIsCheck ? this.props.onIsChecked : true
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
})

var InputCheckbox = React.createClass({
    getInitialState: function () {
        return {
            checked: this.props.checked
        }
    },
    render: function () {
        var checkedValue = this.props.allChecked ? true : this.state.checked
        return (
            <input
                checked={checkedValue}
                type='checkbox'
                {...this.props}/>
        )
    }
})

var text = React.createClass({
    getInitialState: function () {
        return {allChecked: false};
    },
    handleChange: function (event) {
        // var $elm = event.target;
        // var checked = $elm.props('checked');
        this.setState({
            allChecked: "checked"
        })
    },
    render: function () {
        return (
            <div>
                Select All: <InputCheckboxAll handleChange={this.handleChange}/><br/>
                <InputCheckbox allChecked={this.state.allChecked}/><br/>
                <InputCheckbox allChecked={this.state.allChecked}/><br/>
                <InputCheckbox allChecked={this.state.allChecked}/><br/>
            </div>
        )
    }
})
