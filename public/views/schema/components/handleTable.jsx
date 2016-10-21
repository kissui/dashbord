'use strict';

import React from 'react';
import Checked from '../../../components/form/checkbox';
module.exports = React.createClass({
    handleCheckBox: function (value, index) {
        console.log(value, index)
    },
    render: function () {
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
                                 onIsCheck={true}/>
                    </label>
                    <label>
                        当前报表是否显示平均值:
                        <Checked onSingleChecked={this.handleCheckBox}
                                 index={'mean'}
                                 onIsCheck={true}/>
                    </label>
                </div>
            </div>
        )
    }
});