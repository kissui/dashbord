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
	componentDidMount: function () {
		const {folderConf} = this.state;
		console.log('Did',folderConf);
		this.handleGetFolderTree(folderConf)
	},
	componentWillReceiveProps: function (nextProps) {
		console.log('props',nextProps.onFolderConf);

		this.setState({
			'isShow': false,
			'folderConf': nextProps.onFolderConf,
		});
		this.handleGetFolderTree(nextProps.onFolderConf);
	},
	handleGetFolderTree: function (param) {

		let folderConf;
		if (param) {
			folderConf = param;
		} else {
			folderConf = this.state.folderConf;
		}

		http.get('/api/?c=table.folder&ac=tree')
			.then(data => (data.data))
			.then((data) => {
				if (data.errcode === 10000 && data.data) {
					this.setState({
						folderLists: data.data
					});
					if (folderConf && _.isEmpty(folderConf.fileId) && _.isEmpty(folderConf.folderId)) {
						this.props.onReceicePathParams({
							folderId: data.data[0].id,
							fileId: data.data[0].tables[0].id
						});
					}
					sessionStorage.setItem('SIDEBAR_LIST', JSON.stringify(data.data))
				} else {
					// 当前用户默认或者文件全部删除处理
				}
			})
			.catch(data => {
				console.log(data);
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
		const {folderLists, folderConf, tabIndex} = this.state;
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
