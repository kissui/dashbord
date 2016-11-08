'use strict';

import React from 'react';

module.exports=React.createClass({
	render: function () {
		return(
			<div className="col-md-3">
				<div className="chart-dimension shim">
					<h5>维度: </h5>
					<ul>
						<KpiDimensionItem
							type="dimension"
							defaultData={dimension}
							onChangeChart={this.handleChangeChart}
						/>
					</ul>
				</div>
				<div className="chart-kpi shim height-limit">
					<h5>指标: </h5>
					<KpiDimensionItem
						type="kpi"
						defaultData={KPI}
						onChangeChart={this.handleChangeChart}
					/>
				</div>
				<div className="chart-type shim">
					<h5>图表选择: </h5>
					<ul>
						<li className={this.state.changeChartType === "line" ? 'line active' : 'line'}
							onClick={this.handleChangChartType.bind(this, 'line')}>
						</li>
						<li className={this.state.changeChartType === "interval" ? 'interval active' : 'interval'}
							onClick={this.handleChangChartType.bind(this, 'interval')}>
						</li>
						<li className={this.state.changeChartType === "pie" ? 'pie active' : 'pie'}
							onClick={this.handleChangChartType.bind(this, 'pie')}>
						</li>
						<li className={this.state.changeChartType === "area" ? 'area active' : 'area'}
							onClick={this.handleChangChartType.bind(this, 'area')}>
						</li>
					</ul>
				</div>
			</div>
		)
	}
})