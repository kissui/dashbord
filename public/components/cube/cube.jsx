'use strict';

module.exports = function (cube) {
    this.cube = cube;
    this.selectedData = function (temp, conf, index, isChecked, checkedIndex) {
        let _this = this;
        let defaultCube = _this.cube;
        if (conf.linkWork == 'cube') {
            let dimension = defaultCube[conf.selectedIndex].dimensions[0];

            temp[index] = {
                cube_id: conf.value,
                dimension_id: dimension.id,
                cubeIndex: conf.selectedIndex,
                cubes: conf.value + '.' + dimension.id,
                dimensionIndex: 0,
                title: dimension.title,
                fields: _this.handleFields(conf.value + '.' + dimension.id, dimension, isChecked, checkedIndex)
            }
        } else {
            let cubeId = temp[index].cube_id;
            let cubeIndex = _.findIndex(defaultCube, (item)=> {
                return item.id === cubeId;
            });
            let dimension = defaultCube[cubeIndex].dimensions[conf.selectedIndex]
            temp[index] = {
                dimension_id: conf.value,
                cubes: temp[index].cube_id + '.' + conf.value,
                cubeIndex: cubeIndex,
                dimensionIndex: conf.selectedIndex,
                title: dimension.title,
                fields: _this.handleFields(temp[index].cube_id + '.' + conf.value, dimension,isChecked,checkedIndex)
            }
        }
        return temp
    };
    this.handleFields = function (cubes, dimension, isChecked, index) {
        let fields = _.assign({}, {
            data_fields: dimension.data_fields,
            dimension_fields: dimension.dimension_fields,
        });
        let concatFields = fields.data_fields.concat(fields.dimension_fields);
        concatFields.map((item, i)=> {
            item.val_conf = cubes + '.' + item.field_id;
            item.selected = true;
        });
        if (index) concatFields[index].selected = isChecked;
        return fields;
    }
};