'use strict';

export default {
    mathDeal (datas, fields, len) {
        let newDataAssign = [];
        let sum = [];
        let mean = [];
        datas.map((item, key) => {
            let objectAssign = {};
            datas[key].map((d, i) => {
                (function (i) {
                    objectAssign[fields[i].title + i] = /(^\d+)+.+(\d+$)/.test(d) ? parseFloat(d) : d;
                    objectAssign = _.assign(objectAssign);
                })(i);
            });
            newDataAssign.push(objectAssign);
        });
        let frame = new G2.Frame(newDataAssign).arr;
        frame.map((item, i)=> {
            if (i === 0) {
                sum.push('合计')
            } else {
                if (_.ceil(_.sum(item), 2) + '' == 'NaN') {
                    sum.push('--')
                } else {
                    sum.push(_.ceil(_.sum(item), 2) + '');
                }
            }
            if (i === 0) {
                mean.push('平均值')
            } else {
                if (_.ceil(_.mean(item), 2) + '' == 'NaN') {
                    mean.push('--')
                } else {
                    mean.push(_.ceil(_.mean(item), 2) + '');
                }
            }
        });
        return {sum: sum, mean: mean};
    }
}