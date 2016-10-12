'use strict';

module.exports = function (option, _this) {

    let fields = option.fields,
        datas = option.datas,
        type = option.type,
        name = option.name,
        conf = option.conf,
        dimension = option.dimension,
        KPI = option.KPI;
    let newDataAssign = [];
    datas.map((item, key) => {
        let objectAssign = {};
        datas[key].map((d, i) => {
            (function (i) {
                objectAssign[fields[i].val_conf] = /\d./.test(d) ? parseFloat(d) : d;
                objectAssign = Object.assign(objectAssign);
            })(i);
        });
        newDataAssign.push(objectAssign);
    });
    let dimensionConf,
        kpiConf,
        dimensionName,
        kpiName;
    if (type && type === 'dimension') {
        dimensionConf = conf;
        dimensionName = name;
        _this.setState({
            dimensionConf: conf,
            dimensionName: name
        })
    } else if (type && type === 'kpi') {
        kpiConf = conf;
        kpiName = name;
        _this.setState({
            kpiConf: conf,
            kpiName: name
        })
    } else {
        dimensionConf = dimension[0].val_conf;
        kpiConf = KPI[0].val_conf;
        dimensionName = dimension[0].title;
        kpiName = KPI[0].title;
        _this.setState({
            dimensionConf: dimension[0].val_conf,
            dimensionName: dimension[0].title,
            kpiConf: KPI[0].val_conf,
            kpiName: KPI[0].title
        })
    }
    dimensionConf = dimensionConf ? dimensionConf : _this.state.dimensionConf;
    dimensionName = dimensionName ? dimensionName : _this.state.dimensionName;
    kpiConf = kpiConf ? kpiConf : _this.state.kpiConf;
    kpiName = kpiName ? kpiName : _this.state.kpiName;
    var Frame = G2.Frame;
    var Stat = G2.Stat;
    var chart = new G2.Chart({
        id: 'c1',
        forceFit: true,
        height: 400,
        plotCfg: {
            background: 'blue'
        }
    }); // create the chart object
    var frame = new Frame(newDataAssign);
    frame = Frame.sort(frame, kpiConf);

    chart.source(newDataAssign, {
        [dimensionConf]: {
            alias: dimensionName
        },
        [kpiConf]: {
            alias: kpiName
        }
    });
    if (option.chartType === 'line') {
        chart.coord('rect').transpose();
        chart.line().position(kpiConf + '*' + dimensionConf).color(kpiConf);
    } else if (option.chartType === 'pie') {
        chart.coord('polar', {
            transposed: true,
            inner: 0
        });
        chart.intervalStack().position(dimensionConf + '*' + kpiConf).color(kpiConf);

    } else if (option.chartType === 'map') {
        chart.axis(false);
        chart.polygon().position(dimensionConf, newDataAssign)
            .color('value', '#F4EC91-#AF303C')
            .style({
                stroke: '#333',
                lineWidth: 1
            });
    } else {
        chart.coord('rect').transpose();
        chart.interval().position(dimensionConf + '*' + kpiConf).color(kpiConf);
    }
    chart.render();
};
