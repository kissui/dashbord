'use strict';

import React from 'react';

module.exports = React.createClass({
    getInitialState: function () {
        return {
            'defaultProps': null
        }
    },
    componentWillMount: function () {

    },
    render: function () {
        return (<div className="kepler-slide col-md-3">
            <div className="slide-box">
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
                <SidebarMenu />
            </div>
            <div>

            </div>
        </div>)
    }
});
const SIDE_LIST_DATA = [
    {
        item: '工作表',
        icon: 'fa fa-table',
        state: true,
        subMenu: [
            {
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
                title: 'title_1',
                href: '/',
            },
            {
                title: 'title_1',
                href: '/',
            },
            {
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
                smelling: !this.state.smelling
            }
        }
    }

    componentWillMount() {
        this.setState({
            sideListDate: SIDE_LIST_DATA
        })
    }

    render() {
        return (
            <div id="sidebar-menu" className="sidebar-menu">
                <h3 className="authority">
                    成员
                </h3>
                <SidebarMenuItem menu={SIDE_LIST_DATA}/>
            </div>
        )
    }
}
class SidebarMenuItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {smelling: true};
        this.handleClick = () => {
            this.setState = {
                smelling: !this.state.smelling
            }
        }
    }

    render() {
        return (
            <ul className="nav side-menu">
                {
                    this.props.menu.map(function (item) {
                        return ( <li className={item.state && 'active'}>
                            <a>
                                <i className={item.icon}></i>
                                {item.item}
                                <span className="fa fa-chevron-down"></span>
                            </a>
                            <SidebarMenuSuperItem menu={item.subMenu}/>
                        </li>)
                    })
                }
            </ul>

        )
    }
}
class SidebarMenuSuperItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {superList: this.props.menu};
        this.handleClick = () => {
            this.setState = {
                smelling: !this.state.smelling
            }
        }
    }

    render() {
        let menu = this.props.menu;
        return (
            <ul className="nav child_menu">
                {
                    this.props.menu.map(function (item) {
                        return <li><a href="{item.href}">{item.title}</a></li>
                    })
                }

            </ul>
        )
    }
}