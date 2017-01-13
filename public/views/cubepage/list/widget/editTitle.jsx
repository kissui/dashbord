'use strict';
import React from 'react';
import {Input} from 'antd';
export default class ChangeInput extends React.Component {
    constructor(context, props) {
        super(context, props);
        const {onValue, onOpState} = this.props;
        this.state = {
            value: onValue,
            editCube: onOpState
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({editCube: nextProps.onOpState, value: nextProps.onValue})
    }
    handleChange(e) {
        // this.setState({value: e.target.value});
        console.log(e.target.value)
        this.props.onChange(e.target.value);
    }
    render() {
        const {editCube, value} = this.state;
        return (
            <div>
                {!editCube
                    ? value
                    : <Input defaultValue={value} onChange={this.handleChange.bind(this)}/>
}
            </div>
        )
    }
}
