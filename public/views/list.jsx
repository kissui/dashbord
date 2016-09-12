
'use strict';

var React = require('react');
import Count from '../components/count/count';

module.exports = React.createClass({
  displayName: 'Listasdfsad',

  render: function render() {
    return (
      <div>
          <Count Distance={5}/>
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
}