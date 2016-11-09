'use strict';
import React from 'react';
/**
 * @todo 一级菜单的操作模块
 * @props => onFolderId 当前菜单的ID
 * @props => onHideOption 操作模块的显示隐藏操作
 * @props => onReceiveFolderSetting 当前菜单的设置操作,返回的参数(folderID,[option...])
 * @DEMO <FolderSetPage
 * 			onFolderId={item.id}
 *			onReceiveFolderSetting={_this.handleReceiveFolderSetting}
 *			onHideOption={_this.handleHideOption}
 *		/>
 * @type {any}
 */
module.exports = React.createClass({
	// getInitialState: function () {
	//
	// },
	handleHideDropDownWrap: function () {
		this.props.onHideOption();
	},
	handleFolderOperate: function (id, type) {
		this.props.onReceiveFolderSetting(id, type)
	},
	render: function () {
		const {onFolderId} = this.props;
		return (
			<ul className="dropdown-wrap" onMouseLeave={this.handleHideDropDownWrap}>
				<li className="dropdown-item"
					onClick={this.handleFolderOperate.bind(null, onFolderId, 'ADDFILE')}>
					添加文件
				</li>
				<li className="dropdown-item"
					onClick={this.handleFolderOperate.bind(null, onFolderId, "DELETEFOLDER")}>
					删除
				</li>
				<li className="dropdown-item"
					onClick={this.handleFolderOperate.bind(null, onFolderId, "RENAMEFOLDER")}>
					重命名
				</li>
			</ul>
		)
	}
});