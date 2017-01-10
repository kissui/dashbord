'use strict';

var React = require('react');
import SideMenu from '../layout/sidebar/sidebar';
import HeaderPage from '../layout/head';
import SchemaPage from './content';
import _ from 'lodash';
import Init from '../../lib/init';
module.exports = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function () {
		return {
			folderConf: null
		}
	},
	componentDidMount: function () {
		const {routeParams} = this.props;
		let _this = this;
		Init.getFolderList(res=> {
			let fileId = res[0].tables[0].id;
			let folderId = res[0].id;
			let folderList = res;
			if (routeParams && !_.isEmpty(routeParams)) {
				fileId = routeParams.fileId;
				folderId = routeParams.folderId;
			}
			_this.setState({
				'folderConf': {
					fileId: fileId,
					folderId: folderId,
					folderList: folderList
				}
			});
		});
	},
	handleReloadFolderList: function (conf) {
		const {folderConf} = this.state;
		if(conf ==='folderOption') {
			Init.getFolderList(res=>{
				this.setState({
					'folderConf': {
						fileId: res[0].tables[0].id,
						folderId: res[0].id,
						folderList: folderConf.folderList
					}
				});
			})
		} else {
			this.setState({
				'folderConf': {
					fileId: conf.fileId,
					folderId: conf.folderId,
					folderList: folderConf.folderList
				}
			});
		}

		this.context.router.push({
			pathname: '/index/report/schema/' + conf.folderId + '/' + conf.fileId
		});

	},
	receiveFolderConf: function (conf) {
		const {folderConf} = this.state;
		this.setState({
			'folderConf': {
				fileId: conf.fileId,
				folderId: conf.folderId,
				folderList: folderConf.folderList
			}
		});
		this.context.router.push({
			pathname: '/index/report/schema/' + conf.folderId + '/' + conf.fileId
		});
	},
	/**
	 * 全局的事件处理
	 * @param page
	 * @param type
	 * @param id
	 * @param conf
	 */
	onGlobalClick: function (page, type, id, conf) {
		this.setState({
			'onFileOption': {
				page: page,
				name: type,
				folderId: id,
				conf: conf
			},
			'createFileState': true,
			'fileId': null
		})
	},
	render: function render() {
		const {folderConf} = this.state;
		return (
			<div>
				{folderConf && <SideMenu
					onTabIndex={1}
					onFolderConf={folderConf}
					onModal={false}
					onReceiveFolderConf={this.receiveFolderConf}
					onReloadFolderList={this.handleReloadFolderList}
				/>}
				<HeaderPage selectIndex={1} onFolderConf={folderConf}/>
				<div className="kepler-container">
					{folderConf && <SchemaPage
						onFileDetail={folderConf}
						fileId={this.state.fileId}
						onFileOption={this.state.onFileOption}
						createFileState={this.state.createFileState}
						onAddFile={this.onGlobalClick}
						onEditFile={this.onGlobalClick}/>}
				</div>
			</div>
		);
	}
});
