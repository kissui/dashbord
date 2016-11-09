'use strict';
import React from 'react';
import SidebarMenuSuperItem from './superItemPage';
import FolderSetPage from './folderOptionPage';
module.exports = React.createClass({
	getInitialState: function () {
		const {onSidebarData} = this.props;
		let id = onSidebarData[0].id;
		return {
			dropDownWrapState: null,
			['defaultFolder_' + id]: true
		}
	},
	handleChangeFolder: function (i, id) {
		this.setState({
			["defaultFolder_" + id]: !this.state[["defaultFolder_" + id]]
		})
	},
	handleSettingFolder: function (i) {
		console.log(i)
	},
	handleReceiveFolderSetting: function (id, type) {
		console.log(id, type)
	},
	render: function () {
		const {onSidebarData} = this.props;
		let menuList = null;
		let _this = this;
		if (onSidebarData) {
			menuList = onSidebarData.map(function (item, i) {
				return (
					<li className={true ? 'active' : null}
						key={i}>
						<a onClick={_this.handleChangeFolder.bind(null, i, item.id)}>
							<i className={true ? "fa fa-folder-open" : 'fa fa-folder'}>
							</i>
							{item.title}
						</a>
						<span className="fa fa-plus-square finder-edit"
							  onClick={_this.handleSettingFolder.bind(null, i)}>
                        </span>
						{_this.state.dropDownWrapState === ('schema_' + i) ?
							<FolderSetPage onFolderId={item.id}
										   onReceiveFolderSetting={_this.handleReceiveFolderSetting}/>
							: null}
						{item.tables ?
							<SidebarMenuSuperItem
								onMenu={item.tables}
								folderId={item.id}
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