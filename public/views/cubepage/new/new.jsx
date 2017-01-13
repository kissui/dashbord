'use strict';

var React = require('react');
import NewCubeContentPage from './ncp';
import LayoutCubePage from '../layout/layout';

export default class CreateCube extends React.Component {
    constructor(context,props){
        super(context,props);
        this.state = {
          collapsed: false,
        };

    }
    render() {
        return (
	        <LayoutCubePage>
	            <NewCubeContentPage/>
	        </LayoutCubePage>
        );
      }
}
