'use strict';
import React from 'react';
import chartCtr from '../../../components/chart/changeChart';
import _ from 'lodash';
export default class ChartContentPage extends React.Component {
	constructor(context, props) {
		super(context, props);
	}

	componentDidMount() {
		const {onFileData} = this.props;
		let fields = onFileData.table_conf.fields;
		fields = _.concat(fields.dimension_fields, fields.data_fields);
		console.log(fields);
		let data= chartCtr.handleChartDataChannel(onFileData.data,fields,onFileData.table_conf.channel);
		// chartCtr.handleShowSingleKChart('chart-canvas',data,['登录角色数-19.d1.f1'],['日期'])
	}

	render() {
		console.log(this.props.onFileData, '@onFileData');
		const {onFileData} = this.props;
		let kpiList = onFileData.table_conf.fields.data_fields;
		return (
			<div className="view-chart">
				<div className="view-chart-title">
					趋势图
				</div>
				<ul className="chart-kpi-List">
					{kpiList.map((item, i)=> {
						return <li key={i}>{item.title}</li>
					})}
				</ul>
				<div id="chart-canvas"></div>
			</div>
		)
	}
}