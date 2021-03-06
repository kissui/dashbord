'use strict';
import React from 'react';
import { Router, Route, Link } from 'react-router'
import http from '../../lib/http';
import {
    Table,
    Input,
    Icon,
    Button,
    Popconfirm,
    Spin
} from 'antd';
const {Column, ColumnGroup} = Table;
import _ from 'lodash';

export default class CubeOptionPage extends React.Component {
    constructor(context, props) {
        super(context, props);
        this.state = {
            cubeList: null,
            loading: false
        }
    }

    componentDidMount() {
        http.get('/api/?c=cube.cubes&ac=index').then(data => data.data).then(data => {
            this.setState({cubeList: data.data})

        })
    }
    onDelete(index, record) {
        // const deleteData = {
        // 	id: record.id
        // }
        this.setState({loading: true})
        const {cubeList} = this.state;
        const evens = _.remove(cubeList, (item) => {
            console.log(item, '@removeItem');
            return item.id == record.id;
        })
        console.log(evens, cubeList, '@events');
        // http.post('/api/?c=cube.cubes&ac=del',deleteData)
        // 	.then(data=>data.data)
        // 	.then(data=>{
        // 		console.log(data);
        this.setState({loading: false, cubeList: cubeList})
        // 	})

    }
    render() {
        const {cubeList, loading} = this.state;
        return (
            <div className="cube-op-body">
                <Button type='primary' icon='plus-circle-o'>
                    <Link to={`/index/report/cube/new`}>创建新的CUBE</Link>
                </Button>
                {cubeList
                    ? <Table bordered dataSource={cubeList} loading={loading}>
                            <Column title='Id' dataIndex='id' key='1' rowKey='1'/>
                            <Column title='名称' dataIndex='name' key='2' rowKey='2' render={(text,record) =>(
								< Link to = {`/index/report/cube/edit/${record.id}`} > {
                                text
                            } < /Link>)}/>
                            <Column title='创建时间' dataIndex='update_time' key='3' rowKey='3'/>
                            <Column title='描述' dataIndex='description' key='4' rowKey='4'/>
                            <Column title='操作' key='5' rowKey='5' dataIndex='op'
							render= {(text, record, index) => (
								<Popconfirm title="你确定删除当前CUBE?" onConfirm={this.onDelete.bind(this,index,record)}> <a href="#">Delete</a> </Popconfirm>)} />
                        </Table>
                    : <Spin/>}
            </div>
        )
    }
}
