'use strict';
import React from 'react';

module.exports = React.createClass({
	getInitialState: function () {
		return {
			headConf: null,
		}
	},
	componentDidMount: function () {
		let folderConf = JSON.parse(sessionStorage.getItem('SIDEBAR_LIST'));
		this.setState({
			folderConf: folderConf
		});
		console.log(folderConf)
		const {onTypeConf} = this.props;
		this.props.onReceiveFolderId(onTypeConf.initFileConf ? onTypeConf.initFileConf.folder_id : folderConf[0].id);
		this.props.onReceiveFileName(onTypeConf.initFileConf ? onTypeConf.initFileConf.title : '')
	},
	handleSetName: function () {
		this.props.onReceiveFileName(this.refs.fileName.value)
	},
	handleChangeFolder: function () {
		this.props.onReceiveFolderId(this.refs.folder.value);
	},
	render: function () {
		const {onTypeConf} = this.props;
		const {folderConf} = this.state;
		let folderId = null, options = null, fileName = '';
		if (onTypeConf.initFileConf) {
			folderId = onTypeConf.initFileConf.folder_id;
			fileName = onTypeConf.initFileConf.title;
		}
		if (folderConf) {
			options = folderConf.map((item, i)=> {
				return (
					<option value={item.id} key={i}>
						{item.title}
					</option>
				)
			});
		}
		return (
			<div className="row shim">
				<div className="col-md-3">
					<label className="control-label">根目录</label>
					<select ref="folder"
							disabled={folderId}
							value={folderId}
							className="form-control" onChange={this.handleChangeFolder}>
						{options}
					</select>
				</div>
				<div className="col-md-9">
					<label className="control-label">工作表名称</label>
					<input type="text"
						   className="form-control"
						   placeholder="请输入你要创建的工作表名称"
						   ref="fileName"
						   defaultValue={fileName}
						   onChange={this.handleSetName}
					/>
				</div>
			</div>
		)
	}
});