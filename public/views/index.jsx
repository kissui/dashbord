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
            'fileId': fileId,
            'sidebarState': {
                fileID: fileId,
                folderID: finderId
            },
            'createFileState': false
        });
        console.log(this.state,'newpage');
    },
    onGlobalClick: function (page, type) {
        this.setState({
            onFileOption: {
                page: page,
                name: type
            },
            createFileState: true,
            'fileId': null
        })
    },
    onState: function (id,folderId) {
        this.setState({
            'fileId': id,
            'folderId': folderId,
            'createFileState': false,
            'sidebarState':{
                fileID: id,
                folderID: folderId
            }
        });
    },
    render: function render() {
        console.log(this.props.location, '@location');
        return (
            <div>
                <SideMenu
                    selectIndex={1}
                    defaultFile={this.state.sidebarState}
                    state={this.state.dropDownWrapState}
                    onChangeFile={this.onChangeFile}
                    onGlobalClick={this.onGlobalClick}
                    onModal={false}
                />
                <NavigationTab selectIndex={1}/>
                <div className="kepler-container">
                    <SchemaPage
                        currentPage={this.state.fileData}
                        fileId={this.state.fileId}
                        onFileOption={this.state.onFileOption}
                        createFileState = {this.state.createFileState}
                        onState={this.onState}
                    />
                </div>
            </div>
        );
    }
});
