'use strict';

import React from 'react';

module.exports = React.createClass({
    getInitialState: function () {
        return {
            'body': this.props.viewBody
        }
    },
    render: function () {
        console.log('@body: ', this.props.viewBody)
        return (
            <div className="view-body">
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
                            {this.props.viewBody.fields.map((item,i)=> {
                                return (
                                    <th key={i}>{item.title}</th>
                                )
                            })}
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.viewBody.data.map((item, i)=> {
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