'use strict';
import React from 'react';
import Session from '../../../../components/session'
module.exports = React.createClass({
    getInitialState: function () {
        return {
            headConf: null,
            folderList: null
        }
    },

    render: function () {

        return (
            <div className="row shim">
                <div className={false != 'globalFile' ? 'col-md-8' : 'col-md-12'}>
                    <label className="control-label">工作表名称</label>
                    <input type="text"
                           className="form-control"
                           placeholder="请输入你要创建的工作表名称"
                           ref="fileName"
                           defaultValue={'ss'}
                           onChange={this.handleSetName}
                    />
                </div>

            </div>
        )
    }
});