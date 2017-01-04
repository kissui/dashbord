'use strict';
import React from 'react';
import Header from '../header';
import http from '../../../lib/http';
/**
 * @TODO 工作表的创建文件夹的box
 *
 * @type {any}
 */
module.exports = React.createClass({
	getInitialState: function () {
		return {
			initialInputState: null
		}
	},
	closeModal: function () {
		this.props.onClick();
	},
	handleAddSchemaFinder: function () {
		let value = this.refs.finderName.value;
		const {currentFinderDetail} = this.props;
		let httpUrl;
		if (currentFinderDetail) {
			httpUrl = '/api/?c=table.folder&ac=update&id=' + currentFinderDetail.folderId;
		} else {
			httpUrl = '/api/?c=table.folder&ac=add';
		}
		if (this.state.initialInputState) {
			http.post(httpUrl, {'title': value})
				.then(data => data.data)
				.then(data => {
					if (data.errcode === 10000) {
						this.props.menuChange();
					} else {
						this.setState({
							errMsg: data.msg
						})
					}
				})
		}

	},
	handleInputChange: function () {
		this.setState({
			changeState: true,
			initialInputState: this.refs.finderName.value
		})

	},
	render: function () {
		console.log('shissss')
		const {initialInputState, changeState, errMsg} =this.state;
		return (
			<div className="finder-modal">
				<Header title="创建文件夹" onClick={this.closeModal}/>
				<div className="modal-body">
					<form className="form-inline">
						<label>文件夹名称:</label>
						<input type="text"
							   onChange={this.handleInputChange}
							   className="form-control"
							   ref="finderName"
							   placeholder="文件名称"/>
					</form>
					{!initialInputState && changeState ?
						<div className="msg-warning">文件夹名称不能为空</div> : null}
					{errMsg ? <div className="msg-warning">{errMsg}</div> : null}
				</div>
				<div className="modal-footer">
					<button className="btn btn-primary"
							onClick={this.handleAddSchemaFinder}
							disabled={!initialInputState && 'disabled'}
					>确定
					</button>
					<button className="btn" onClick={this.closeModal}>取消</button>
				</div>
			</div>
		)
	}
});