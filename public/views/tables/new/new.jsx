'use strict';

var React = require('react');
import SideMenu from '../../sidebar/sidebar';
import NavigationTab from '../../tab/tab';
import CreateFilePage from '../createFile';
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
		let params = this.props.params;
		return (
			<div>
				<SideMenu
					onParams={params}
					onModal={false}
				/>
				<NavigationTab selectIndex={1}/>
				<div className="kepler-container">
					<div className="content">
						<CreateFilePage
							onState={this.onState}
							onConf={this.state.onFileOption}
						/>
					</div>
				</div>
			</div>
		);
	}
});