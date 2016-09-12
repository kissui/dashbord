'use strict';

var React = require('react');

module.exports = React.createClass({
    displayName: 'Listasdfsad',

    render: function render() {
        return (
            <div>

            </div>
        );
    }
});
class pages extends React.Component {
    constructor (props) {
        super(props);
        this.state = {smelling: true};
        this.handleClick = () => {
            this.setState = {
                smelling: !this.state.smelling
            }
        }
    }
    componentWillMount () {

    }
    componentDidMount () {

    }
    componentWillUnmount () {

    }
    render() {

    }
}