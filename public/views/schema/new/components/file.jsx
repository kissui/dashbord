'use strict';
import React from 'react';
import Session from '../../../../components/session'
module.exports = React.createClass({
	getInitialState: function () {
		const {onFileDetail, onFolderList} = this.props;
		let fileName = '';
		if (onFileDetail && onFileDetail.fileId) {
			let index = _.findIndex(onFolderList, item=> {
				return item.id == onFileDetail.folderId;
			});
			let subIndex = _.findIndex(onFolderList[index].tables, item=> {
				return item.id == onFileDetail.fileId
			});
			fileName = onFolderList[index].tables[subIndex].title;
		}
		return {
			fileDetail: onFileDetail,
			folderList: onFolderList,
			folderId: onFileDetail.folderId ? onFileDetail.folderId : onFolderList[0].id,
			fileName: fileName
		}
	},
	componentDidMount: function () {
		const {folderId, fileName} = this.state;
		this.props.onReceiveHeadConf({
			folderId: folderId,
			fileName: fileName
		});
		// this.props.onFolderId(this.props.onHeadConf.folderId)
	},
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			folderId: nextProps.onFileDetail.folderId
		})
	},
	handleSetName: function () {
		const {folderId, fileName} = this.state;
		this.props.onReceiveHeadConf({
			folderId: folderId,
			fileName: this.refs.fileName.value
		});
		// this.props.onSetName(this.refs.fileName.value)
	},
	handleChangeFolder: function () {
		const {folderId, fileName} = this.state;
		this.props.onReceiveHeadConf({
			folderId: this.refs.folder.value,
			fileName: fileName
		});
	},

	render: function () {
		const {fileDetail, folderList, fileName} = this.state;
		let options, selects;

		if (fileDetail) {
			options = folderList.map((item, i)=> {
				return (
					<option value={item.id} key={i}>
						{item.title}
					</option>
				)
			});
			selects = (
				<div className="col-md-4">
					<label className="control-label">根目录</label>
					<select ref="folder"
							defaultValue={fileDetail.folderId}
							className="form-control" onChange={this.handleChangeFolder}>
						{options}
					</select>
				</div>
			)
		} else {
			selects = null;
		}

		return (
			<div className="row shim">
				{selects}
				<div className='col-md-8'>
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