'use strict';
import React from 'react';
import Modal from 'react-modal';
import SchemaModal from './modal/schema/schemaModal';
import SchemaAddFile from './modal/schema/schemaAddFile';
import SchemaDeleteFile from './modal/schema/schemaDeleteFile';
import SchemaDeleteModal from './modal/schema/schemaDeleteModal';
const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(107, 105, 105, 0.75)',
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

/**
 * @TODO  modal的容器
 * @des 此类接受两个属性
 * isShow => 初始化modal 是否是open的
 * type   => modal展示的类型处理,eg: 工作表:tables,仪表盘:chart
 * @type {any}
 */

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
    menuChange: function () {
        this.props.menuChange();
		this.setState({modalIsOpen: false});
    },
    openModal: function () {
        this.setState({modalIsOpen: true});
    },

    closeModal: function () {
        this.setState({modalIsOpen: false});
    },

    render: function () {
        console.log(this.state.modalType);
        let content,
            modalTypeData = this.state.modalType;
        if (modalTypeData && modalTypeData.tabType === 'tables') {
            if (modalTypeData.optionType === 'DELETEFOLDER') {
                content = <SchemaDeleteModal
                    onClick={this.closeModal}
                    menuChange={this.menuChange}
                    currentFinderDetail={this.state.modalType}
                />
            } else if (modalTypeData.optionType === 'RENAMEFOLDER') {
                content = <SchemaModal
                    onClick={this.closeModal}
                    menuChange={this.menuChange}
                    currentFinderDetail={this.state.modalType}
                />
            } else if (modalTypeData.optionType === 'addFolder') {
				content = <SchemaModal
					onClick={this.closeModal}
					menuChange={this.menuChange}/>
            } else if (modalTypeData.optionType === 'deleteFile') {
                content = <SchemaDeleteFile
                    onClick={this.closeModal}
                    menuChange = {this.menuChange}
                    currentFileDetail = {this.state.modalType}
                />
            }


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