'use strict';
import React from 'react';

module.exports = React.createClass({
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            defaultData: nextProps.defaultData
        })
    },
    handleClick: function (type, name, conf, key) {
        // if (this.props.type === 'dimension') return;
        let C_data = this.state.defaultData;
        C_data.map((item, i)=> {
            if (i === key) {
                if (this.props.type === 'dimension') {
                    item.d_selected = item.d_selected ? false : true;
                } else {
                    item.k_selected = item.k_selected ? false : true;
                }

            }
        });
        this.setState({
            defaultData: C_data
        });
        this.props.onChangeChart(type, name, conf);
    },
    render: function () {
        let content = this.props.defaultData.map((item, i) => {
            if (this.props.type === 'dimension') {
                return (
                    <li className={item.d_selected ? "dimension active" : 'dimension'} disabled="disabled"
                        key={i}
                        onClick={this.handleClick.bind(this, this.props.type, item.title, item.val_conf, i)}
                    >
                        {item.title}
                        <i className="fa fa-check"></i>
                    </li>
                )
            } else {
                return (
                    <li className={item.k_selected ? "dimension active" : 'dimension'}
                        key={i}
                        onClick={this.handleClick.bind(this, this.props.type, item.title, item.val_conf, i)}
                    >
                        {item.title}
                        <i className="fa fa-check"></i>
                    </li>
                )
            }

        });
        return (
            <ul>
                {this.props.defaultData ? content : null}
            </ul>
        )
    }
});