'use strict';

import React from 'react';
import Router, {Link, History} from 'react-router';
module.exports = React.createClass({
	getInitialState: function () {
		const {onFolderConf,selectIndex,onSidebar} = this.props;
		return {
			'onSidebar': onSidebar,
			'tabIndex': selectIndex,
			'folderConf': onFolderConf
		}
	},
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			tabIndex: nextProps.selectIndex,
			onSidebar: nextProps.onSidebar,
			'folderConf': nextProps.onFolderConf
		})
	},
	render () {
		return (
			<div className={this.state.onSidebar ? "top_nav ml-0" : "top_nav"}>
				<div className={this.state.onSidebar ? "nav_menu row pl-0" : "nav_menu row"}>
					{this.state.onSidebar ? <div className="col-md-1">
						kepler
					</div> : null}

					<div className="col-md-4">
						<ul className="kepler-tabs">
							<li className={this.state.tabIndex === 0 && 'current'} value="0">
								<Link to='/index/chart'>
									仪表盘
								</Link></li>
							<li className={this.state.tabIndex === 1 && 'current'} value="1">
								<Link to='/index/report/schema'>
									工作表
								</Link>
							</li>
							<li className={this.state.tabIndex === 2 && 'current'} value="2">
								<Link to='/index/report/cube'>
									CUBE
								</Link>
							</li>
						</ul>
					</div>
					<div className={this.state.onSidebar ? "col-md-7 text-right user" : "col-md-8 text-right user"}>
						<i className="fa fa-envelope">
						</i>
						<img src="/img/user.png" alt=""/>
						<span>shane</span>
						<i className="fa fa-angle-down">
						</i>
					</div>
				</div>
			</div>
		)
	}
});