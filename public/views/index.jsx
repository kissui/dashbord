'use strict';

var React = require('react');
import SideMenu from './sidebar/box';
import NavigationTab from './tab/tab';
module.exports = React.createClass({
    displayName: 'Listasdfsad',

    render: function render() {
        return (
            <div>
                <SideMenu selectIndex={0}/>
                <NavigationTab selectIndex={0}/>
                <div className="kepler-container">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4">.col-md-4</div>
                            <div className="col-md-4">.col-md-4</div>
                            <div className="col-md-4">.col-md-4</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
