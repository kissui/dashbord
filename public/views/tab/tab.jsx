'use strict';

import React from 'react';
import Router, {Link,History} from 'react-router';
module.exports = React.createClass({
    getInitialState: function () {
        return {
            'tabsDefault': null,
            'tabIndex': this.props.selectIndex
        }
    },
    // componentWillReceiveProps: function (nextProps) {
    //     this.setState({
    //         tabIndex: nextProps.selectIndex
    //     })
    // },
    componentWillMount: function () {
        console.log(this.props)
    },
    handleTab: function (e) {
        this.setState({
            'tabIndex': e.target.value
        })
    },
    render () {
        return (
            <div className="top_nav">
                <div className="nav_menu row">
                    <div className="col-md-4 ">
                        <ul className="kepler-tabs" onClick={this.handleTab}>
                            <li className={this.state.tabIndex === 0 && 'current'} value="0">
                                <Link to='/chart'>
                                    仪表盘
                                </Link>                            </li>
                            <li className={this.state.tabIndex === 1 && 'current'} value="1">
                                <Link to='/schema'>
                                    工作表
                                </Link>
                            </li>
                            <li className={this.state.tabIndex === 2 && 'current'} value="2">
                                <Link to='/chart'>
                                    数据源
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-8 text-right user">
                        <i className="fa fa-envelope"></i>
                        <img src="../img/user.png" alt=""/>
                        <span>shane</span>
                        <i className="fa fa-angle-down"></i>
                    </div>
                </div>
            </div>
        )
    }
});