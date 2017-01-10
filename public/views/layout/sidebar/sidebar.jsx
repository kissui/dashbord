'use strict';
import React from 'react';
import http from '../../../lib/http';
import EditFinderModal from '../../../components/finderModal';
import SidebarMenu from './sidebarmenu';

module.exports = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function () {
		const {onFolderConf, onTabIndex, onModal} = this.props;
		return {
			'folderConf': onFolderConf,
			'tabIndex': onTabIndex,
			'isShow': onModal,
		}
	},
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			'isShow': false,
			'folderConf': nextProps.onFolderConf,
		});
	},

	menuChange: function () {
		this.props.onReloadFolderList('folderOption');
		this.setState({
			'isShow': false
		})
	},
	receiveFolderOption: function (conf) {
		if (conf.type === 'add' || conf.option == "addFile") {
			this.context.router.push({
				pathname: '/index/report/new',
				query: {
					folderId: conf.folderId ? conf.folderId : '0'
				}
			});
		} else {
			this.setState({
				'isShow': true,
				'modalType': conf
			});
		}
	},
	/** receive folder conf **/
	receiveFolderConf: function (conf) {
		this.props.onReceiveFolderConf(conf)
	},
	/** receive folder conf end **/
	render: function () {
		const {folderConf, tabIndex} = this.state;
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
						onFolderLists={folderConf.folderList}
						onReceiveFolderConf={this.receiveFolderConf}
						onReceiveFolderOption={this.receiveFolderOption}
					/>
				</div>
			</div>
		)
	}
});
