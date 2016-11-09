'use strict';
import React from 'react';

module.exports = React.createClass({
	// getInitialState: function () {
	//
	// },
	handleHideDropDownWrap: function () {

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