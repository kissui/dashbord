'use strict';

var React = require('react');
import SideMenu from './layout/sidebar';
import HeaderPage from '../layout/head';


module.exports = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	componentWillMount: function () {

	},
	receiveFolderConf: function (conf) {

	},
	render: function render() {
		return (
			<div>
				<SideMenu/>
				<HeaderPage selectIndex={2}/>
				<div className="kepler-container">
					hello cube!
				</div>
			</div>
		);
	}
});
