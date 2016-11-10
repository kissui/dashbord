'use strict';
import React from 'react';
module.exports = React.createClass({
	getInitialState: function () {
		return {
			headConf: null,
		}
	},
	handleSetName: function () {
		this.props.onReceiveFileName(this.refs.fileName.value)
	},
	render: function () {
		return (
			<div className="row shim">
				<div className="col-md-12">
					<label className="control-label">工作表名称</label>
					<input type="text"
						   className="form-control"
						   placeholder="请输入你要创建的工作表名称"
						   ref="fileName"
						   onChange={this.handleSetName}
					/>
				</div>
			</div>
		)
	}
});