'use strict';
import React from 'react';
import http from '../../../lib/http';
export default class CubePageSidebar extends React.Component {
	constructor(context, props) {
		super(context, props);
		this.state = {
			cubeList: null
		}
	}

	componentDidMount() {
		// http.get('/api/?c=cube.cubes&ac=index')
		// 	.then(data=>data.data)
		// 	.then(data=> {
		// 		this.setState({
		// 			cubeList: data.data
		// 		})
		// 	})
	}

	render() {
		const {cubeList} = this.state;
		return (
			<div className="kepler-sidebar">
				<div className="sidebar-box">
					<a href="/" className="kepler-logo">
						<img src="/img/logo.png" alt=""/>
					</a>
					<div className="kepler-user row">
						<div className="col-md-5 text-center">
							<img src="/img/user.png" alt=""/>
						</div>
						<div className="col-md-7 pt10">
							<span>Welcome,</span>
							<div className="name">shane</div>
						</div>
					</div>
					<div className="c-menu">
						<div className="menuItem">
							<span className="span">
								<i className="fa fa-th-list "></i>
								CUBE 列表
							</span>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
// {cubeList && cubeList.map((item, i)=> {
// 	return (
// 		<div className="menuItem" key={i}>
// 									<span className="span">
// 										<i className="fa fa-th-list "></i>
// 										{item.name}
// 									</span>
// 			{item.dimensions + "" != 1 && <ul className="subItem">
// 				{item.dimensions.map((subItem, subIndex)=> {
// 					return (
// 						<li className="active" key={subIndex}>
// 							<i className="fa fa-th"></i>
// 							{subItem.title}
// 						</li>
// 					)
// 				})}
// 			</ul>}
// 		</div>
// 	)
// })}
