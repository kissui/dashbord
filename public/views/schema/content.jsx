'use strict';
import React from 'react';
import Loading from '../../components/loading/loading';
module.exports = React.createClass({
    render: function () {
        return (
            <div className="content">
                <Loading/>
            </div>
        )
    }
});