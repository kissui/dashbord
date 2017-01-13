'use strict';

var React = require('react');
import CubeOpPage from './dealPage';
import LayoutCubePage from './layout/layout';

export default class SiderDemo extends React.Component {
    constructor(context,props){
        super(context,props);
        this.state = {
          collapsed: false,
        };

    }
    render() {
        return (
	        <LayoutCubePage>
	            <CubeOpPage/>
	        </LayoutCubePage>
        );
      }
}
