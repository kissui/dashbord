'use strict';
import React from 'react';
import Maths from '../../../components/table/math';
import _ from  'lodash';
module.exports = React.createClass({
    propsType: {
        'onTableConf': React.PropTypes.Object, //table conf {sum,mean,fields}
        'onTbody': React.PropTypes.array // BE 返回的table 数据结构
    },
    render: function () {

        let tableConf = this.props.onTableConf;
        let newData = this.props.onTbody;
        let newTitle = _.concat(tableConf.fields.dimension_fields,tableConf.fields.data_fields);
        let dealData = Maths.mathDeal(newData, newTitle);
        newData = _.reverse(_.sortBy(newData, (item)=> {
            return parseFloat(item[3])
        }));

        if(tableConf.sum){
            newData = newData.concat([dealData.sum]);
        } else if(tableConf.mean) {
            newData = newData.concat([dealData.mean]);
        }


        return (
            <div>
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
                                        <i className="fa fa-arrow-up"></i>
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