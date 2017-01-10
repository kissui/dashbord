'use strict';
import _ from 'lodash';
Number.prototype.flover = function (c, d, t) {
	var n = this,
		c = isNaN(c = Math.abs(c)) ? 2 : c,
		d = d == undefined ? "." : d,
		t = t == undefined ? "," : t,
		s = n < 0 ? "-" : "",
		i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
		jj = i.length,
		j = jj > 3 ? jj % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
export default {
	dealChartData (names, fields) {
		const chartData = [];
		let surveyName = names;
		fields.map((item, i)=> {
			const obj = {};
			item.map((superItem, k)=> {
				obj[surveyName[k]] = superItem
			});
			chartData.unshift(obj)
		});
		console.log(chartData);
		return chartData;
	},
	handleShowChart (id, data, indicators, dimensions, chartConf) {
		let chartDOM = document.getElementById(id);
		if (chartDOM && chartDOM.length > 0)
			chartDOM.innerHTML = null;
		var chart = new G2.Chart({
			id: id,
			forceFit: true,
			height: 200,
			plotCfg: {
				margin: [0, 0, 50, 0]
			}
		});
		var Frame = G2.Frame;
		var frame = new Frame(data);
		var Stat = G2.Stat;
		chart.axis('日期', {
			formatter: function (dimValue) {
				return dimValue;
			}
		});
		chart.legend(false);
		let colors = ['#45594e', '#8fbeac', '#5e9882', '#fbbe7b', '#fff6e5', '#e89ba5', '#f5de50', '#f6deda', '#fbbe7a'];
		let stackColor = colors.slice(0, indicators.length);
		if (_.isObject(chartConf) && chartConf.showType === 'line') {
			let lineIndicators = dimensions.slice(1);
			let lineDimensions = _.concat(dimensions.slice(0, 1), indicators);
			frame = Frame.combinColumns(frame, lineIndicators, 'population', 'kpi', lineDimensions, 'di');
			chart.source(frame);
			chart.interval().position(lineDimensions.join('*')).color(colors.slice(0, 1));// 使用图形语法绘制柱状图
			chart.line().position('日期*population').color('kpi', colors.slice(1)).size(2).shape('smooth');
			chart.point().position('日期*population').color('kpi', colors.slice(1)); // 绘制点图
			if (chartConf.percent) {
				chart.on('tooltipchange', function (ev) {
					var items = ev.items; // 获取tooltip要显示的内容
					items.map((sitem, i)=> {
						if (i > 0 && sitem.value != 0) {

							sitem.value = sitem.value + '%';
						}
					})
				});
			}
		} else {
			frame = Frame.combinColumns(frame, indicators, 'population', 'kpi', dimensions, 'di');
			chart.source(frame);
			chart.interval(['dodge', 'stack']).position('日期*population').color('kpi', stackColor);// 使用图形语法绘制柱状图
			if (dimensions.length > 0) {
				let d = dimensions.slice(1).join('*');
				let reverseColors = colors.reverse();
				dimensions.map((item, i)=> {
					if (i > 0 && i != 0) {
						chart.line().position('日期*' + item).color(reverseColors[i]).size(2).shape('smooth');
						chart.on('tooltipchange', function (ev) {
							var items = ev.items; // 获取tooltip要显示的内容
							items.map((sitem, i)=> {
								if (sitem.name == item) {
									sitem.value = sitem.value + '%';
								}
							})
						});
						chart.point().position('日期*' + item).color(reverseColors[i]); // 绘制点图
					}
				})

			}
		}

		chart.render();
	},
	handleShowAnalysisChart (id, data, indicators, dimensions, doubleYLine) {
		let chartDOM = document.getElementById(id);
		let chartRange = document.getElementById('range');
		if (chartRange && chartRange.innerHTML)
			chartRange.innerHTML = null;
		if (chartDOM && chartDOM.innerHTML)
			chartDOM.innerHTML = null;
		var chart = new G2.Chart({
			id: id,
			forceFit: true,
			height: 400,
			plotCfg: {
				margin: [35, 80, 50, 80]
			}
		});
		var Frame = G2.Frame;
		var frame = new Frame(data);
		chart.axis('日期', {
			formatter: function (dimValue) {
				return dimValue;
			},
			title: null
		});
		chart.axis('population', {
			formatter: function (dimValue) {
				return dimValue;
			},
			title: null
		});
		let colors = ['#45594e', '#8fbeac', '#5e9882', '#fbbe7b', '#fff6e5', '#e89ba5', '#f5de50', '#f6deda', '#fbbe7a'];

		chart.legend({
			position: 'top', // 图例的显示位置，有 'top','left','right','bottom'四种位置，默认是'right'
		});
		let dimensionsDodge = dimensions.slice(0, 1);
		let stackColor = colors.slice(0, indicators.length);
		if (doubleYLine === 'line') {
			let lineDimensions = dimensions.slice(0, 1);
			let lineKpis = dimensions.slice(1);
			let stockDimension = _.concat(lineDimensions, indicators);
			frame = Frame.combinColumns(frame, lineKpis, 'population', 'kpi', stockDimension, 'di');
			chart.source(frame, {
				'population': {min: 0},
				[indicators.join('')]: {min: 0}
			});
			chart.interval().position(dimensionsDodge + '*' + indicators.join('')).color(colors.slice(colors.length - 1));
			chart.line().position(dimensionsDodge + "*population").color('kpi', colors).size(2).shape('smooth');
			chart.point().position(dimensionsDodge + "*population").color('kpi', colors); // 绘制点图
		} else if (doubleYLine === 'single') {
			frame = Frame.combinColumns(frame, indicators, 'population', 'kpi', dimensions, 'di');
			chart.source(frame);
			chart.line().position(dimensionsDodge + "*" + indicators.join('')).color(colors.slice(colors.length - 1)).size(2).shape('smooth');
			chart.point().position(dimensionsDodge + "*" + indicators.join('')).color(colors.slice(colors.length - 1)); // 绘制点图
		} else {
			frame = Frame.combinColumns(frame, indicators, 'population', 'kpi', dimensions, 'di');
			chart.source(frame);
			if (indicators && indicators.length > 0) {
				chart.interval(['dodge', 'stack']).position(dimensionsDodge + '*population').color('kpi', stackColor);// 使用图形语法绘制柱状图
			}
			if (dimensions && dimensions.length > 1) {
				let lineXPosition = dimensions.slice(0, 1);
				let linePosition = dimensions.slice(1);
				let reverseColors = colors.reverse();
				linePosition.map((item, i)=> {
					chart.line().position(lineXPosition + "*" + item).color(reverseColors[i]).size(2).shape('smooth');
					chart.point().position(lineXPosition + "*" + item).color(reverseColors[i]); // 绘制点图
				});

			}
		}

		chart.render();
	},

}