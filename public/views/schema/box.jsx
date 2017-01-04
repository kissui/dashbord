'use strict';

var React = require('react');
import SideMenu from '../layout/sidebar/sidebar';
import HeaderPage from '../layout/head';
import SchemaPage from './content';

module.exports = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	componentWillMount: function () {
		const {routeParams} = this.props;
		this.context.router.push({
			pathname: '/index/report/schema/' + routeParams.folderId + '/' + routeParams.fileId
		});
		this.setState({
			'fileId': routeParams.fileId,
			'folderConf': {
				fileId: routeParams.fileId,
				folderId: routeParams.folderId
			}
		});
	},
	receiveFolderConf: function (conf) {
		this.context.router.push({
			pathname: '/index/report/schema/' + conf.folderId + '/' + conf.fileId
		});
		this.setState({
			'folderConf': {
				fileId: conf.fileId,
				folderId: conf.folderId
			}
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
	/**
	 * 创建table,修改tab的状态更新
	 * @param id
	 * @param folderId
	 */
	onState: function (id, folderId) {
		// this.setState({
		// 	'fileId': id,
		// 	'folderId': folderId,
		// 	'createFileState': false,
		// 	'sidebarState': {
		// 		fileID: id,
		// 		folderID: folderId
		// 	}
		// });
		// this.context.router.push({
		// 	pathname: '/index/schema/' + id,
		// 	query: {
		// 		'folder': folderId,
		// 		'file': id
		// 	}
		// });
	},
	render: function render() {
		const{folderConf} = this.state;
		return (
			<div>
				<SideMenu
					onTabIndex={1}
					onFolderConf={folderConf}
					onModal={false}
					onReceiveFolderConf={this.receiveFolderConf}
				/>
				<HeaderPage selectIndex={1}/>
				<div className="kepler-container">
					{/*<SchemaPage
						currentPage={this.state.fileData}
						fileId={this.state.fileId}
						onFileOption={this.state.onFileOption}
						createFileState={this.state.createFileState}
						onState={this.onState}
						onAddFile={this.onGlobalClick}
						onEditFile={this.onGlobalClick}/>*/}
				</div>
			</div>
		);
	}
});
