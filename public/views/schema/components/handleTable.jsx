'use strict';

import React from 'react';
import Checked from '../../../components/form/checkbox';

module.exports = React.createClass({
    propsType: {
        'onConf': React.PropTypes.Object, //初始化操作项的状态
        // 'onChange': React.prototype.Function //checked event处理状态
    },
    handleCheckBox: function (value, index) {
        let sum = false,
            mean = false;

        if (index === 'sum') {
            sum = value;
        } else if(index ==='mean') {
            mean = value;
        }
        let conf = {
            sum: sum,
            mean: mean
        };
        this.props.onChange(conf);
    },
    render: function () {
        let defaultConf = this.props.onConf.conf;
        let sumIsChecked = false;
        let meanIsChecked = false;
        if(_.isObject(defaultConf)) {
            sumIsChecked = defaultConf.table_conf.sum;
            meanIsChecked = defaultConf.table_conf.mean;
        }
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