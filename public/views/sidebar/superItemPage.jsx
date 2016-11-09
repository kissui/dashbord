'use strict';
import React from 'react';
module.exports = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function () {
		return {
			isShowOption: null
		}
	},
	handleChangeSuperList: function (folderId,fileId) {
		this.context.router.push({
			pathname: '/group/table/report/'+ folderId +'/' + fileId,
			state: {
				folderId: folderId,
				fileId: fileId
			}
		})
	},
	handleSettingFile: function (index) {
		this.setState({
			isShowOption: index
		})
	},
	handleHideDropDownWrap: function () {
		this.setState({
			isShowOption: null
		})
	},
	handleDeleteFile: function (id) {
		// this.props.onReceiveDeleteFileId(id)
	},
	render: function () {
		console.log(this.props.params,'45454')
		const {onMenu, folderId} = this.props;
		const {isShowOption} = this.state;
		let _this = this;
		return (
			<ul className="nav child_menu" id={folderId}>
				{
					onMenu.map(function (item, i) {
						return (
							<li className={true && 'current_page'} key={i}>
								<a onClick={_this.handleChangeSuperList.bind(_this, folderId, item.id)}>
									<i className={true ? 'fa fa-circle' : 'fa fa-circle-o'}>
									</i>
									{item.title}
								</a>
								<i className="fa fa-edit icon"
								   onClick={_this.handleSettingFile.bind(_this, i)}>
								</i>
								{isShowOption === i ? <ul className="dropdown-wrap"
														  onMouseLeave={_this.handleHideDropDownWrap}>
									<li className="dropdown-item"
										onClick={_this.handleDeleteFile.bind(_this, item.id)}>
										删除
									</li>
								</ul> : null}
							</li>
						)
					})
				}
			</ul>
		)
	}
});