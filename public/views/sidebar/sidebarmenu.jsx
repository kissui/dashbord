'use strict';

import React from 'react';
import http from '../../lib/http';

class SidebarMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileType: 'folder',
            plusFinderType: 'close'
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.menuChangeState) {
            this.initAndRefreshMenu()
        }
    }

    componentWillMount() {
        this.initAndRefreshMenu()
    }

    initAndRefreshMenu() {
        let _me = this;
        http.get('/api/?c=table.folder&ac=tree')
            .then(data => (data.data))
            .then((data) => {
                if (data.errcode === 10000) {
                    _me.setState({
                        sideListDate: data.data
                    })
                }
            })
            .catch(data => {
                console.log(data);
            })
    }

    handleOpenFile() {
        this.setState({
            fileType: 'list'
        })
    }

    handlePlusFolder() {
        if (this.state.plusFinderType === 'close') {
            this.setState({
                plusFinderType: 'open'
            })
        } else {
            this.setState({
                plusFinderType: 'close'
            })
        }

    }

    handleEditFinder() {
        this.props.onClick('schema', 'plus');
        this.setState({
            plusFinderType: 'close'
        })
    }

    handleSettingFinder(index, tabType, optionType, id, title) {
        console.log(index, tabType, optionType);
        this.props.onClick(tabType, optionType, index, id, title);
        this.setState({
            settingFinderDropDownState: null
        })
    }

    render() {
        console.log(this.state.plusFinderType, 'dropdown');
        let finderTpl = null;
        if (this.state.plusFinderType === 'open') {
            finderTpl = (
                <ul className="dropdown-wrap">
                    <li className="dropdown-item" onClick={this.handleEditFinder.bind(this)}>添加文件夹</li>
                </ul>
            );
        }
        return (
            <div id="sidebar-menu" className="sidebar-menu">
                <h3 className="authority row">
                    <div className="col-md-6">
                        <span>
                            {'title'}
                        </span>
                    </div>
                    <div className="col-md-6 text-right sidebar-icon">
                        <i className="fa fa-plus" onClick={this.handlePlusFolder.bind(this)}>
                        </i>
                        <i className="fa fa-list" onClick={this.handleOpenFile.bind(this)}>
                        </i>
                    </div>
                    {finderTpl}
                </h3>
                <SidebarMenuItem
                    fileType={this.state.fileType}
                    list={this.state.sideListDate}
                    onSetting={this.handleSettingFinder.bind(this)}
                    onDropDownState={this.state.settingFinderDropDownState}
                />
            </div>
        )
    }
}

var SidebarMenuItem = React.createClass({
    getInitialState: function () {
        return {
            'fileType': this.props.fileType,
        }
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            defaultProps: nextProps.list,
            settingIndex: nextProps.settingFinderDropDownState
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
            'sidebarListData': listDate,
            'settingIndex': null
        });
    },
    handleSettingFinder: function (i) {
        this.setState({
            'settingIndex': i
        })
    },
    handleDeleteFinder: function (i) {

        let title = this.state.defaultProps[i].title;
        let id = this.state.defaultProps[i].id;
        this.props.onSetting(i, 'schema', 'delete', id, title);
    },
    handleRenameFinder: function (i) {
        console.log(i, this.state.defaultProps[i].id)
        let title = this.state.defaultProps[i].title;
        let id = this.state.defaultProps[i].id;
        this.props.onSetting(i, 'schema', 'rename', id, title);
    },
    render: function () {
        let me = this;
        let menuList;
        if (this.state.defaultProps) {
            menuList = this.state.defaultProps.map(function (item, i) {
                return (
                    <li className={item.id && 'active'} key={i}>
                        <a onClick={me.handleChangeList.bind(null, i)}>
                            <i className={"fa fa-folder-open"}>
                            </i>
                            {item.title}
                        </a>
                        <span className="fa fa-cogs finder-edit"
                              onClick={me.handleSettingFinder.bind(null, i)}>
                        </span>
                        {me.state.settingIndex === i ? <ul className="dropdown-wrap">
                            <li className="dropdown-item"
                                onClick={me.handleDeleteFinder.bind(null, i)}>
                                删除
                            </li>
                            <li className="dropdown-item"
                                onClick={me.handleRenameFinder.bind(null, i)}>
                                重命名
                            </li>
                        </ul> : null}

                        {item.tables ? <SidebarMenuSuperItem menu={item.tables}/> : null}
                    </li>
                )
            });
        } else {
            menuList = null
        }
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
export default SidebarMenu;