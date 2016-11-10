'use strict';
import React from 'react';
import EditFinderModal from '../../components/finderModal';
import SidebarMenu from './sidebarmenu';

module.exports = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function () {
		return {
			'isShow': this.props.onModal,
			'change': false
		}
	},
	handleDeleteFile: function (fileId) {
		this.setState({
			isShow: true,
			modalType: {
				tabType: 'tables',
				optionType: "deleteFile",
				id: fileId
			}
		})
	},
	handleFolderSetting: function (id, option) {
		if (option === 'ADDFILE') {
			this.context.router.push({
				pathname: '/group/table/new',
				state: {
					folderId: id
				}
			})
		} else {
			this.setState({
				isShow: true,
				modalType: {
					tabType: 'tables',
					optionType: option,
					id: id
				}
			})
		}

	},
	handleHeadAddFolder: function () {
		this.setState({
			isShow: true,
			modalType: {
				tabType: 'tables',
				optionType: 'addFolder'
			}
		})
	},
	handleHeadAddFile: function () {
		this.context.router.push({
			pathname: '/group/table/new'
		})
	},
	menuChange: function () {
		this.setState({
			change: true
		})
	},
	render: function () {
		const {onParams} = this.props;
		const {isShow, modalType, change} = this.state;
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
						isShow={isShow}
						type={modalType}
						menuChange={this.menuChange}
					/>

					<SidebarMenu
						onParams={onParams}

						onChangeSidebar={change}

						onReceiveDeleteFile={this.handleDeleteFile}

						onReceiveFolderSetting={this.handleFolderSetting}

						onReceiveHeadAddFolder={this.handleHeadAddFolder}

						onReceiveHeadAddFile={this.handleHeadAddFile}
					/>
				</div>
			</div>
		)
	}
});
