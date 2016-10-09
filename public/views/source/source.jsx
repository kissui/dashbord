'use strict';
import React from 'react';
import NavigationTab from '../tab/tab';
import Loading from '../../components/loading/loading';
// let doc = document.getElementsByClassName('baby');
module.exports = React.createClass({
    getInitialState: function () {
        return {
            'onSidebar': true,
            'loading': true
        }
    },

    render: function () {

        return (
            <div>
                <NavigationTab selectIndex={2} onSidebar={this.state.onSidebar}/>
                <div className="kepler-container" ref="container" style={{marginLeft:0}}>
                    ssss
                </div>
            </div>
        )
    }
});