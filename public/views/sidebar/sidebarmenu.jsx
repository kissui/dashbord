'use strict';

import React from 'react';
import http from '../../lib/http';
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
			'dropDownWrapState': null,
			sideListDate: null
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

	handleHideDropDownWrap() { //隐藏全局文件操作的函数
		this.setState({
			dropDownWrapState: null
		})
	}

	handleShowFolderPlusModal() { //显示全局添加目录
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
	handleShowOpenFile() { // 暂时未启用
	}

	handleHeadAddFolder() { //添加目录文件
		this.props.onReceiveHeadAddFolder();
		this.setState({
			'dropDownWrapState': null
		})
	}
	handleHeadAddFile() {
		this.props.onReceiveHeadAddFile()
	}
	// sidebar 的操作
	handleFolderSetting(id, option) {
		this.props.onReceiveFolderSetting(id, option)
	}

	handleDeleteFile(fileId) {
		this.props.onReceiveDeleteFile(fileId);
	}
	// sidebar 的操作 ending
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
						<i className="fa fa-plus" onClick={this.handleShowFolderPlusModal.bind(this)}>
						</i>
						<i className="fa fa-list" onClick={this.handleShowOpenFile.bind(this)}>
						</i>
					</div>
					{dropDownWrapState ?
						<ul className="dropdown-wrap" onMouseLeave={this.handleHideDropDownWrap.bind(this)}>
							<li className="dropdown-item" onClick={this.handleHeadAddFolder.bind(this)}>添加文件夹</li>
							<li className="dropdown-item" onClick={this.handleHeadAddFile.bind(this)}>添加工作表</li>
						</ul> : null}
				</h3>
				{sideListDate ?
					<SidebarMenuItem
						onSidebarData={sideListDate}
						onParams={this.props.onParams}
						onReceiveFolderSetting={this.handleFolderSetting.bind(this)}
						onReceiveDeleteFileId={this.handleDeleteFile.bind(this)}
					/>
					: null}
			</div>
		)
	}
}
export default SidebarMenu;