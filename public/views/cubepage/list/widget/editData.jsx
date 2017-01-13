'use strict';
import React from 'react';
import {Input,Icon} from 'antd';

export default class DimensionList extends React.Component {
    constructor(context, props) {
        super(context, props);
        const {onList, onCodeState, onType} = this.props;
        this.state = {
            list: onList,
            title: '数据项名称',
            dataCount: onList.length,
        }
        this.handleChangeItem.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({type: nextProps.onType,list:nextProps.onList,[nextProps.onType]:nextProps.onList})
    }
    handleAddItem(type) {
        const {onId} = this.props;
        const{dataCount,list,title} = this.state;
        const newDataItem = {
            "name": title,
            "type": 1,
            "title": title,
            "field_id": "f"+dataCount+1,
            "val_conf": "sum(f"+(dataCount+1)+")"
        }
        this.setState({
            list: _.concat(list, [newDataItem]),
            dataCount: dataCount + 1
        })
        this.props.onReceiveData(onId, _.concat(list, [newDataItem]));

    }
    handleChangeItem(index){
        const {list} = this.state;
        const {onId} = this.props;
        let _this = this;
        return (e) => {
            console.log(e.target.value, index);
            let value = e.target.value
            list[index].name = value;
            list[index].title = value;
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
                    <li className="new-item" onClick={this.handleAddItem.bind(this)}><Icon type="plus"/>添加</li>
            </ul>
        )
    }
}
