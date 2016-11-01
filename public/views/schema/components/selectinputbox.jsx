'use strict';
import React from 'react';

/**
 * @TUDO 自定义select,input兼容版的form表单
 * @DEMO <SelectInputBox
 *           onValue={this.handleSelectValue}
 *           defaultValues={data}
 *           isWarning={true}
 *           onSelect="week"
 *       />
 * @props onValue => 默认接收value
 * @props defaultValues => select的option data 【{title: 'title',value: 'value'}...}
 * @props onSelect => 默认选择的value
 * @props isWarning => 当值为空的时候是否提醒
 *
 * @date 20161101
 * @type {any}
 */

module.exports = React.createClass({
    getInitialState: function () {
        const {onSelect, defaultValues} = this.props;
        return {
            isShowBox: false,
            selectItem: onSelect ? onSelect : defaultValues[0].value,
            warning: true
        }
    },
    componentDidMount: function () {
        this.props.onValue(this.state.selectItem);
    },
    handleSelect: function (value) {
        const {isShowBox} = this.state;
        this.setState({
            isShowBox: !isShowBox,
            selectItem: value
        });
        this.refs.selectValue.value = value;
        this.props.onValue(value)
    },
    handleInsertValue: function () {
        let isWarning = this.props.isWarning;
        let value = this.refs.selectValue.value;
        if(isWarning) {
            this.setState({
                'warning': value
            })
        }
        this.props.onValue(value);
    },
    handleToggleSelect: function(){
        const {isShowBox} = this.state;
        this.setState({
            isShowBox: !isShowBox,
        });
    },
    render: function () {
        const {defaultValues} = this.props;
        const {selectItem, isShowBox,warning} = this.state;
        return (
            <div className={warning ? 'selectInputBox' : 'selectInputBox warning'}>
                <input type="text"
                       ref='selectValue'
                       defaultValue={selectItem}
                       onChange={this.handleInsertValue}
                />
                <i className="fa fa-sort" onClick={this.handleToggleSelect}></i>
                <ul className={isShowBox ? "optionList" : 'hide'}>
                    {defaultValues.map((item, i)=> {
                        return (
                            <li key={i}
                                className={selectItem === item.value && 'active'}
                                onClick={this.handleSelect.bind(this, item.value)}>
                                {selectItem === item.value && <i className="fa fa-check"></i>}
                                {item.title}
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
});