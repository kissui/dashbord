'use strict';
import React from 'react';
import Maths from '../../../components/table/math';
import _ from  'lodash';

import {defaultRanges, Calendar, DateRange} from 'react-date-range';
import DataPage from '../datePage';
module.exports = React.createClass({
    propsType: {
        'onTableConf': React.PropTypes.Object, //table conf {sum,mean,fields}
        'onTbody': React.PropTypes.array // BE 返回的table 数据结构
    },
    getInitialState: function () {
        return {
            sort:{
                sortBy:null,
                sortType:'up'
            }
        }
    },
    handleFieldSort: function (i,type) {
        this.setState({
            'sort':{
                sortBy: i,
                sortType: type === 'up' ? 'down': 'up'
            }
        })
    },
    handleReceiveDateRange: function (start, end) {
        // console.log(start, end);
    },
    render: function () {
        let tableConf = this.props.onTableConf;
        let _this = this;
        let newData = this.props.onTbody;
        //初始化表格表头的内容部分高
        let newTitle = _.concat(tableConf.fields.dimension_fields, tableConf.fields.data_fields);
        // 单独指标项排序
        let dimensionLen = tableConf.fields.dimension_fields.length;
        const {sort} = this.state;
        if(sort && sort.sortBy) {
            if(sort.sortType === 'up'){
                newData = _.sortBy(newData, (item)=> {
                    return parseFloat(item[sort.sortBy])
                });
            } else {
                newData = _.reverse(_.sortBy(newData, (item)=> {
                    return parseFloat(item[sort.sortBy])
                }));
            }
        }
        // 返回和值,均值的处理
        let dealData = Maths.mathDeal(newData, newTitle);
        if (tableConf.sum) {
            newData = newData.concat([dealData.sum]);
        }
        if (tableConf['mean']) {
            newData = newData.concat([dealData.mean]);
        }
        return (
            <div>
                <div className="body-table-title">详细数据</div>
                {/*<DataPage onReceiveData={this.handleReceiveDateRange} isShowRange={false}/>*/}
                <div className="body-tab-nav">
                    <ul className="nav">
                        <li className="active">数据预览</li>
                        <li>关联情况</li>
                    </ul>
                </div>
                <div className="body-wrap">
                    <table className="table table-bordered">
                        <tbody>

                        </tbody>
                    </table>
                </div>
                <div className="body-wrap">
                    <table className="table table-bordered wrap-table">
                        <thead>
                        <tr>
                            {
                                newTitle.map((item, i)=> {
                                    return item.selected ? <th key={i}>
                                        {item.title}
                                        {i >= dimensionLen && <i className="fa fa-sort"
                                                                 onClick={_this.handleFieldSort.bind(this, i,sort.sortType)}
                                        >
                                        </i>}
                                    </th> : null
                                })}
                        </tr>
                        </thead>
                        <tbody>
                        {newData.map((item, i)=> {
                            return (
                                <tr key={i}>
                                    {item.map((td, i)=> {
                                        return (
                                            <td key={i}>{td}</td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
});