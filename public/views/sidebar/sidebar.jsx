'use strict';
import React from 'react';
import EditFinderModal from '../../components/finderModal';
import SidebarMenu from './sidebarmenu';

module.exports = React.createClass({
    getInitialState: function () {
        return {
            'isShow': this.props.onModal
        }
    },
    handleDeleteFile: function (fileId) {
        console.log(fileId)
    },
    handleFolderSetting: function (id,option) {
        console.log(id,option);
    },
    handleHeadAddFolder: function () {

    },
    handleHeadAddFile: function () {

    },
    render: function () {
        const {onParams} = this.props;
        return (
            <div className="kepler-sidebar">
                <div className="sidebar-box">
                    <a href="/" className="kepler-logo">
                        <img src="/img/logo.png" alt=""/>
                    </a>
                    <div className="kepler-user row">
                        <div className="col-md-5 text-center">
                            <img src="/img/user.png" alt=""/>
                        </div>
                        <div className="col-md-7 pt10">
                            <span>Welcome,</span>
                            <div className="name">shane</div>
                        </div>
                    </div>
                    <EditFinderModal
                        isShow={this.state.isShow}
                        type={this.state.modalType}
                        menuChange={this.menuChange}
                    />

                    <SidebarMenu
                        onParams={onParams}

                        onReceiveDeleteFile={this.handleDeleteFile}

                        onReceiveFolderSetting={this.handleFolderSetting}

                        onReceiveHeadAddFolder={this.handleHeadAddFolder}

                        onReceiveHeadAddFile={this.handleHeadAddFile}
                    />
                </div>
            </div>
        )
    }
});
