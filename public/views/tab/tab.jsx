'use strict';

import React from 'react';

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
                                <a href="/chart">仪表盘</a>
                            </li>
                            <li className={this.state.tabIndex === 1 && 'current'} value="1">
                                <a href="/">工作表</a>
                            </li>
                            <li className={this.state.tabIndex === 2 && 'current'} value="2">
                                <a href="/origin">数据源</a>
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