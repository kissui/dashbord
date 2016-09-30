'use strict';
import React from 'react';

module.exports = React.createClass({
    getInitialState: function () {
        return {
            'header': this.props.viewHeader
        }
    },
    handleAddFile: function () {
        this.props.onAddFile()
    },
    handleChangeChart: function () {

        this.props.onChangeChart()
    },
    handleEditFile: function () {
        this.props.onEditFile(this.props.viewHeader)
    },
    render: function () {
        console.log('@this.props.viewHeader',this.props.viewHeader)
        return (
            <div className="view-header">
                <div className="row">
                    <div className="col-md-6">
                        <h2>{this.props.viewHeader.title}</h2>
                    </div>
                    <div className="col-md-6 text-right">
                        <ul className="header-tab">
                            <li onClick={this.handleAddFile}>
                                <i className="fa fa-plus">
                                </i>
                                新建工作表
                            </li>
                            <li onClick={this.handleEditFile}>
                                <i className="fa fa-edit">
                                </i>
                                编辑工作表
                            </li>
                            <li onClick={this.handleChangeChart}>
                                <i className="fa fa-bar-chart">
                                </i>
                                生成图表
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
});