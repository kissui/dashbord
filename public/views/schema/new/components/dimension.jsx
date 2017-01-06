'use strict';
import React from 'react';
import _ from 'lodash';
import Checked from '../../../../components/form/checkbox';
module.exports = React.createClass({
    handleCheckBox: function (value, i) {
        this.props.onSingleChecked(value, i, this.props.onIndex)
    },
    render: function () {
        let dataField;
        let dimensionField;
        let dimension = this.props.onData;
        let defaultFileDetail = JSON.parse(sessionStorage.getItem('SCHEMA_FILE_DETAIL'));
        let defaultDimensionData = defaultFileDetail.cube_conf[this.props.onIndex] ?
            defaultFileDetail.cube_conf[this.props.onIndex].fields.data_fields : null;
        if (_.isObject(dimension)) {
            dataField = dimension.data_fields.map((item, i)=> {
                return (
                    <td key={i}>
                        <label>
                            <Checked onSingleChecked={this.handleCheckBox}
                                     index={i}
                                     onIsCheck={this.props.onOperatePage === 'edit' ?
                                         (this.props.onChange ? true : (defaultDimensionData ? defaultDimensionData[i].selected : true)) : true}/>
                            <span>{item.title}</span>
                        </label>
                    </td>
                )
            });
            dimensionField = dimension.dimension_fields.map((item, i)=> {
                return (
                    <td key={i}>
                        {item.title}
                    </td>
                )
            })
        } else {
            dimensionField = <td>{this.props.defaultText}</td>;
            dataField = <td>{this.props.defaultText}</td>;
        }
        return (
            <div className="row view-cube">
                <form ref="form">
                    <div className="col-md-9">
                        <div className="table-responsive">
                            <table className="table">
                                <tbody>
                                <tr>
                                    {dataField}
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </form>
                <div className="col-md-3">
                    <div className="table-responsive">
                        <table className="table">
                            <tbody>
                            <tr>
                                {dimensionField}
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
});