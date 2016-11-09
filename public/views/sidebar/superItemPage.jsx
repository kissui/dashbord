'use strict';
import React from 'react';
/**
 * @TODO 二级菜单,显示、操作
 * @props => onMenu 二级菜单的结构
 * @props => onFolderId 默认router的参数
 * @props => onParams 当前路由的conf
 * @props => onReceiveDeleteFileId 删除操作的执行函数
 * @DEMO <SidebarMenuSuperItem
 * 			onMenu={item.tables}
 *			onFolderId={item.id}
 *			onParams={onParams}
 *			onReceiveDeleteFileId={this.handleDeleteFile}
 *		/>
 * @type {any}
 */
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
		this.props.onReceiveDeleteFileId(id)
	},
	render: function () {
		const {onMenu, onFolderId,onParams} = this.props;
		const {isShowOption} = this.state;
		let _this = this;
		return (
			<ul className="nav child_menu" id={onFolderId}>
				{
					onMenu.map(function (item, i) {
						return (
							<li className={onParams.fileId == item.id && 'current_page'} key={i}>
								<a onClick={_this.handleChangeSuperList.bind(_this, onFolderId, item.id)}>
									<i className={onParams.fileId == item.id ? 'fa fa-circle' : 'fa fa-circle-o'}>
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