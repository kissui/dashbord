'use strict';

module.exports = function (option, _this) {
    this.option = option;
    let fields,
        datas,
        type,
        conf,
        dimension,
        KPI;
    if (!!option) {
        fields = option.fields;// 操作维度指标的集合,为了合成图表可用的JSON对象
        datas = option.datas;  // 对应维度指标的数据集合。
        type = option.type;    // 选择维度或者指标的标记符 value === 'dimension | kpi';
        conf = option.conf;
        dimension = option.dimension;
        KPI = option.KPI;
    }
    this.combineSum = function (combineKPI, combineDimension) {
        let selectK = [];
        combineKPI.map((item, i) => {
            if (item.k_selected === true) {
                selectK.push(item.title + '-' + item.val_conf);
            }
        });
        return selectK;
    };
    this._handleChartData = function () {
        let newDataAssign = [];
        datas.map((item, key) => {
            let objectAssign = {};
            datas[key].map((d, i) => {
                (function (i) {
                    objectAssign[fields[i].title + '-' + fields[i].val_conf] = (/^\d+(\.\d+)?$/.test(d) && i>0) ? parseFloat(d) : (d === '-' ? 0 : d);
                    objectAssign = Object.assign(objectAssign);
                })(i);
            });
            newDataAssign.push(objectAssign);
        });
        return newDataAssign;
    };
    this._handleChangeOption = function () {
        let dimensionConf, kpiConf;
        if (type && type === 'dimension') {
            dimensionConf = conf;
            _this.setState({
                dimensionConf: conf
            })
        } else if (type && type === 'kpi') {
            kpiConf = conf;
            _this.setState({
                kpiConf: conf,
            })
        } else {
            dimensionConf = dimension[0].title + '-' + dimension[0].val_conf;
            kpiConf = KPI[0].title + '-' + KPI[0].val_conf;
            _this.setState({
                dimensionConf: dimension[0].title + '-' + dimension[0].val_conf,
                kpiConf: KPI[0].title + '-' + KPI[0].val_conf
            })
        }
        return {
            dimensionConf: dimensionConf ? dimensionConf : _this.state.dimensionConf,
            kpiConf: kpiConf ? kpiConf : _this.state.kpiConf
        }
    };
    this.handleOptionRenderData = function (Fields, kpis, dimensions) {
        let dimension;
        let KPI;
        if (!(dimensions && dimensions.length > 0)) {

            dimension = Fields.dimension_fields;
            dimension.map((item, key)=> {
                Object.assign(item, {d_selected: (key == 0) ? true : false})
            });
        } else {
            dimension = dimensions;
        }
        if (!(kpis && kpis.length > 0)) {
            KPI = Fields.data_fields;
            KPI.map((item, key)=> {
                Object.assign(item, {k_selected: (key == 0) ? true : false})
            });
        } else {
            KPI = kpis;
        }
        return {
            kpis: KPI,
            dimensions: dimension
        }
    };
    this.handleChartRender = function (type) {
        this.type = type;
        let me = this;
        let KPIChartSelect = this.combineSum(KPI);
        let optionConf = me._handleChangeOption();
        let dimensionConf = optionConf.dimensionConf,
            kpiConf = optionConf.kpiConf;
        let Stat = G2.Stat;
        let Frame = G2.Frame;
        let chart = new G2.Chart({
            id: 'c1',
            forceFit: true,
            height: 400,
            plotCfg: {
                margin: [10, 120, 60, 80],
            }
        }); // create the chart object
        let frame = new Frame(this._handleChartData());

        if (type === 'line') {
            let combineFrame = Frame.combinColumns(frame, KPIChartSelect, 'Revenue', '指标项', dimensionConf);
            chart.source(combineFrame, {
                [dimensionConf]: {
                    alias: dimensionConf.split('-')[0]
                }
            });
            chart.legend( {
                position: 'right',
                dx: -10
            });
            chart.line().position(dimensionConf + '*Revenue').color('指标项');
        } else if (type === 'pie') {
            kpiConf = KPIChartSelect.join('');
            chart.source(me._handleChartData());
            // 重要：绘制饼图时，必须声明 theta 坐标系
            chart.coord('theta', {
                radius: 0.8 // 设置饼图的大小
            });
            chart.legend(dimensionConf, {
                position: 'bottom',
                itemWrap: true,
                dy: 30, // 垂直偏移
            });
            chart.intervalStack()
                .position(Stat.summary.percent(kpiConf))
                .color(dimensionConf)
                .label(dimensionConf + '*..percent', function (name, percent) {
                    percent = (percent * 100).toFixed(2) + '%';
                    return name + ' ' + percent;
                });
        } else if (type === 'area') {
            let combineFrame = Frame.combinColumns(frame, KPIChartSelect, 'Revenue', '指标项', dimensionConf);

            chart.source(combineFrame, {
                [dimensionConf]: {
                    alias: dimensionConf.split('-')[0]
                }
            });
            chart.legend('指标项', {
                position: 'right',
                dx: -10
            });

            chart.area().position(dimensionConf + '*Revenue').color('指标项');
        } else {
            let combineFrame = Frame.combinColumns(frame, KPIChartSelect, 'Revenue', '指标项', dimensionConf);
            let aliasText;
            chart.source(combineFrame, {

                [dimensionConf]: {
                    alias: dimensionConf.split('-')[0],
                },
            });
            chart.legend(false);
            chart.interval(['stack']).position(dimensionConf + '*Revenue').color('指标项');

        }
        chart.on('tooltipchange', function (ev) {
            var items = ev.items; // 获取tooltip要显示的内容
            items.map((item, i)=> {
                item.name = item.name.split('-')[0]
            })

        });
        chart.render();
    };

};
