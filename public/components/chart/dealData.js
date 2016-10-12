'use strict';
const dimension = [
    {
        "seq_no": 0,
        "selected": true,
        "val_conf": "12.d1.f1",
        "name": "省份",
        "title": "省份",
        "type": 2
    },
    {
        "seq_no": 1,
        "selected": true,
        "val_conf": "12.d1.f2",
        "name": "年份",
        "title": "年份",
        "type": 2
    }
];
const KPI = [
    {
        "seq_no": 2,
        "selected": false,
        "val_conf": "12.d1.f3",
        "name": "GDP（亿元）",
        "title": "GDP（亿元）",
        "type": 1
    },
    {
        "seq_no": 3,
        "selected": true,
        "val_conf": "12.d1.f4",
        "name": "人均GDP（元）",
        "title": "人均GDP（元）",
        "type": 1
    },
    {
        "seq_no": 4,
        "selected": true,
        "val_conf": "12.d1.f5",
        "name": "GDP第一产业（亿元）",
        "title": "GDP第一产业（亿元）",
        "type": 1
    },
    {
        "seq_no": 5,
        "selected": true,
        "val_conf": "12.d1.f6",
        "name": "GDP第二产业（亿元）",
        "title": "GDP第二产业（亿元）",
        "type": 1
    }
];
module.exports = function (option, _this) {
    console.log('22',option)
    let fields = option.fields,
        datas = option.datas,
        type = option.type,
        name = option.name,
        conf = option.conf;
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
            dimensionName: KPI[0].val_conf,
            kpiConf: dimension[0].title,
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

    chart.source(frame, {
        [dimensionConf]: {
            alias: dimensionName
        },
        [kpiConf]: {
            alias: kpiName
        }
    });
    if(option.chartType ==='line') {
        chart.coord('rect').transpose();
        chart.line().position(kpiConf+ '*' + dimensionConf).color(kpiConf);
    } else if(option.chartType ==='pie') {
        // chart.coord('rect').transpose();
        chart.coord('polar', {
            transposed: true,
            inner: 0
        });
        chart.intervalStack().position(Stat.summary.count(dimensionConf + '*' + kpiConf)).color(kpiConf);

    } else if(option.chartType ==='map') {
        // chart.coord('rect').transpose();
        chart.axis(false);
        chart.polygon().position(Stat.map.region(dimensionConf, newDataAssign))
            .color('value', '#F4EC91-#AF303C')
            .style({
                stroke: '#333',
                lineWidth: 1
            });
    } else {
        chart.coord('rect').transpose();
        chart.interval().position(Stat.summary.count(dimensionConf + '*' + kpiConf)).color(kpiConf);
    }

    chart.render();
};
