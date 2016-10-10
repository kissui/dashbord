'use strict';

module.exports = function (fields, datas, fn) {
    console.log(fields,datas,'@async')
    let newDataAssign = [];
    fields.map((item, key) => {
        let objectAssign = {};
        datas[key].map((d, i) => {
            (function (i) {
                objectAssign['conf_' + i] = /\d./.test(d) ? parseFloat(d) : d;
                objectAssign = Object.assign(objectAssign);
            })(i);
        });
        newDataAssign.push(objectAssign);
    });
    fn(newDataAssign);
};