'use strict';

var React = require('react');
import SideMenu from '../sidebar/sidebar';
import NavigationTab from '../tab/tab';

module.exports = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function () {
		return {
			'dropDownWrapState': null,
			'sidebarState': {},
		}
	},
	componentDidMount: function () {
		let sessionStorages = JSON.parse(sessionStorage.getItem('SCHEMA_FILE_DETAIL'));
		if (sessionStorages) {
			// this.context.router.push({
			// 	pathname: '/app/schema/'+sessionStorages.id,
			// 	query: {
			// 		'folder': sessionStorages.folder_id,
			// 		'file': sessionStorages.id
			// 	}
			// });
			this.setState({
				'fileId': sessionStorages.id,
				'sidebarState': {
					fileID: sessionStorages.id,
					folderID: sessionStorages.folder_id
				}
			});
		} else if (!sessionStorages && this.props.history.query){
			let query = this.props.history.query;
			this.setState({
				'fileId': query.file,
				'sidebarState': {
					fileID: query.file,
					folderID: query.folder
				}
			});
		}
	},
	render: function render() {
		return (
			<div>
				<SideMenu
					selectIndex={1}
					defaultFile={this.state.sidebarState}
					state={this.state.dropDownWrapState}
					onModal={false}
				/>
				<NavigationTab selectIndex={1}/>
			</div>
		);
	}
});
