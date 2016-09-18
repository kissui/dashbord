'use strict';

import React from 'react';
import SideMenu from '../sidebar/box';
import NavigationTab from '../tab/tab';
module.exports = React.createClass({
   render() {
       return (
           <div>
               <SideMenu/>
               <NavigationTab/>
               <div className="kepler-container">
                   <div className="container-fluid">
                       <div className="row">
                           chart
                       </div>
                   </div>
               </div>
           </div>
       )
   }
});