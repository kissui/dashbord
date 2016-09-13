'use strict';

var React = require('react');
import SideMenu from './containers/slide/box';
import NavigationTab from './containers/tab/tab';
module.exports = React.createClass({
    displayName: 'Layout',

    render: function render() {
        return (
            <html>
            <head>
                <meta charSet='utf-8'/>
                <title>kepler 数据平台</title>
                <link rel="stylesheet" href="/bower/bootstrap/dist/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="/bower/font-awesome/css/font-awesome.min.css"/>
                <link rel='stylesheet' href='/styles.css'/>
            </head>
            <body>
            <div className="container body">
                <SideMenu/>
                <NavigationTab/>
                <div className="kepler-container">
                    {/* Router now automatically populates this.props.children of your components based on the active route. https://github.com/rackt/react-router/blob/latest/CHANGES.md#routehandler */}
                    {this.props.children}
                </div>
            </div>

            <script src="/bower/jquery/dist/jquery.min.js"></script>
            <script src="/bower/bootstrap/dist/js/bootstrap.min.js"></script>
            <script src='/bundle.js'></script>
            </body>
            </html>
        );
    }
});
