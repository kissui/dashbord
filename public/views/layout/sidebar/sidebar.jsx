'use strict';
import React from 'react';
import http from '../../../lib/http';
import EditFinderModal from '../../../components/finderModal';
import SidebarMenu from './sidebarmenu';

module.exports = React.createClass({
	getInitialState: function () {
		const {onFolderConf, onTabIndex, onModal} = this.props;
		return {
			'folderConf': onFolderConf,
			'tabIndex': onTabIndex,
			'isShow': onModal,
		}
	},
	componentWillMount: function () {
		this.handleGetFolderTree()
	},
	handleGetFolderTree: function () {
		http.get('/api/?c=table.folder&ac=tree')
			.then(data => (data.data))
			.then((data) => {
				if (data.errcode === 10000 && data.data) {
					this.setState({
						folderLists: data.data
					});
					sessionStorage.setItem('SIDEBAR_LIST',JSON.stringify(data.data))
				} else {
					// 当前用户默认或者文件全部删除处理
				}
			})
			.catch(data => {
				console.log(data);
			})
	},
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			'isShow': false,
			'folderConf': nextProps.onFolderConf,
		})
	},
	menuChange: function () {
		this.handleGetFolderTree();
		this.setState({
			menuChangeState: 'true',
			'isShow': false
		})
	},
	receiveFolderOption: function (conf) {
		console.log(conf)
		this.setState({
			'isShow': true,
			'modalType': conf
		});
		// add or addFile create report
		// else if (modalTypeData.type === 'add' || modalTypeData.option=="addFile") {
		// 	content = <SchemaAddFile
		// 		onClick={this.closeModal}
		// 		menuChange = {this.menuChange}
		// 	/>
		// }
	},
	/** receive folder conf **/
	receiveFolderConf: function (conf) {
		this.props.onReceiveFolderConf(conf)
	},
	/** receive folder conf end **/
	render: function () {
		const {folderLists,folderConf,tabIndex} = this.state;
		return (
			<div className="kepler-sidebar">
				<div className="sidebar-box">
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
					<EditFinderModal
						isShow={this.state.isShow}
						type={this.state.modalType}
						menuChange={this.menuChange}
					/>
					<SidebarMenu
						onFolderConf={folderConf}
						onTabIndex={tabIndex}
						onFolderLists={folderLists}
						onReceiveFolderConf={this.receiveFolderConf}
						onReceiveFolderOption={this.receiveFolderOption}
					/>
				</div>
			</div>
		)
	}
});
