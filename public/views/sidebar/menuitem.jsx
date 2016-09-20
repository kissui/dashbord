'use strict';

import React from 'react';
import SidebarMenuSuperItem from './sidebarmenu';

var SidebarMenuItem =  React.createClass({
    getInitialState: function () {
        return {
            'fileType': this.props.fileType,
        }
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            defaultProps: nextProps.list
        })

    },
    handleChangeList: function (i) {
        let listDate = this.state.defaultProps;
        this.setState({
            changeIndex: i
        });
        if (this.state.changeIndex === i) {
            listDate[i].id = listDate[i].id ? false : true;
        } else {
            for (let l = 0; l < listDate.length; l++) {
                listDate[l].id = false;
            }

            listDate[i].id = true;
        }
        this.setState({
            'sidebarListData': listDate
        });
    },
    render: function () {
        let me = this;
        let menuList;
        if (this.state.defaultProps) {
            menuList = this.state.defaultProps.map(function (item, i) {
                return (
                    <li className={item.id && 'active'} key={i}>
                        <a onClick={me.handleChangeList.bind(null, i)}>
                            <i className={"fa fa-folder-open"}></i>
                            {item.title}
                            <span className="fa fa-chevron-down"></span>
                        </a>
                        <SidebarMenuSuperItem menu={item.tables}/>
                    </li>
                )
            });
        } else {
            menuList = 'loading'
        }
        return (
            <ul className="nav side-menu">
                {menuList}
            </ul>

        )
    }
});
export default SidebarMenuItem;