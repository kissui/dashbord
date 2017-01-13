'use strict';
import React from 'react';
import {Input, Icon} from 'antd';

export default class DimensionList extends React.Component {
    constructor(context, props) {
        super(context, props);
        const {onList} = this.props;
        this.state = {
            list: onList,
            title: '维度名称',
            dimensionCount: onList.length
        };
        this.handleChangeItem.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({list: nextProps.onList})
    }
    handleAddItem() {
        const {onId} = this.props;
        const {dimensionCount, title, list} = this.state;
        const newDimensionItem = {
            "name": title,
            "type": 2,
            "title": title,
            "field_id": title
        }
        this.setState({
            list: _.concat(list, [newDimensionItem])
        })
        this.props.onReceiveData(onId, _.concat(list, [newDimensionItem]),'dimension');
    }
    handleChangeItem(index) {
        const {list} = this.state;
        const {onId} = this.props;
        let _this = this;
        return (e) => {
            console.log(e.target.value, index);
            let value = e.target.value
            list[index].name = value;
            list[index].title = value;
            list[index].field_id = value;
            this.setState({list: list});
            _this.props.onReceiveData(onId, list);
        }

    }
    render() {
        const {list} = this.state;
        return (
            <ul>
                {list && list.map((item, i) => {
                    return (
                        <li key={i}><Input defaultValue={item.title} onChange={this.handleChangeItem(i)}/></li>
                    )
                })}
                <li className="new-item" onClick={this.handleAddItem.bind(this)}>
                    <Icon type="plus"/>添加
                </li>
            </ul>
        )
    }
}
