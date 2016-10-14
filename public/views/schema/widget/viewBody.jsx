'use strict';

import React from 'react';
import dealData from '../../../components/chart/dealData';
import KpiDimensionItem from '../chart/dimensitonkpi';

module.exports = React.createClass({
    getInitialState: function () {
        return {
            'body': this.props.viewBody,
            'dimension_new': false,
            'kpi_new': false,
            'changeChartType': 'interval'
        }
    },
    componentDidMount: function () {
        if (this.props.viewBody.chart_conf) {
            console.log('21456', this.props.viewBody);
            this.viewChart();
        }


    },
    viewChart: function (conf) {
        conf = Object.assign({}, conf);
        document.getElementById('c1').innerHTML = null;
        let Fields = this.props.viewBody.fields;
        let fields = Fields.dimension_fields.concat(Fields.data_fields);
        let chartConf = {
            datas: this.props.viewBody.data,
            fields: fields,
            type: conf.type,
            conf: conf.optionConf,
            dimension: Fields.dimension_fields,
            KPI: Fields.data_fields,
            chartType: conf.chart ? conf.chart : this.state.changeChartType
        };
        let _this = this;
        let deal = new dealData(chartConf, _this);
        setTimeout(function () {
            deal.handleChartRender(chartConf.chartType);
        }, 10)
    },
    handleChangeChart: function (optionType, name, data, key) {
        let selectedData = [];
        data.map((item, i)=> {
            if (item.d_selected === true || item.k_selected === true) {
                selectedData.push(item.title);
            }
        });
        if (optionType === 'kpi') {
            if (this.state.changeChartType === 'pie') {
                data.map((item, i)=> {
                    if (key === i) {
                        item.k_selected = true
                    } else {
                        item.k_selected = false
                    }
                });
            } else {
                if (selectedData.length == 0) {
                    data.map((item, i)=> {
                        if (key === i) {
                            item.k_selected = true
                        }
                    });
                }
            }
        } else {
            data.map((item, i)=> {
                if (key === i) {
                    item.d_selected = true;
                } else {
                    item.d_selected = false;
                }
            });
        }
        this.setState({
            [optionType + '_new']: data
        });
        let conf = {
            type: optionType,
            optionConf: name
        };
        this.viewChart(conf)
    },
    handleChangChartType: function (type) {
        let conf = {
            chart: type
        };
        let data = this.state.kpi_new;
        if (data && type === 'pie') {
            console.log(data)
            data.map((item, i)=> {
                if (i === 0) {
                    item.k_selected = true
                } else {
                    item.k_selected = false
                }
            });
        }
        this.setState({
            changeChartType: type,
            kpi_new: data
        });
        this.viewChart(conf)
    },
    render: function () {
        let Fields = this.props.viewBody.fields;
        let fields = Fields.dimension_fields.concat(Fields.data_fields);

        let dimension;
        let KPI;
        if (this.state.dimension_new) {
            dimension = this.state.dimension_new;
        } else {
            dimension = Fields.dimension_fields;
            dimension.map((item, key)=> {
                Object.assign(item, {d_selected: (key == 0) ? true : false})
            });
        }
        if (this.state.kpi_new) {
            KPI = this.state.kpi_new;
        } else {
            KPI = Fields.data_fields;
            KPI.map((item, key)=> {
                Object.assign(item, {k_selected: (key == 0) ? true : false})
            });
        }
        return (
            <div className="view-body">
                <div className={!this.props.onChart && 'view-chart shim'}>
                    <h4 className="chart-title">
                        {this.props.viewBody.title}图表
                        <div className="chart-option">
                            <label>
                                <i className="fa fa-star">
                                </i>
                                <span>收藏</span>
                            </label>
                        </div>
                    </h4>
                    <div className="row">
                        <div className="col-md-9 chart-box">
                            <div id="c1"></div>
                        </div>
                        {!this.props.onChart && (
                            <div className="col-md-3">
                                <div className="chart-dimension shim">
                                    <h5>维度: </h5>
                                    <ul>
                                        <KpiDimensionItem
                                            type="dimension"
                                            defaultData={dimension}
                                            onChangeChart={this.handleChangeChart}
                                        />
                                    </ul>
                                </div>
                                <div className="chart-kpi shim">
                                    <h5>指标: </h5>
                                    <KpiDimensionItem
                                        type="kpi"
                                        defaultData={KPI}
                                        onChangeChart={this.handleChangeChart}
                                    />
                                </div>
                                <div className="chart-type shim">
                                    <h5>图表选择: </h5>
                                    <ul>
                                        <li className={this.state.changeChartType === "line" ? 'line active' : 'line'}
                                            onClick={this.handleChangChartType.bind(this, 'line')}>
                                        </li>
                                        <li className={this.state.changeChartType === "interval" ? 'interval active' : 'interval'}
                                            onClick={this.handleChangChartType.bind(this, 'interval')}>
                                        </li>
                                        <li className={this.state.changeChartType === "pie" ? 'pie active' : 'pie'}
                                            onClick={this.handleChangChartType.bind(this, 'pie')}>
                                        </li>
                                        <li className={this.state.changeChartType === "area" ? 'area active' : 'area'}
                                            onClick={this.handleChangChartType.bind(this, 'area')}>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}

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
                            {
                                fields.map((item, i)=> {
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