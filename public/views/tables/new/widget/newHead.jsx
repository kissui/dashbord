'use strict';
import React from 'react';
module.exports = React.createClass({
	getInitialState: function () {
		return {
			headConf: null,
		}
	},
	componentDidMount: function () {
		this.setState({
			folderConf: JSON.parse(sessionStorage.getItem('SIDEBAR_LIST'))
		});
	},
	handleSetName: function () {
		this.props.onReceiveFileName(this.refs.fileName.value)
	},
	render: function () {
		const {onTypeConf} = this.props;
		const {folderConf} = this.state;
		let options, selects, value;
		if (onTypeConf.initFileConf && onTypeConf.name == 'update') {
			options = folderConf.map((item, i)=> {
				return (
					<option value={item.id} key={i}>
						{item.title}
					</option>
				)
			});
			selects = (
				<div className="col-md-3">
					<label className="control-label">根目录</label>
					<select ref="folder"
							disabled="disabled"
							defaultValue={onTypeConf.initFileConf.folder_id}
							className="form-control" onChange={this.handleChangeFolder}>
						{options}
					</select>
				</div>
			);
			value = onTypeConf.initFileConf.title;
		} else {
			selects = null;
			value = ''
		}
		return (
			<div className="row shim">
				{selects}
				<div className={onTypeConf.name == 'update' ? 'col-md-9' : 'col-md-12'}>
					<label className="control-label">工作表名称</label>
					<input type="text"
						   className="form-control"
						   placeholder="请输入你要创建的工作表名称"
						   ref="fileName"
						   defaultValue={value}
						   onChange={this.handleSetName}
					/>
				</div>

			</div>
		)
	}
});