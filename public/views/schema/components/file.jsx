'use strict';
import React from 'react';
module.exports = React.createClass({
    getInitialState: function () {
        return {
            headConf: null,
        }
    },
    componentDidMount: function () {
        console.log('where are you?',this.props.onHeadConf.folderId);
        this.props.onFolderId(this.props.onHeadConf.folderId)
    },
    handleSetName: function () {
        console.log('this.refs.fileName.value', this.refs.fileName.value);
        this.props.onSetName(this.refs.fileName.value)
    },
    handleChangeFolder: function () {
        this.props.onFolderId(this.refs.folder.value);
        console.log(this.refs.folder.value);
    },
    render: function () {
        let folder = JSON.parse(sessionStorage.getItem('SIDEBAR_LIST'));
        let conf = this.props.onHeadConf;
        let options, selects;
        let name = this.props.onHeadConf.conf ? this.props.onHeadConf.conf.title : '';
        if (conf && conf.name != 'globalFile') {
            options = folder.map((item, i)=> {
                return (
                    <option value={item.id} key={i}>
                        {item.title}
                    </option>
                )
            });
            selects = (
                <div className="col-md-4">
                    <label className="control-label">根目录</label>
                    <select ref="folder"
                            value={conf.folderId}
                            className="form-control" onChange={this.handleChangeFolder}>
                        {options}
                    </select>
                </div>
            )
        } else {
            selects = null;
        }

        return (
            <div className="row shim">
                {selects}
                <div className={conf.name != 'globalFile' ? 'col-md-8' : 'col-md-12'}>
                    <label className="control-label">工作表名称</label>
                    <input type="text"
                           className="form-control"
                           placeholder="请输入你要创建的工作表名称"
                           ref="fileName"
                           defaultValue={name}
                           onChange={this.handleSetName}
                    />
                </div>

            </div>
        )
    }
});