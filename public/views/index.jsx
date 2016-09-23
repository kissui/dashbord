'use strict';

var React = require('react');
import SideMenu from './sidebar/box';
import NavigationTab from './tab/tab';
import SchemaPage from './schema/content';
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
    render: function render() {
        return (
            <div>
                <SideMenu selectIndex={0}
                          state={this.state.dropDownWrapState}
                          onChangeFile={this.onChangeFile}
                />
                <NavigationTab selectIndex={0}/>
                <div className="kepler-container">
                    <SchemaPage currentPage={this.state.fileData} fileId={this.state.fileId}/>
                </div>
            </div>
        );
    }
});
