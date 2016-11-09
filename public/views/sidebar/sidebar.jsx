'use strict';
import React from 'react';
import EditFinderModal from '../../components/finderModal';
import SidebarMenu from './sidebarmenu';

module.exports = React.createClass({
    getInitialState: function () {
        return {
            'defaultProps': this.props.defaultFile,
            'selectIndex': this.props.selectIndex,
            'dropDownWrapState': this.props.state,
            'isShow': this.props.onModal
        }
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            'isShow': false,
            'defaultProps': nextProps.defaultFile,
            'menuChangeState': 'true',
        })
    },
    handleFinderOpen: function (tabType, optionType, index, id, title) {
        let option = {
            'tabType': tabType,
            'optionType': optionType ? optionType : null,
            'index': index,
            'id': id,
            'title': title ? title : null
        };
        this.setState({
            'isShow': true,
            'modalType': option
        });

    },
    menuChange: function () {
        this.setState({
            menuChangeState: 'true',
            'isShow': false
        })
    },
    onChangeFile: function (index, tabName, optionType, finderId, fileId) {
        this.props.onChangeFile(index, tabName, optionType, finderId, fileId);
    },
    onGlobalClick: function (page, type, id, folder) {
        this.props.onGlobalClick(page, type, id, folder);
    },
    render: function () {
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
                        currentIndex={this.props.selectIndex}
                        onClick={this.handleFinderOpen}
                        menuChangeState={this.state.menuChangeState}
                        dropDownWrapState={this.state.dropDownWrapState}
                        onChangeFile={this.onChangeFile}
                        onGlobalClick={this.onGlobalClick}
                        selectIndex={this.props.selectIndex}
                        defaultFile={this.props.defaultFile}
                        onParams={this.props.onParams}
                    />
                </div>
            </div>
        )
    }
});
