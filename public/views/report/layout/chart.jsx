'use strict';
import React from 'react';

export default class ChartContent extends React.Component {
    constructor(context,props) {
        super(context,props);
    }
    render () {
        return (
            <div className="chart-content">
                <div id="chart-box" className="chart-box">
                    chart Content
                </div>
                <div className="chart-op">
                    chart option 
                </div>
            </div>
        )
    }
}
