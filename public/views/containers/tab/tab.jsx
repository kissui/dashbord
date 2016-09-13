'use strict';

import React from 'react';

module.exports = React.createClass({
    render () {
        return (
            <div className="top_nav">
                <div className="nav_menu row">
                    <div className="col-md-4">
                        <i className="fa fa-align-justify"></i>
                    </div>
                    <div className="col-md-8 text-right user">
                        <i className="fa fa-envelope"></i>
                        <img src="../img/user.png" alt=""/>
                        <span>shane</span>
                        <i className="fa fa-angle-down"></i>
                    </div>
                </div>
            </div>
        )
    }
});