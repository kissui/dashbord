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
    handleFieldSort: function (i) {

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
        // newData = _.reverse(_.sortBy(newData, (item)=> {
        //     return parseFloat(item[3])
        // }));
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
                <DataPage onReceiveData={this.handleReceiveDateRange} isShowRange={false}/>
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
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            {
                                newTitle.map((item, i)=> {
                                    return item.selected ? <th key={i}>
                                        {item.title}
                                        <i className="fa fa-arrow-up"
                                           onClick={_this.handleFieldSort.bind(this, i)}
                                        >
                                        </i>
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