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
	dealTitle(conf){
		let kpiList = conf.fields.data_fields,
			kpiListArr = [];
		kpiList.map((item, i)=> {
			console.log(item)
			if (item[i].selected) {
				kpiListArr.unshift(item[i].title)
			}
		});
	},
	handleChartData (datas, fields, channel) {
		let newDataAssign = [];
		datas.map((item, key) => {
			let objectAssign = {};
			datas[key].map((d, i) => {
				(function (i) {
					objectAssign[fields[i].title + (i >= channel ? '-' + fields[i].val_conf : '')] = (/^\d+(\.\d+)?$/.test(d) && i > 0) ? parseFloat(d) : (d === '-' ? 0 : d);
					objectAssign = Object.assign(objectAssign);
				})(i);
			});
			newDataAssign.push(objectAssign);
		});
		return newDataAssign;
	},
	handleChartDataChannel (datas, fields, channel) {
		let newDataAssign = [];
		return newDataAssign;
	},
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
		return chartData;
	},

	handleShowSingleKChart (id, data, indicators, dimensions, doubleYLine) {
		let chartDOM = document.getElementById(id);
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

		chart.legend(false);
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
			console.log(frame)
			chart.source(frame);
			if (indicators && indicators.length > 0) {
				chart.interval(['dodge', 'stack']).position('日期' + '*population').color('kpi', stackColor);// 使用图形语法绘制柱状图
			}
			// if (dimensions && dimensions.length > 1) {
			// 	let lineXPosition = dimensions.slice(0, 1);
			// 	let linePosition = dimensions.slice(1);
			// 	let reverseColors = colors.reverse();
			// 	linePosition.map((item, i)=> {
			// 		chart.line().position(lineXPosition + "*" + item).color(reverseColors[i]).size(2).shape('smooth');
			// 		chart.point().position(lineXPosition + "*" + item).color(reverseColors[i]); // 绘制点图
			// 	});
			//
			// }
		}

		chart.render();
	},

}