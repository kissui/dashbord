'use strict';
import React from 'react';
import http from '../../../lib/http';
import {Link, History, Router} from 'react-router';
import ViewHeader from '../widget/viewHeader';
import ViewBody from '../widget/viewBody';
import Loading from '../../../components/loading/loading';
import _ from 'lodash'

module.exports = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function () {
		return {
			contentDefault: null,
		}
	},
	componentDidMount: function () {
		let params = this.props.onParams;
		this.initialFileData(params.fileId);
	},
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			fileData: null,
		});
		if (nextProps && nextProps.onParams) {
			this.initialFileData(nextProps.onParams.fileId)
		}

	},
	initialFileData: function (fileId) {
		var _this = this;
		http.get('/api/?c=table.tables&ac=index&id=' + fileId)
			.then(data => data.data)
			.then((data) => {
				if (data.errcode === 10000) {
					if (data.data && data.msg === 'success') {
						_this.setState({
							fileData: data.data,
							onShowChart: _.has(data.data.chart_conf, 'type')
						});
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

	handleAddFile: function () {
		this.context.router.push({
			pathname: '/group/table/new'
		})
	},
	handleEditFile: function (conf) {
		console.log(conf);
		this.context.router.push({
			pathname: '/group/table/edit/'+conf.folder_id +'/'+conf.id,
		})
	},
	handleChangeChart: function () {
		this.setState({
			'onShowChart': true
		})
	},
	render: function () {
		const {fileData, onShowChart} = this.state;
		let content;
		if (fileData) {
			content = (
				<div>
					<ViewHeader
						viewHeader={fileData}
						onAddFile={this.handleAddFile}
						onEditFile={this.handleEditFile}
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