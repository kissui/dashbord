'use strict';

import React from 'react';
import SideMenu from '../layout/sidebar/sidebar';
import NavigationTab from '../tab/tab';
module.exports = React.createClass({
    getInitialState: function () {
        return {
            'dropDownWrapState': null
        }
    },
    handleGlobalState: function (e) {

        console.log('globalState', e.stopPropagation(), e.preventDefault());
        this.setState({
            'dropDownWrapState': null
        })
    },
    /**
     * @TODO change file content
     * @param index
     * @param tabName
     * @param optionType
     * @param finderId
     * @param fileId
     */
    onChangeFile: function (index, tabName, optionType, finderId, fileId) {

        let fileData = {
            'index': index,
            'tabName': tabName,
            'optionType': optionType,
            'finderId': finderId,
            'fileId': fileId
        };
        this.setState({
            "fileData": fileData,
            'fileId': fileId
        });

    },
   render: function () {
       console.log(this.props.location,'@location');
       return (
           <div>
               <SideMenu selectIndex={0}
                         state={this.state.dropDownWrapState}
                         onChangeFile={this.onChangeFile}
               />
               <NavigationTab selectIndex={0}/>
               <div className="kepler-container">

               </div>
           </div>
       )
   }
});