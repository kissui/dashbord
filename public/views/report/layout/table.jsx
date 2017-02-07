'use strict';

import React from 'react';
import {Table} from 'antd';
const {Column} = Table;
export default class TableContent extends React.Component {
    constructor(context, props) {
        super(context, props);
        const {onData} = this.props;
        this.state = {
            columnsData: onData.columns,
            dataSource: onData.dataSource
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            columnsData: nextProps.onData.columns,
            dataSource: nextProps.onData.dataSource
        })
    }
    onChange(pagination, filters, sorter) {
        console.log('params', pagination, filters, sorter);
    }
    render() {
        const {columnsData, dataSource} = this.state;
        console.log(columnsData,dataSource,'@log-render');
        return (
            <div className="report-con">
                <div className="con-table">
                    {dataSource && <Table dataSource={dataSource} onChange={this.onChange.bind(this)}>
                        {columnsData && columnsData.map((item,key)=>{
                            return (
                                item.selected && <Column title={item.title} dataIndex={item.dataIndex} rowKey={key} key={item.key} sorter={item.sorter} />
                            )
                        })}
                    </Table>}
                </div>
            </div>
        )
    }
}
