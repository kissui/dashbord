'use strict';
import React from 'react';
/**
 * @TODO loading 静态css3
 * @type {any}
 */
module.exports=React.createClass({
    render: function () {
        return (
            <div className="loading">
                <div className="spinner">
                    <div className="rect1"></div>
                    <div className="rect2"></div>
                    <div className="rect3"></div>
                    <div className="rect4"></div>
                    <div className="rect5"></div>
                </div>
            </div>
        )
    }
});