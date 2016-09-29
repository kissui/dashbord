'use strict';

import React from 'react';
import http from '../../lib/http';
/**
 * @todo 左侧菜单,default width 200px
 * @description 为了方便处理dropdown_wrap
 * 全局的dropdown,公用一个state
 */
class SidebarMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fileType: 'folder',
            'dropDownWrapState': null
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.dropDownWrapState) {
            this.setState({
                'dropDownWrapState': nextProps.dropDownWrapState
            });
        }
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

        if (!this.state.dropDownWrapState) {
            this.setState({
                'dropDownWrapState': 'schema'
            })
        } else {
            this.setState({
                'dropDownWrapState': null,
            })
        }
    }

    handleEditFinder() {
        this.props.onClick('schema', 'plus');
        this.setState({
            'dropDownWrapState': null
        })
    }

    handleGlobalAddFile() {
        this.props.onGlobalClick('schema', 'plusFile')
    }

    /**
     * @description finder setting 'add read update delete"
     * @param index 当前列表索引,根据索引获取详细信息
     * @param tabType 当前hash的类型 'schema chart orig'
     * @param optionType 操作类型 'ARUD'
     * @param id 当前文件夹的ID
     * @param title 当前文件夹的title
     */
    handleSettingFinder(index, tabType, optionType, id, title) {
        this.props.onClick(tabType, optionType, index, id, title);
        this.setState({
            dropDownWrapState: null
        })
    }

    onChangeFile(index, tabName, optionType, finderId, fileId) {
        this.props.onChangeFile(index, tabName, optionType, finderId, fileId);
    }

    handleHideDropDownWrap() {
        this.setState({
            dropDownWrapState: null
        })
    }

    render() {
        console.log('@selectIndex: ', this.props.selectIndex, this.props.defaultFile);
        let title = '工作表';
        switch (this.props.selectIndex) {
            case 0 :
                title = '仪表盘';
                break;
            case 1:
                title = '工作表';
                break;
            case 2:
                title = '数据源';
                break;
            default:
                title = '工作表';
                break
        }
        let finderTpl = null;
        if (this.state.dropDownWrapState) {
            finderTpl = (
                <ul className="dropdown-wrap" onMouseLeave={this.handleHideDropDownWrap.bind(this)}>
                    <li className="dropdown-item" onClick={this.handleEditFinder.bind(this)}>添加文件夹</li>
                    <li className="dropdown-item" onClick={this.handleGlobalAddFile.bind(this)}>添加工作表</li>
                </ul>
            );
        }
        return (
            <div id="sidebar-menu" className="sidebar-menu">
                <h3 className="authority row">
                    <div className="col-md-6">
                        <span>
                            {title}
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
                    onDropDownState={this.state.dropDownWrapState}
                    onChangeFile={this.onChangeFile.bind(this)}
                    defaultFile={this.props.defaultFile}
                />
            </div>
        )
    }
}
/**
 * @TODO 全局的dropDown_wrap 的状态处理
 * @state dropDownWrapState;
 * @rule:
 *      <tabName> default add finder dropdown_wrap 'schema'
 *      <tabName> + <finderIndex> finder option dropdown_wrap 'schema_1'
 *      <tabName> + <finderIndex> + <currentFinderFileIndex> current file dropdown_wrap 'schema_1_1'
 * @type {{dropdownState: (any)}}
 */
