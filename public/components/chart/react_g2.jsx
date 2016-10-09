'use strict';
/**
 * @todo 处于React的服务端渲染,故我做了一个异步处理的封装
 * @type {G2}
 */

module.exports = new G2.Chart; // create the chart object

<!-- G2 code start -->
$.getJSON('/data.json?filename=populationsByage', function (data) {
    var Stat = G2.Stat;
    var Frame = G2.Frame;
    var frame = new Frame(data);
    frame = Frame.combinColumns(frame, ["小于5岁", "5至13岁", "14至17岁", "18至24岁", "25至44岁", "45至64岁", "65岁及以上"], '人口数量', '年龄段', 'State');
    var chart = new G2.Chart({
        id: 'c1',
        width: 1000,
        height: 500,
        plotCfg: {
            margin: [30, 80, 90, 40],
            background: {
                stroke: '#ccc', // 边颜色
                lineWidth: 1, // 边框粗细
            } // 绘图区域背景设置
        }
    });
    chart.source(frame);
    chart.legend({
        position: 'bottom'
    });
    chart.axis('State', {
        title: null
    });
    chart.axis('人口数量', {
        titleOffset: 75,
        formatter: function (val) {
            return val / 1000000 + 'M';
        },
        position: 'right'
    });
    chart.intervalStack().position('State*人口数量').color('年龄段', ['#98ABC5', '#8A89A6', '#7B6888', '#6B486B', '#A05D56', '#D0743C', '#FF8C00']).size(9);
    chart.render();
});

