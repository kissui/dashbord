'use strict';
import React from 'react';

module.exports = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function () {
		const {onFolderConf, viewHeader} = this.props;
		return {
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
	render: function () {
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
			</div>
		)
	}
});