// SidebarMenu.propTypes = {
//     dropDownWrapState: React.propTypes.string
// };
var SidebarMenuItem = React.createClass({
    getInitialState: function () {
        return {
            'fileType': this.props.fileType,
        }
    },
    componentWillReceiveProps: function (nextProps) {
        if (this.state.dropDownWrapState) {
            this.setState({
                dropDownWrapState: nextProps.onDropDownState
            })
        }
        this.setState({
            defaultProps: nextProps.list
        })

    },
    handleChangeList: function (i, id) {
        if (!this.refs['list_' + id].className) {
            this.refs['list_' + id].className = 'active';
            this.refs['list_i_'+id].className = 'fa fa-folder-open'
        } else {
            this.refs['list_' + id].className = '';
            this.refs['list_i_'+id].className = 'fa fa-folder'
        }
    },
    handleSettingFinder: function (i) {
        if (!this.state.dropDownWrapState) {
            this.setState({
                'dropDownWrapState': 'schema_' + i
            })
        } else {
            this.setState({
                'dropDownWrapState': null
            })
        }

    },
    onChangeFile: function (index, tabName, optionType, finderId, fileId) {
        this.props.onChangeFile(index, tabName, optionType, finderId, fileId);
    },
    onSettingFile: function (index, tabName, optionType, fileId, title) {
        this.props.onSetting(index, tabName, optionType, fileId, title);
    },
    handleAddFile: function (i) {
        console.log(i)
    },
    handleDeleteFinder: function (i) {
        let title = this.state.defaultProps[i].title;
        let id = this.state.defaultProps[i].id;
        this.props.onSetting(i, 'schema', 'delete', id, title);
    },
    handleRenameFinder: function (i) {
        let title = this.state.defaultProps[i].title;
        let id = this.state.defaultProps[i].id;
        this.props.onSetting(i, 'schema', 'rename', id, title);
    },
    handleHideDropDownWrap: function () {
        this.setState({
            dropDownWrapState: null
        })
    },
    render: function () {
        let me = this;
        let menuList;
        if (this.state.defaultProps) {
            let defaultFile = this.props.defaultFile ? this.props.defaultFile : {
                fileID: this.state.defaultProps[0].tables[0].id,
                folderID: this.state.defaultProps[0].id,
            };
            console.log('this.state.defaultFile', defaultFile);
            menuList = this.state.defaultProps.map(function (item, i) {
                return (
                    <li className={(item.id === defaultFile.folderID) ? 'active' : null} ref={'list_' + item.id}
                        key={i}>
                        <a onClick={me.handleChangeList.bind(null, i, item.id)}>
                            <i className={(item.id === defaultFile.folderID) ? "fa fa-folder-open" : 'fa fa-folder'}
                               ref={'list_i_'+item.id}>
                            </i>
                            {item.title}
                        </a>
                        <span className="fa fa-plus-square finder-edit"
                              onClick={me.handleSettingFinder.bind(null, i)}>
                        </span>
                        {me.state.dropDownWrapState === ('schema_' + i) ?
                            <ul className="dropdown-wrap" onMouseLeave={me.handleHideDropDownWrap}>
                                <li className="dropdown-item"
                                    onClick={me.handleAddFile.bind(null, i)}>
                                    添加文件
                                </li>
                                <li className="dropdown-item"
                                    onClick={me.handleDeleteFinder.bind(null, i)}>
                                    删除
                                </li>
                                <li className="dropdown-item"
                                    onClick={me.handleRenameFinder.bind(null, i)}>
                                    重命名
                                </li>
                            </ul> : null}
                            {item.tables ?
                                <SidebarMenuSuperItem
                                    menu={item.tables}
                                    id={item.id}
                                    dropDownWrapState={me.state.dropDownWrapState}
                                    onChangeFile={me.onChangeFile}
                                    onSetting={me.onSettingFile}
                                    defaultFile={defaultFile}
                                /> :
                                null}
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
        this.state = {
            dropDownWrapState: null
        }
    }

    handleChangeSuperList(i, finderId) {
        let fileId = this.props.menu[i].id;
        this.setState({
            fileId: fileId
        });
        this.props.onChangeFile(i, 'schema', 'read', finderId, fileId);
    }

    handleSettingFile(i, id) {
        if (!this.state.dropDownWrapState) {
            this.setState({
                'dropDownWrapState': 'schema_' + id + "_" + i
            })
        } else {
            this.setState({
                'dropDownWrapState': null
            })
        }
    }

    handleDeleteFile(i) {
        let fileId = this.props.menu[i].id,
            title = this.props.menu[i].title;
        this.props.onSetting(i, 'schema', 'deleteFile', fileId, title)
    }

    handleHideDropDownWrap() {
        this.setState({
            dropDownWrapState: null
        })
    }

    render() {
        let me = this;
        return (
            <ul className="nav child_menu" id={this.props.id}>
                {
                    this.props.menu.map(function (item, i) {
                        return (
                            <li className={(item.id == me.props.defaultFile.fileID) && 'current_page'} key={i}>
                                <a onClick={me.handleChangeSuperList.bind(me, i, me.props.id)}>
                                    <i className={(item.id == me.props.defaultFile.fileID) ?'fa fa-circle' : 'fa fa-circle-o'}>
                                    </i>
                                    {item.title}
                                </a>
                                <i className="fa fa-edit icon"
                                   onClick={me.handleSettingFile.bind(me, i, me.props.id)}>
                                </i>
                                {me.state.dropDownWrapState === ('schema_' + me.props.id + '_' + i) ?
                                    <ul className="dropdown-wrap" onMouseLeave={me.handleHideDropDownWrap.bind(me)}>
                                        <li className="dropdown-item"
                                            onClick={me.handleDeleteFile.bind(me, i)}>
                                            删除
                                        </li>
                                    </ul> : null}
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}
export default SidebarMenu;