'use strict';

var React = require('react');
import SideMenu from './sidebar/sidebar';
import NavigationTab from './tab/tab';
import SchemaPage from './schema/content';

module.exports = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return {
            'dropDownWrapState': null
        }
    },
    handleGlobalState: function (e) {
        this.setState({
            'dropDownWrapState': null
        })
    },
    componentDidMount: function () {
        let sessionStorages = JSON.parse(sessionStorage.getItem('SCHEMA_FILE_DETAIL'));
        if (sessionStorages) {
            this.context.router.push({
                pathname: '/index/schema/'+sessionStorages.id,
                query: {
                    'folder': sessionStorages.folder_id,
                    'file': sessionStorages.id
                }
            });
            this.setState({
                'fileId': sessionStorages.id,
                'sidebarState': {
                    fileID: sessionStorages.id,
                    folderID: sessionStorages.folder_id
                }
            });
        } else if (!sessionStorages && this.props.history.query){
            let query = this.props.history.query;
            this.setState({
                'fileId': query.file,
                'sidebarState': {
                    fileID: query.file,
                    folderID: query.folder
                }
            });
        }
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
        this.context.router.push({
            pathname: '/index/schema/'+fileId,
            query: {
                'folder': finderId,
                'file': fileId
            }
        });
    },
    onGlobalClick: function (page, type, id, conf) {
        this.setState({
            'onFileOption': {
                page: page,
                name: type,
                folderId: id,
                conf: conf
            },
            'createFileState': true,
            'fileId': null
        })
    },
    onState: function (id, folderId) {
        this.setState({
            'fileId': id,
            'folderId': folderId,
            'createFileState': false,
            'sidebarState': {
                fileID: id,
                folderID: folderId
            }
        });
    },
    render: function render() {
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
                        createFileState={this.state.createFileState}
                        onState={this.onState}
                        onAddFile={this.onGlobalClick}
                        onEditFile={this.onGlobalClick}
                    />
                </div>
            </div>
        );
    }
});
