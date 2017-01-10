'use strict';

var React = require('react');
import SideMenu from '../../layout/sidebar/sidebar';
import HeaderPage from '../../layout/head';
import NewReportPage from '../new/createFile';
import _ from 'lodash';
import Init from '../../../lib/init';
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
		const {routeParams, location} = this.props;
		let _this = this;
		Init.getFolderList(res=> {
			let fileId = res[0].tables[0].id;
			let folderId = res[0].id;
			let folderList = res;
			let fileOpType = 'new';
			if (routeParams && !_.isEmpty(routeParams)) {
				folderId = routeParams.folderId;
				fileId = routeParams.fileId;
				fileOpType = 'edit';
			} else if(location.query) {
				folderId = location.query.folderId;
				fileId = null;
			}
			_this.setState({
				'folderConf': {
					fileId: fileId,
					folderId: folderId,
					fileOpType: fileOpType,
					folderList: folderList
				}
			});

		});

	},
	receiveFolderConf: function (conf) {
		const {folderConf} = this.state;
		this.context.router.push({
			pathname: '/index/report/schema/' + conf.folderId + '/' + conf.fileId
		});
		this.setState({
			'folderConf': {
				fileId: conf.fileId,
				folderId: conf.folderId,
				folderList: folderConf.folderList
			}
		});
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
				/>}
				<HeaderPage selectIndex={1}/>
				{folderConf && <div className="kepler-container">
					<NewReportPage onFileDetail={folderConf}/>
				</div>}
			</div>
		);
	}
});
