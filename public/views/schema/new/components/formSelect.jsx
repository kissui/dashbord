'use strict';
import React from 'react';
import _ from 'lodash';
module.exports = React.createClass({
    propTypes: {
        defaultText: React.PropTypes.string, // 默认option为空的参数
        onSaveData: React.PropTypes.func, // change时存储相应的数据
    },
    handleDeal: function () {
        let selectedIndex = _.findIndex(this.props.initData, (o)=> {
                return o.id == this.refs.selected.value
            }),
            conf = {
                'value': this.refs.selected.value,
                'selectedIndex': selectedIndex,
                'linkWork': this.props.linkWork,
                'defaultText': this.props.defaultText
            };
        this.props.onSaveData(conf, this.props.onIndex);
    },
    render: function () {
        let content;
        let init = this.props.initData;
        if (( init && init.length > 0) && init[0] !=1) {
            content = init.map((item, i)=> {
                return (
                    <option value={item.id}  defaultValue={item.id == this.props.selectIndex && true} key={i}>
                        {item.name}
                    </option>
                )
            })
        } else {
            content = <option value="0">
                {this.props.defaultText}
            </option>;
        }
        return (
            <select ref="selected"
                    onChange={this.handleDeal}
                    className="form-control"
                    defaultValue={this.props.selectIndex}
            >
                {content}
            </select>
        )
    }
});