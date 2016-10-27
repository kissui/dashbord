'use strict';

import React from 'react';
import Checked from '../../../components/form/checkbox';

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
            </div>
        )
    }
});