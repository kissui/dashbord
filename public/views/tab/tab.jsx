'use strict';

import React from 'react';
import Router, {Link, History} from 'react-router';
module.exports = React.createClass({
    getInitialState: function () {
        return {
            'onSidebar': this.props.onSidebar,
            'tabIndex': this.props.selectIndex
        }
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            tabIndex: nextProps.selectIndex,
            onSidebar: nextProps.onSidebar
        })
    },
    componentWillMount: function () {
    },
    render () {
        return (
            <div className={this.state.onSidebar ? "top_nav ml-0" : "top_nav"}>
                <div className={this.state.onSidebar ? "nav_menu pl-0" : "nav_menu"}>
                    {this.state.onSidebar ? <div className="col-md-1">
                        kepler
                    </div> : null}
                    <ul className="kepler-tabs">
                        <li className={this.state.tabIndex === 0 && 'current'} value="0">
                            <Link to='/group/chart'>
                                仪表盘
                            </Link></li>
                        <li className={this.state.tabIndex === 1 && 'current'} value="1">
                            <Link to='/group/schema'>
                                工作表
                            </Link>
                        </li>
                        <li className={this.state.tabIndex === 2 && 'current'} value="2">
                            <Link to='/group/source'>
                                数据源
                            </Link>
                        </li>
                    </ul>
                    <div className={this.state.onSidebar ? "text-right user" : "text-right user"}>
                        <i className="fa fa-envelope">
                        </i>
                        <img src="/img/user.png" alt=""/>
                        <span>shane</span>
                        <i className="fa fa-angle-down">
                        </i>
                    </div>
                </div>
            </div>
        )
    }
});