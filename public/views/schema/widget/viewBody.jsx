'use strict';

import React from 'react';
module.exports = React.createClass({
    getInitialState: function () {
        return {
            'body': this.props.viewBody
        }
    },
    componentDidMount: function () {
        console.log('21456',this.props.viewBody.chart_conf);
        if(this.props.viewBody.chart_conf) {
            this.viewChart();
        }
    },
    viewChart: function () {
        let datas = this.props.viewBody.data,
            fields = this.props.viewBody.fields;
        let newDataAssign = require('../../../components/chart/dealData')(fields,datas);
        var Frame = G2.Frame;
        var Stat = G2.Stat;
        var frame = new Frame(newDataAssign);
        // frame = Frame.sort(frame, 'conf_5');
        var chart = new G2.Chart({
            id: 'c1',
            forceFit: true,
            height: 400
        }); // create the chart object
        console.log(JSON.stringify(frame),frame);
        // chart.source(frame); // load the data source
        // chart.interval().position('conf_0*conf_2*conf_5').color('conf_5'); // create the detail chart
        // chart.render();
        chart.source(frame, {
            'conf_0': {
                alias: 'top2000 唱片总量'
            },
            'conf_5': {
                tickInterval: 5,
                alias: '唱片发行年份'
            }
        });
        chart.interval().position(Stat.summary.count('conf_0*conf_5')).color('#e50000');
        chart.render();
    },
    render: function () {
        return (
            <div className="view-body">
                <div className="view-chart">
                    <div className="row">
                        <div className="col-md-8">
                            <div id="c1"></div>
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                </div>
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
                            {this.props.viewBody.fields.map((item, i)=> {
                                return item.selected ? <th key={i}>{item.title}</th> : null
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
let ViewChart = React.createClass({
    getInitialState: function () {
        return {
            'data': this.props.viewBody
        }
    },
    render: function () {
        return (
            <div>
                dd
            </div>
        )
    }
});