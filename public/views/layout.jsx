'use strict';

var React = require('react');

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
                {this.props.children}
            </div>

            <script src="/bower/jquery/dist/jquery.min.js"></script>
            <script src="/bower/bootstrap/dist/js/bootstrap.min.js"></script>
            <script src='/bundle.js'></script>
            </body>
            </html>
        );
    }
});
