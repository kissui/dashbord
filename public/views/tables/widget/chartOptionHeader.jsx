'use strict';

import React from 'react';

module.exports = React.createClass({
	getInitialState: function () {
		return {
			isShowChartOption: false
		}
	},
	handleOperationBlank: function () {
		let isShow= !this.state.isShowChartOption
		this.props.onReceiveShowType(isShow)
	},
	handleSaveChartConf: function (type) {
		this.props.onReceiveSettingType(type);
	},
	render: function () {
		const {onTitle,onShowHead} = this.props;
		const {isShowChartOption} = this.state;
		return (
			<h4 className={onShowHead ? "chart-title" : 'hide'}>
				{onTitle}图表
				<div className="chart-option">
					<label onClick={this.handleOperationBlank}>
						<i className="fa fa-edit"></i>
						<span>编辑</span>
					</label>
					<label onClick={this.handleSaveChartConf.bind(this, 'save')}>
						<i className="fa fa-star">
						</i>
						<span>保存</span>
					</label>
					<label onClick={this.handleSaveChartConf.bind(this, 'delete')}>
						<i className="fa fa-minus-circle">
						</i>
						<span>删除</span>
					</label>
				</div>
			</h4>
		)
	}
})