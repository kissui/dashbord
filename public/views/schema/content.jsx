'use strict';
import React from 'react';
import http from '../../lib/http';
import {Link, History, Router} from 'react-router';
import ViewHeader from './widget/viewHeader';
import ViewBody from './widget/viewBody';
import Loading from '../../components/loading/loading';
import ChartContentPage from './chart/chart';
import moment from 'moment';
module.exports = React.createClass({
	getInitialState: function () {
		const {onFileDetail} = this.props;
		let defaultRange = 3600 * 24 * 7 * 1000;
		let endRange = +new Date();
		let startRange = endRange - defaultRange;
		let format = 'YYYY-MM-DD';
		return {
			dateRange: {
				dateStart: moment(new Date(startRange)).format(format).toString(),
				dateEnd: moment(new Date()).format(format).toString()
			},
			contentDefault: null,
			fileDetail: onFileDetail,
		}
	},
	componentDidMount: function () {
		const {fileDetail} = this.state;
		this.initialFileData(fileDetail.fileId)
	},
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			'fileId': nextProps.fileId,
			'onFileOption': nextProps.onFileOption,
			'onShowChart': false,
			'fileDetail': nextProps.onFileDetail
		});
		if (nextProps.onFileDetail.fileId) {
			this.initialFileData(nextProps.onFileDetail.fileId)
		}
	},
	handleReloadTableByDate: function (dateRange) {
		const {fileDetail} = this.state;
		this.initialFileData(fileDetail.fileId, dateRange)
	},
	initialFileData: function (fileId, date) {
		let dateRange = date ? date : this.state.dateRange;
		this.setState({
			flag: false
		});
		let _this = this;
		if (!fileId) return;
		http.get('/api/?c=table.tables&ac=index&id=' + fileId, {
			params: {
				'startdate': dateRange.dateStart.split('-').join(''),
				'enddate': dateRange.dateEnd.split('-').join('')
			}
		})
			.then(data => data.data)
			.then((data) => {
				if (data.errcode === 10000) {
					if (data.data && data.msg === 'success') {
						_this.setState({
							fileData: data.data,
							flag: true
						});
						sessionStorage.setItem('SCHEMA_FILE_DETAIL', JSON.stringify(data.data));
					} else {
						_this.setState({
							fileData: null
						})
					}

				} else {
					_this.setState({
						errMsg: true
					})
				}


			})
	},
	handleChangeChart: function () {
		this.setState({
			'onShowChart': true
		})
	},
	render: function () {
		const {fileData, flag, fileDetail, onShowChart, dateRange} = this.state;
		let content;
		if (fileData && flag) {
			content = (
				<div>
					<ViewHeader
						viewHeader={fileData}
						onFolderConf={fileDetail}
						onDateRange={dateRange}
						onReloadTablesByDate={this.handleReloadTableByDate}
						onChangeChart={this.handleChangeChart}
					/>
					<ViewBody viewBody={fileData}
							  onChart={onShowChart}
					/>
				</div>
			)

		} else if (fileData === null) {
			content = (
				<div className="content-warning">
					<h2>当前工作表暂无数据</h2>
				</div>
			);
		} else if (this.state.errMsg) {
			content = (
				<div className="content-warning">
					<h2>{this.state.errMsg}</h2>
				</div>
			);
		} else {
			content = <Loading/>
		}
		return (
			<div className="content">
				{content}
			</div>
		)
	}
});
