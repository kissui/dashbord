'use strict';

import React from 'react';
import http from '../../../lib/http/http.server';
module.exports = React.createClass({
    getInitialState: function () {
        return {
            'defaultProps': null,
            'selectIndex': this.props.selectIndex
        }
    },
    componentWillMount: function () {

    },
    render: function () {
        return (
            <div className="kepler-sidebar">
                <div className="sidebar-box">
                    <a href="/" className="kepler-logo">
                        <img src="/img/logo.png" alt=""/>
                    </a>
                    <div className="kepler-user row">
                        <div className="col-md-5 text-center">
                            <img src="/img/user.png" alt=""/>
                        </div>
                        <div className="col-md-7 pt10">
                            <span>Welcome,</span>
                            <div className="name">shane</div>
                        </div>
                    </div>
                    <SidebarMenu currentIndex={this.props.selectIndex}/>
                </div>
            </div>)
    }
});
let SIDE_LIST_DATA = [
    {
        item: '工作表',
        icon: 'fa fa-folder-open',
        state: true,
        subMenu: [
            {
                icon: 'fa fa-file',
                title: 'text',
                href: '/',
            }
        ]
    },
    {
        item: 'home2',
        icon: 'fa fa-edit',
        state: false,
        subMenu: [
            {
                icon: 'fa fa-file',
                title: '大事发生法撒旦',
                href: '/',
            },
            {
                icon: 'fa fa-file',
                title: 'title_1',
                href: '/',
            },
            {
                icon: 'fa fa-file',
                title: 'title_1',
                href: '/',
            }
        ]
    }
];


class SidebarMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {smelling: true};
        this.handleClick = () => {
            this.setState = {
                fileType: 'folder'
            }
        }
    }

    componentWillMount() {
        this.setState({
            sideListDate: SIDE_LIST_DATA
        });

        http.get('/?c=table.schema&ac=tree',function (data) {
            console.log(data,'test');
        })
    }

    handleOpenFile() {
        this.setState({
            fileType: 'list'
        })
    }

    render() {
        let title = SIDE_LIST_DATA[this.props.currentIndex].item;

        return (
            <div id="sidebar-menu" className="sidebar-menu">
                <h3 className="authority row">
                    <div className="col-md-6">
                        <span>
                            {title}
                        </span>
                    </div>
                    <div className="col-md-6 text-right sidebar-icon">
                        <i className="fa fa-plus" onClick={this.handleOpenFile}></i>
                        <i className="fa fa-list"></i>
                    </div>
                </h3>
                <SidebarMenuItem
                    menu={SIDE_LIST_DATA}
                    fileType={this.state.fileType}
                />
            </div>
        )
    }
}
var SidebarMenuItem = React.createClass({
    getInitialState: function () {
        return {
            'defaultProps': null,
            'fileType': this.props.fileType,
            'sidebarListData': SIDE_LIST_DATA
        }
    },
    handleChangeList: function (i) {
        console.log(i);
        let listDate = this.state.sidebarListData;
        this.setState({
            changeIndex: i
        });
        if (this.state.changeIndex === i) {
            listDate[i].state = listDate[i].state ? false : true;
        } else {
            for (let l = 0; l < listDate.length; l++) {
                listDate[l].state = false;
            }

            listDate[i].state = true;
        }
        this.setState({
            'sidebarListData': listDate
        });
    },
    render: function () {
        let me = this;
        let menuList = this.props.menu.map(function (item, i) {
            return (
                <li className={item.state && 'active'} key={i}>
                    <a onClick={me.handleChangeList.bind(null, i)}>
                        <i className={"fa fa-folder-open"}></i>
                        {item.item}
                        <span className="fa fa-chevron-down"></span>
                    </a>
                    <SidebarMenuSuperItem menu={item.subMenu}/>
                </li>
            )
        });
        return (
            <ul className="nav side-menu">
                {menuList}
            </ul>

        )
    }
});
class SidebarMenuSuperItem extends React.Component {
    constructor(props) {
        super(props);

    }

    handleChangeSuperList(i) {
        console.log(i)
    }

    render() {
        let me = this;
        let menu = this.props.menu;
        return (
            <ul className="nav child_menu">
                {
                    this.props.menu.map(function (item, i) {
                        return (
                            <li key={i}>
                                <a onClick={me.handleChangeSuperList.bind(null, i)}>
                                    <i className={item.icon}></i>
                                    {item.title}
                                    <i className="fa fa-pencil"></i>
                                </a>

                            </li>
                        )
                    })
                }

            </ul>
        )
    }
}