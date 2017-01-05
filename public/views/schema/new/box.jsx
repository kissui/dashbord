'use strict';

var React = require('react');
import SideMenu from '../../layout/sidebar/sidebar';
import HeaderPage from '../../layout/head';
import NewReportPage from '../new/content';

module.exports = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	componentWillMount: function () {
		const {routeParams} = this.props;
		// this.context.router.push({
		// 	pathname: '/index/report/new/' + routeParams.folderId + '/' + routeParams.fileId
		// });
		if(routeParams) {
			this.setState({
				'fileId': routeParams.fileId,
				'folderConf': {
					fileId: routeParams.fileId,
					folderId: routeParams.folderId
				}
			});
		}

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
					<NewReportPage onFileDetail={folderConf}/>
				</div>
			</div>
		);
	}
});
