'use strict';
import React from 'react';

module.exports = React.createClass({
    getInitialState: function () {
        return {
            'header': this.props.viewHeader
        }
    },
    render: function () {
        return (
            <div className="view-header">
                <div className="row">
                    <div className="col-md-6">
                        <h2>{this.props.viewHeader.title}</h2>
                    </div>
                    <div className="col-md-6 text-right">
                        <ul className="header-tab">
                            <li>
                                <i className="fa fa-file">
                                </i>
                                新建工作表
                            </li>
                            <li>
                                <i className="fa fa-file">
                                </i>
                                新建工作表
                            </li>
                            <li>
                                <i className="fa fa-file">
                                </i>
                                新建工作表
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
});