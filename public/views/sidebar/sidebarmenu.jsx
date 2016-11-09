'use strict';

import React from 'react';
import http from '../../lib/http';
import _ from 'lodash';
import SidebarMenuItem from './SidebarMenuPage';
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
			'dropDownWrapState': null,
			sideListDate: null
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
				if (data.errcode === 10000 && data.data) {
					_me.setState({
						sideListDate: data.data
					});
					sessionStorage.setItem('SIDEBAR_LIST', JSON.stringify(data.data))
				} else {
					// 当前用户默认或者文件全部删除处理
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

	handleGlobalAddFile(id, folder) {
		let type = (id && id.length > 0) ? 'folderFile' : 'globalFile';
		this.props.onGlobalClick('schema', type, id, folder)
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
		const {sideListDate, dropDownWrapState} = this.state;
		return (
			<div id="sidebar-menu" className="sidebar-menu">
				<h3 className="authority row">
					<div className="col-md-6">
                        <span>
                           工作表
                        </span>
					</div>
					<div className="col-md-6 text-right sidebar-icon">
						<i className="fa fa-plus" onClick={this.handlePlusFolder.bind(this)}>
						</i>
						<i className="fa fa-list" onClick={this.handleOpenFile.bind(this)}>
						</i>
					</div>
					{dropDownWrapState ?
						<ul className="dropdown-wrap" onMouseLeave={this.handleHideDropDownWrap.bind(this)}>
							<li className="dropdown-item" onClick={this.handleEditFinder.bind(this)}>添加文件夹</li>
							<li className="dropdown-item" onClick={this.handleGlobalAddFile.bind(this)}>添加工作表</li>
						</ul> : null}
				</h3>
				{sideListDate ? <SidebarMenuItem
					onSidebarData={sideListDate}
				/> : null}
			</div>
		)
	}
}
export default SidebarMenu;