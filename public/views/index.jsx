'use strict';

var React = require('react');
import SideMenu from './sidebar/box';
import NavigationTab from './tab/tab';
import SchemaPage from './schema/content';
module.exports = React.createClass({
    render: function render() {
        return (
            <div>
                <SideMenu selectIndex={0}/>
                <NavigationTab selectIndex={0}/>
                <div className="kepler-container">
                    <div className="container-fluid">
                       <SchemaPage/>
                    </div>
                </div>
            </div>
        );
    }
});
