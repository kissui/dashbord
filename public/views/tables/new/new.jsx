'use strict';

var React = require('react');
import SideMenu from '../../sidebar/sidebar';
import NavigationTab from '../../tab/tab';
import ContentPage from './content';
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

	},
	onState: function (){

	},
	render: function render() {
		const {params} = this.props;
		if(this.props.location.state){
			params.folderId = this.props.location.state.folderId;
		}
		console.log('@init:',params);
		return (
			<div>
				<SideMenu
					onParams={params}
					onModal={false}
				/>
				<NavigationTab selectIndex={1}/>
				<div className="kepler-container">
					<ContentPage onParams={params}/>
				</div>
			</div>
		);
	}
});