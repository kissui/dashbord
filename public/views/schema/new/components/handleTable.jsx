'use strict';

import React from 'react';
import Checked from '../../../../components/form/checkbox';
import SelectInputBox from '../components/selectinputbox';
const data = [
    {
        'title': 'year',
        'value': 'year'
    },
    {
        'title': 'month',
        'value': 'month'
    },
    {
        'title': 'week',
        'value': 'week'
    },
    {
        'title': 'day',
        'value': 'day'
    },
    {
        'title': 'hour',
        'value': 'hour'
    }
];
module.exports = React.createClass({
    propsType: {
        'onConf': React.PropTypes.Object, //初始化操作项的状态
    },
    getInitialState: function () {
        let defaultConf = this.props.onConf.conf;
        if (_.isObject(defaultConf) && _.has(defaultConf, 'table_conf')) {
            return {
                conf: {
                    sum: defaultConf.table_conf.sum,
                    mean: defaultConf.table_conf.mean
                }
            }
        } else {
            return {
                conf: {
                    sum: false,
                    mean: false
                }
            }
        }
    },
    componentDidMount: function () {
        this.props.onChange(this.state.conf);
    },
    handleCheckBox: function (value, index) {
        let conf = this.state.conf;
        if (index === 'sum') {
           conf.sum = value;
        } else if (index === 'mean') {
            conf.mean = value;
        }
        this.props.onChange(conf);
    },
    handleSelectValue: function (value) {
        this.props.onReceiveCycle(value);
    },
    render: function () {
        let defaultConf = this.state.conf;
        let sumIsChecked = defaultConf.sum;
        let meanIsChecked = defaultConf.mean;
        return (
            <div className="folder-body table-conf shim">
                <div className="body-header">
                    <h2>报表显示操作: </h2>
                </div>
                <div className="form-inline shim">
                    <label>
                        当前报表是否显示和值:
                        <Checked onSingleChecked={this.handleCheckBox}
                                 index={'sum'}
                                 onIsCheck={sumIsChecked}/>
                    </label>
                    <label>
                        当前报表是否显示平均值:
                        <Checked onSingleChecked={this.handleCheckBox}
                                 index={'mean'}
                                 onIsCheck={meanIsChecked}/>
                    </label>
                </div>
                <div className="form-inline shim">
                    <label>
                        数据周期:
                        <SelectInputBox
                            onValue={this.handleSelectValue}
                            defaultValues={data}
                            isWarning={true}
                            onSelect="week"
                        />
                    </label>
                </div>
            </div>
        )
    }
});