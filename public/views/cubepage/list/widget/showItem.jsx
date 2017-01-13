'use strict';
import React from 'react';
import {Input,Icon} from 'antd';

export default class DimensionList extends React.Component {
    constructor(context, props) {
        super(context, props);
        const {onList, onCodeState, onType} = this.props;
        this.state = {
            list: onList,
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({list:nextProps.onList})
    }
    render() {
        const {list, type, cubeState} = this.state;
        return (
            <ul>
                {list && list.map((item, i) => {
                        return (
                             <li key={i} className="item">{item.title}</li>
                        )
                    })}
            </ul>
        )
    }
}
