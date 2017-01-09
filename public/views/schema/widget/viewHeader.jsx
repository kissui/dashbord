'use strict';
import React from 'react';
import moment from 'moment';
import DayPickerRange from '../../../components/datePicker/day';
module.exports = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function () {
		const {onFolderConf, viewHeader} = this.props;
		let defaultRange = 3600 * 24 * 7 * 1000;
		let endRange = +new Date();
		let startRange = endRange - defaultRange;
		let format = 'YYYY-MM-DD';
		return {
			dateRange: {
				dateStart: moment(new Date(startRange)).format(format).toString(),
				dateEnd: moment(new Date()).format(format).toString()
			},
			'header': viewHeader,
			folderConf: onFolderConf
		}
	},
	componentWillReceiveProps(nextProps) {
		this.setState({
			'folderConf': nextProps.onFolderConf
		})
	},
	handleAddFile: function () {
		const {folderConf} = this.state;
		this.context.router.push({
			pathname: '/index/report/new',
			query: {
				folderId: folderConf.folderId
			}
		});
	},
	handleChangeChart: function () {
		this.props.onChangeChart()
	},
	handleEditFile: function () {
		const {folderConf} = this.state;
		this.context.router.push({
			pathname: '/index/report/edit/' + folderConf.folderId + '/' + folderConf.fileId,
		});
	},
	handleReceiveDateRange: function (start, end) {
		const format = 'YYYY-MM-DD';
		this.setState({
			preDefined: {
				start: start.format(format).toString(),
				end: end.format(format).toString()
			}
		});
	},
	render: function () {
		const {dateRange} = this.state;
		const {onDateRange, onDateBoxSty} = this.props;
		return (
			<div className="view-header">
				<div className="row">
					<div className="col-md-6">
						<h2>{this.props.viewHeader.title}</h2>
					</div>
					<div className="col-md-6 text-right">
						<ul className="header-tab">
							<li onClick={this.handleAddFile}>
								<i className="fa fa-plus">
								</i>
								新建工作表
							</li>
							<li onClick={this.handleEditFile}>
								<i className="fa fa-edit">
								</i>
								编辑工作表
							</li>
							<li onClick={this.handleChangeChart}>
								<i className="fa fa-bar-chart">
								</i>
								生成图表
							</li>
						</ul>
					</div>
				</div>
				<div className="header-line">
					<i>日期：</i>
					<DayPickerRange
						onReceiveData={this.handleReceiveDateRange}
						isShowRange={false}
						onDefaultDateRange={dateRange}
						containerStyle={{
							position: 'relative',
							display: 'inline-block'
						}}
						singleStyle={{
							width: onDateBoxSty ? onDateBoxSty.inputSty : '90px'
						}}
						dateInputStyle={{
							width: onDateBoxSty ? onDateBoxSty.boxSty : '230px'
						}}
					/>
				</div>

			</div>
		)
	}
});