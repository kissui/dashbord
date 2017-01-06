'use strict';

import React from 'react';
import http from '../../../lib/http';
/**
 * @todo 左侧菜单,default width 200px
 * @description 为了方便处理dropdown_wrap
 * 全局的dropdown,公用一个state
 */
const tabConf = [
	{
		'title': '仪表盘'
	},
	{
		'title': '工作表'
	},
	{
		'title': '数据源'
	}
];
class SidebarMenu extends React.Component {

	constructor(props) {
		super(props);
		const {onFolderConf, onFolderLists} = this.props;
		this.state = {
			folderOptionState: false,
			folderConf: onFolderConf
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			folderConf: nextProps.onFolderConf
		})
	}

	/** folder or file option conf**/
	receiveFolderOption(conf) {
		if(_.isObject(conf)) {
			this.props.onReceiveFolderOption(conf)
		} else {
			this.props.onReceiveFolderOption({
				type: 'headBar',
				option: conf
			})
		}
	}

	/** folder or file option conf end **/
	/** receive folder conf **/
	receiveFolderConf(conf) {
		this.props.onReceiveFolderConf(conf)
	}

	/** receive folder conf end **/
	/** top option folder event **/
	handleTogglePlusModule() {
		this.setState({
			folderOptionState: true
		})
	}

	handleTogglePlusModuleFalse() {
		this.setState({
			folderOptionState: false
		})
	}

	/** top option folder event end**/
	render() {
		const {onFolderLists, onTabIndex} = this.props;
		const {folderOptionState, folderConf} = this.state;
		let title = tabConf[onTabIndex].title;
		let folderTpl = null;
		if (folderOptionState) {
			folderTpl = (
				<ul className="dropdown-wrap" onMouseLeave={this.handleTogglePlusModuleFalse.bind(this)}>
					<li className="dropdown-item" onClick={this.receiveFolderOption.bind(this, 'addFolder')}>添加文件夹</li>
					<li className="dropdown-item" onClick={this.receiveFolderOption.bind(this, 'addFile')}>添加工作表</li>
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
						<i className="fa fa-plus" onMouseEnter={this.handleTogglePlusModule.bind(this)}>
						</i>
						<i className="fa fa-list" onClick={this.receiveFolderOption.bind(this, 'addFile')}>
						</i>
					</div>
					{folderTpl}
				</h3>
				<SidebarMenuItem
					onFolderLists={onFolderLists}
					onFolderConf={folderConf}
					onDropDownState={this.state.dropDownWrapState}
					onReceiveFolderConf={this.receiveFolderConf.bind(this)}
					onReceiveFolderOption={this.receiveFolderOption.bind(this)}
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

var SidebarMenuItem = React.createClass({
	getInitialState: function () {
		const {onFolderLists, onFolderConf} = this.props;
		return {
			'folderLists': onFolderLists,
			'folderConf': onFolderConf
		}
	},
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			folderLists: nextProps.onFolderLists,
			folderConf: nextProps.onFolderConf
		})

	},
	handleChangeList: function (i, id) {
		if (!this.refs['list_' + id].className) {
			this.refs['list_' + id].className = 'active';
			this.refs['list_i_' + id].className = 'fa fa-folder-open'
		} else {
			this.refs['list_' + id].className = '';
			this.refs['list_i_' + id].className = 'fa fa-folder'
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
	onSettingFile: function (index, tabName, optionType, fileId, title) {
		this.props.onSetting(index, tabName, optionType, fileId, title);
	},
	handleFolderOption: function (i, type) {
		const {folderLists} = this.state;
		if (_.isObject(i)) {
			return this.props.onReceiveFolderOption(i)
		} else {
			let folderId = folderLists[i].id;
			this.props.onReceiveFolderOption({folderId: folderId, type: type, lists: folderLists});
		}


	},
	handleHideDropDownWrap: function () {
		this.setState({
			dropDownWrapState: null
		})
	},
	receiveFolderConf: function (conf) {
		this.props.onReceiveFolderConf(conf)
	},
	render: function () {
		let me = this;
		let menuList;
		const {folderLists, folderConf} = this.state;

		if (folderLists) {
			menuList = folderLists.map(function (item, i) {
				return (
					<li className={(item.id === folderConf.folderId) ? 'active' : null} ref={'list_' + item.id}
						key={i}>
						<a onClick={me.handleChangeList.bind(null, i, item.id)}>
							<i className={(item.id === folderConf.folderId) ? "fa fa-folder-open" : 'fa fa-folder'}
							   ref={'list_i_' + item.id}>
							</i>
							{item.title}
						</a>
						<span className="fa fa-ellipsis-v finder-edit"
							  onClick={me.handleSettingFinder.bind(null, i)}>
                        </span>
						{me.state.dropDownWrapState === ('schema_' + i) ?
							<ul className="dropdown-wrap" onMouseLeave={me.handleHideDropDownWrap}>
								<li className="dropdown-item"
									onClick={me.handleFolderOption.bind(null, i, 'add')}>
									添加文件
								</li>
								<li className="dropdown-item"
									onClick={me.handleFolderOption.bind(null, i, 'del')}>
									删除
								</li>
								<li className="dropdown-item"
									onClick={me.handleFolderOption.bind(null, i, 'rename')}>
									重命名
								</li>
							</ul> : null}
						{item.tables ?
							<SidebarMenuSuperItem
								menu={item.tables}
								id={item.id}
								dropDownWrapState={me.state.dropDownWrapState}
								onReceiveFolderConf={me.receiveFolderConf}
								onDealFile={me.handleFolderOption}
								onFolderConf={folderConf}
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
			dropDownWrapState: null,
			folderConf: this.props.onFolderConf
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			folderConf: nextProps.onFolderConf
		})
	}

	handleChangeSuperList(i, folderId) {
		let fileId = this.props.menu[i].id;
		this.setState({
			folderConf: {
				fileId: fileId,
				folderId: folderId
			}
		});
		this.props.onReceiveFolderConf({
			folderId: folderId,
			fileId: fileId
		})

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

	handleFileOption(i) {
		let fileId = this.props.menu[i].id,
			title = this.props.menu[i].title;
		this.props.onDealFile({fileId: fileId, title: title, type: 'delFile'})
	}

	handleHideDropDownWrap() {
		this.setState({
			dropDownWrapState: null
		})
	}

	render() {
		let me = this;
		const {folderConf} = this.state;
		return (
			<ul className="nav child_menu" id={this.props.id}>
				{
					this.props.menu.map(function (item, i) {
						return (
							<li className={(item.id == folderConf.fileId) && 'current_page'} key={i}>
								<a onClick={me.handleChangeSuperList.bind(me, i, me.props.id)}>
									<i className={(item.id == folderConf.fileId) ? 'fa fa-circle' : 'fa fa-circle-o'}>
									</i>
									{item.title}
								</a>
								<i className="fa fa-ellipsis-v icon"
								   onClick={me.handleSettingFile.bind(me, i, me.props.id)}>
								</i>
								{me.state.dropDownWrapState === ('schema_' + me.props.id + '_' + i) ?
									<ul className="dropdown-wrap" onMouseLeave={me.handleHideDropDownWrap.bind(me)}>
										<li className="dropdown-item"
											onClick={me.handleFileOption.bind(me, i)}>
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