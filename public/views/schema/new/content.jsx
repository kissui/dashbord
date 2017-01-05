'use strict';
import React from 'react';
import http from '../../../lib/http';
import {Link, History, Router} from 'react-router';
import CreateFilePage from './createFile';

module.exports = React.createClass({
	getInitialState: function () {
		const {onFileDetail} = this.props;
		return {
			contentDefault: null,
			fileDetail: onFileDetail
		}
	},
	componentDidMount: function () {
		let fileId = location.pathname.match(/\d./g) ? location.pathname.match(/\d./g)[0] : null;
		const {fileDetail} = this.state;
	},
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			contentDefault: nextProps.currentPage,
			fileId: nextProps.fileId,
			onFileOption: nextProps.onFileOption,
			createFileState: nextProps.createFileState,
			'onShowChart': false,
			fileDetail: nextProps.onFileDetail
		});
		if (nextProps.fileId) {
			this.initialFileData(nextProps.onFileDetail.fileId)
		}

	},
	initialFileData: function (fileId) {
		this.setState({
			flag: false
		});
		let id = fileId ? fileId : 1;
		var _this = this;
		http.get('/api/?c=table.tables&ac=index&id=' + id)
			.then(data => data.data)
			.then((data) => {
				if (data.errcode === 10000) {
					if (data.data && data.msg === 'success') {
						_this.setState({
							fileData: data.data,
							createFileState: false,
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
	render: function () {
		return (
			<CreateFilePage
				onState={this.onState}
				onConf={this.state.onFileOption}
				onCancel={this.handleHideCreateFilePage}
			/>
		)
	}
});