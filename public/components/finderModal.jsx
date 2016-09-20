'use strict';
import React from 'react';
import Modal from 'react-modal';
import SchemaModal from './modal/schemaModal';
const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        zIndex: 10000
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        padding: '5px',
        transform: 'translate(-50%, -50%)',
        minWidth: '400px'
    }
};

module.exports = React.createClass({

    getInitialState: function () {
        return {modalIsOpen: this.props.isShow};
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            modalIsOpen: nextProps.isShow,
            modalType: nextProps.type
        })
    },
    openModal: function () {
        this.setState({modalIsOpen: true});
    },

    closeModal: function () {
        this.setState({modalIsOpen: false});
    },

    render: function () {
        let content;
        if (this.state.modalType === 'schema') {
            content = <SchemaModal onClick={this.closeModal}/>
        }
        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.defaultModal}
                style={customStyles}>
                {content}
            </Modal>

        );
    }
});