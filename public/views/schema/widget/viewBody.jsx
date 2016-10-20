'use strict';

import React from 'react';
import _ from 'lodash';
import dealData from '../../../components/chart/dealData';
import KpiDimensionItem from '../chart/dimensitonkpi';
import http from '../../../lib/http';
import Utils from '../../../lib/utils';
module.exports = React.createClass({
    getInitialState: function () {
        let viewBody = this.props.viewBody;
        let graphicState = _.has(viewBody.chart_conf, 'type') ? true : false;
        return {
            'body': viewBody,
            'dimension_new': false,
            'kpi_new': false,
            'changeChartType': 'interval',
            'initialGraphicState': graphicState
        }
    },
    componentDidMount: function () {
        if (this.state.initialGraphicState) {
            this.viewChart();
        }
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.onChart) {
            this.setState({
                'initialCreateGraphicState': true
            });
            let _this = this;
            setTimeout(function () {
                _this.viewChart();
            }, 10)
        }
    },
    viewChart: function (conf) {
        conf = Object.assign({}, conf);
        document.getElementById('c1').innerHTML = null;
        let Fields = this.props.viewBody.fields;
        let viewBody = this.props.viewBody;
        let initialChartConf = _.has(viewBody.chart_conf, 'type') ? viewBody.chart_conf : false;
        let fields = Fields.dimension_fields.concat(Fields.data_fields);
        let showGraphicTyp;
        if (!this.state.initialGraphicState || conf.isChangeGraphic) {
            showGraphicTyp = conf.chart ? conf.chart : this.state.changeChartType;
        } else {
            showGraphicTyp = initialChartConf.type;
        }
        let chartConf = {
            datas: this.props.viewBody.data,
            fields: fields,
            type: conf.type,
            conf: conf.optionConf,
            dimension: initialChartConf ? initialChartConf.dimensions : Fields.dimension_fields,
            KPI: initialChartConf ? initialChartConf.kpis : Fields.data_fields,
            chartType: showGraphicTyp
        };
        let _this = this;
        let deal = new dealData(chartConf, _this);
        this.setState({
            chartViewConf: {
                kpis: chartConf.KPI,
                type: chartConf.chartType,
                dimensions: chartConf.dimension
            }
        });
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
            [optionType + '_new']: data,
            initialGraphicState: false
        });
        let conf = {
            type: optionType,
            optionConf: name
        };
        this.viewChart(conf)
    },
    handleChangChartType: function (type) {
        let conf = {
            chart: type,
            isChangeGraphic: true
        };
        let data = this.state.kpi_new;
        if (data && type === 'pie') {
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
    handleOperationBlank: function () {
        this.setState({
            initialCreateGraphicState: !this.state.initialCreateGraphicState
        });
        this.viewChart()
    },
    handleSaveChartConf: function (optionType) {
        let path, data, body = this.props.viewBody;
        console.log(this.props.viewBody);
        path = '/api/?c=table.tables&ac=updateChart&id=' + body.id;
        if (optionType === 'delete') {
            data = {};
        } else {
            data = this.state.chartViewConf;
        }
        http.post(path, {chart_conf: data}).then(data => data.data).then((data)=> {
            if(data.errcode===10000) {
                let text = '';
                if(optionType === 'delete') {
                    text = '您已成功删除图表';
                    this.setState({
                        initialCreateGraphicState: !this.state.initialCreateGraphicState
                    });
                    document.getElementById('c1').innerHTML = null;
                } else {
                    text = '当前报表的图表保存成功';
                }
                Utils.delayPop(text,2000);
            }

        })
    },
    render: function () {
        let Fields = this.props.viewBody.fields;
        let chartConf = _.has(this.props.viewBody.chart_conf, 'type') ? this.props.viewBody.chart_conf : false;
        let fields = Fields.dimension_fields.concat(Fields.data_fields);

        let dimension;
        let KPI;
        if (chartConf && this.state.initialGraphicState) {
            dimension = chartConf.dimensions;
            KPI = chartConf.kpis;
        } else {
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
        }
        return (
            <div className="view-body">
                <div className={(this.state.initialCreateGraphicState || chartConf) && 'view-chart shim'}>
                    {(this.state.initialCreateGraphicState || chartConf) && <h4 className="chart-title">
                        {this.props.viewBody.title}图表
                        <div className="chart-option">
                            <label onClick={this.handleOperationBlank}>
                                <i className="fa fa-edit"></i>
                                <span>编辑</span>
                            </label>
                            <label onClick={this.handleSaveChartConf.bind(this, 'save')}>
                                <i className="fa fa-star">
                                </i>
                                <span>保存</span>
                            </label>
                            <label onClick={this.handleSaveChartConf.bind(this, 'delete')}>
                                <i className="fa fa-minus-circle">
                                </i>
                                <span>删除</span>
                            </label>
                        </div>
                    </h4>}
                    <div className="row">
                        <div
                            className={this.state.initialCreateGraphicState ? "col-md-9 chart-box" : "col-md-12 chart-box"}>
                            <div id="c1"></div >
                        </div >
                        {(this.state.initialCreateGraphicState) ? (
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
                        ) : null}

                    </div>
                </div>
                <ShowTableContent
                    onThead={fields}
                    onTbody={this.props.viewBody.data}
                />
            </div>
        )
    }
});
let ShowTableContent = React.createClass({

    render: function () {

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
                                this.props.onThead.map((item, i)=> {
                                    return item.selected ? <th key={i}>{item.title}</th> : null
                                })}
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.onTbody.map((item, i)=> {
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