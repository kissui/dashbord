'use strict';
import React from 'react';
import http from '../../lib/http';
import { Table, Icon } from 'antd';
const dataSource = [{
	key: '1',
	name: '胡彦斌',
	age: 32,
	address: '西湖区湖底公园1号'
}, {
	key: '2',
	name: '胡彦祖',
	age: 42,
	address: '西湖区湖底公园1号'
}];

const columns = [{
	title: '姓名',
	dataIndex: 'name',
	key: 'name',
}, {
	title: '年龄',
	dataIndex: 'age',
	key: 'age',
}, {
	title: '住址',
	dataIndex: 'address',
	key: 'address',
}];
export default class CubeOptionPage extends React.Component {
	constructor(context, props) {
		super(context, props);
		this.state = {
			cubeList: null
		}
	}

	componentDidMount() {
		http.get('/api/?c=cube.cubes&ac=index')
			.then(data=>data.data)
			.then(data=> {
				this.setState({
					cubeList: data.data
				})
			})
	}

	render() {
		console.log(this.state.cubeList);
		return (
			<div className="cube-op-body">
				<Table dataSource={dataSource} columns={columns}/>
				<table className="table table-bordered">
					<thead>
					<tr>
						<th>#</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Username</th>
					</tr>
					</thead>
					<tbody>
					<tr>
						<td rowspan="2">1</td>
						<td>Mark</td>
						<td>Otto</td>
						<td>@mdo</td>
					</tr>
					<tr>
						<td>Mark</td>
						<td>Otto</td>
						<td>@TwBootstrap</td>
					</tr>
					<tr>
						<td>2</td>
						<td>Jacob</td>
						<td>Thornton</td>
						<td>@fat</td>
					</tr>
					<tr>
						<td>3</td>
						<td colspan="2">Larry the Bird</td>
						<td>@twitter</td>
					</tr>
					</tbody>
				</table>
			</div>
		)
	}
}