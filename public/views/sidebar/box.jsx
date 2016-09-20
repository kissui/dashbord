'use strict';
import React from 'react';
import EditFinderModal from '../../components/finderModal';
import SidebarMenu from './sidebarmenu';

module.exports = React.createClass({
    getInitialState: function () {
        return {
            'defaultProps': null,
            'selectIndex': this.props.selectIndex,
            'isShow': false
        }
    },
    handleFinderOpen: function (type) {
        this.setState({
            'isShow'    : true,
            'modalType' : type
        });
        console.log('@modalType',type)
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
                    />
                    <SidebarMenu
                        currentIndex={this.props.selectIndex}
                        onClick={this.handleFinderOpen}
                    />
                </div>
            </div>)
    }
});
