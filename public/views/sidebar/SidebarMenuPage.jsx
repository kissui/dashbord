'use strict';
import React from 'react';
import SidebarMenuSuperItem from './superItemPage';
import FolderSetPage from './folderOptionPage';
/**
 * @todo 菜单显示模块
 * @props => onSidebarData 菜单显示的数据
 * @props => onParams 初始化路由的params参数,操作默认菜单显示的结构
 * @props => onReceiveFolderSetting 一级菜单操作
 * @props => onReceiveDeleteFileId 当前报表的删除操作传递
 * @DEMO <SidebarMenuItem
 *			onSidebarData={sideListDate}
 *			onParams={this.props.onParams}
 *			onReceiveFolderSetting={this.handleFolderSetting}
 *			onReceiveDeleteFileId={this.handleDeleteFile}
 *		/>
 * @type {any}
 */
module.exports = React.createClass({
	getInitialState: function () {
		return {
			dropDownWrapState: null,
		}
	},
	handleChangeFolder: function (i, id) {
		if (!this.refs['list_' + id].className) {
			this.refs['list_' + id].className = 'active';
			this.refs['list_i_' + id].className = 'fa fa-folder-open'
		} else {
			this.refs['list_' + id].className = '';
			this.refs['list_i_' + id].className = 'fa fa-folder'
		}
	},
	handleSettingFolder: function (i) {
		this.setState({
			dropDownWrapState: 'schema_' + i
		})
	},
	handleHideOption: function () {
		this.setState({
			dropDownWrapState: null
		})
	},
	handleReceiveFolderSetting: function (id, type) {
		this.props.onReceiveFolderSetting(id,type);
	},
	handleDeleteFile: function (fileId) {
		this.props.onReceiveDeleteFileId(fileId);
	},
	render: function () {
		const {onSidebarData, onParams} = this.props;
		let menuList = null;
		let _this = this;
		if (onSidebarData) {
			menuList = onSidebarData.map(function (item, i) {
				return (
					<li className={item.id == onParams.folderId ? 'active' : null} ref={'list_' + item.id}
						key={i}>
						<a onClick={_this.handleChangeFolder.bind(null, i, item.id)}>
							<i className={item.id == onParams.folderId ? "fa fa-folder-open" : 'fa fa-folder'}
							   ref={'list_i_' + item.id}
							>
							</i>
							{item.title}
						</a>
						<span className="fa fa-plus-square finder-edit"
							  onClick={_this.handleSettingFolder.bind(null, i)}>
                        </span>
						{_this.state.dropDownWrapState === ('schema_' + i) ?
							<FolderSetPage
								onFolderId={item.id}
								onReceiveFolderSetting={_this.handleReceiveFolderSetting}
								onHideOption={_this.handleHideOption}
							/>
							: null}
						{item.tables ?
							<SidebarMenuSuperItem
								onMenu={item.tables}
								onFolderId={item.id}
								onParams={onParams}
								onReceiveDeleteFileId={_this.handleDeleteFile}
							/> :
							null}
					</li>
				)
			});
		}
		return (
			<ul className="nav side-menu">
				{menuList}
			</ul>

		)
	}
});