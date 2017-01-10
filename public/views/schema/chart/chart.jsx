'use strict';
import React from 'react';
import chartCtr from '../../../components/chart/changeChart';
export default class ChartContentPage extends React.Component{
	constructor(context,props) {
		super(context,props);
	}
	render () {
		console.log(this.props.onFileData,'@onFileData');
		const {onFileData} = this.props;
		return (
			<div className="view-chart">
				<div className="view-chart-title">
					{/*{onFileData.title}*/}
				</div>
				<div className="chart-kpi-List">
				</div>
				<div id="chart-canvas"></div>
			</div>
		)
	}
}