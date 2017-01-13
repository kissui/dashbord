'use strict';
import React from 'react';
import http from '../../../lib/http';
import {
    Card,
    Row,
    Col,
    Input,
    Icon,
    Button
} from 'antd';
import ChangeInput from './widget/editTitle';
import DimensionList from './widget/showItem';
import EditDimensionPage from './widget/editDimension';
import EditDataPage from './widget/editData';
export default class CubeListBody extends React.Component {
    constructor(context, props) {
        super(context, props);
        const {onCurrentCubeData} = this.props;
        this.state = {
            currentCubeData: onCurrentCubeData,
            editCube: false,
            cubeCount: onCurrentCubeData.dimensions.length
        }
        this.handleReceive.bind(this);
    }
    handleAddDimension() {
        const {currentCubeData} = this.state;
        let index = currentCubeData.dimensions.length + 1
        const newData = {
            "id": "d" + index,
            "name": "CUBE name",
            "title": "CUBE描述",
            "data_fields": [
                {
                    "name": "数据项名称",
                    "type": 1,
                    "title": "数据项名称",
                    "field_id": "f1",
                    "val_conf": "sum(f1)"
                }
            ],
            "dimension_fields": [
                {
                    "name": "维度名称",
                    "type": 2,
                    "title": "维度名称",
                    "field_id": "维度名称"
                }
            ]
        }
        let dimensions = _.concat(currentCubeData.dimensions, [newData]);
        currentCubeData.dimensions = dimensions;
        console.log(currentCubeData);
        this.setState({currentCubeData: currentCubeData, newCubeCount: currentCubeData.dimensions.length, cubeCodeState: 'edit'})

    }
    handleReceiveData(id, data, type) {
        const {currentCubeData} = this.state;
        let index = _.findIndex(currentCubeData.dimensions, (res) => {
            return res.id == id;
        })
        if (type === 'dimension') {
            currentCubeData.dimensions[index].dimension_fields = data;
        } else {
            currentCubeData.dimensions[index].data_fields = data;
        }
        this.setState({currentCubeData: currentCubeData})
        console.log(index, id, data, currentCubeData);
    }
    saveCube() {
        let _this = this;
        const {currentCubeData} = this.state;
        http.post('/api/?c=cube.cubes&ac=update', currentCubeData).then(data => data.data).then(data => {
            _this.setState({editCube: false})
        })
    }
    handleReceive(name, index) {
        const {currentCubeData} = this.state;
        return (value) => {
            if (name === 'cubeName') {
                currentCubeData.name = value
            } else if (name === 'cubeDes') {
                currentCubeData.description = value
            } else {
                currentCubeData.dimensions[index].name = value
            }
            this.setState({currentCubeData: currentCubeData})
        }
    }
    handleReceiveEventType(type) {
        if (type === 'edit') {
            this.setState({editCube: true})
        } else if (type === 'cancel') {
            this.setState({editCube: false})
        } else {
            this.saveCube();
        }
    }
    render() {
        const {currentCubeData, editCube, cubeCount, cubeCodeState} = this.state;
        return (
            <div className="cube-edit-boay">
                <Card title={< ChangeInput onValue = {
                    currentCubeData.name
                }
                onOpState = {
                    editCube
                }
                onChange = {
                    this.handleReceive('cubeName')
                } />} extra={<EventPage onCubeState={editCube} onReceiveEventType={this.handleReceiveEventType.bind(this)} />}>
                    <Row>
                        <Col span={2}>id：</Col>
                        <Col span={10}>{currentCubeData.id}</Col>
                    </Row>
                    <Row>
                        <Col span={2}>描述：</Col>
                        <Col span={10}>{< ChangeInput onValue = {
                                currentCubeData.description
                            }
                            onOpState = {
                                editCube
                            }
                            onChange = {
                                this.handleReceive('cubeDes')
                            } />}</Col>
                    </Row>
                    <Row>
                        <Col span={2}>创建时间：</Col>
                        <Col span={10}>{currentCubeData.update_time}</Col>
                    </Row>
                    <div className="edit-dimension-body" style={{
                        background: '#ECECEC',
                        padding: '16px'
                    }}>
                        <Row>
                            {currentCubeData.dimensions + '' != 1
                                ? currentCubeData.dimensions.map((item, i) => {
                                    return (
                                        <Col span={8} key={i}>
                                            <Card title={<ChangeInput onValue={item.name}
                                            onOpState = {
                                                i + 1 > cubeCount
                                                    ? !editCube
                                                    : editCube
                                            }
                                            onChange = {
                                                this.handleReceive('dimension', i)
                                            } />} extra={i>=cubeCount && <Button type="primary" onClick={this.saveCube.bind(this)}>保存</Button>}>
                                                <div className="dimension-list">
                                                    <div className="dimension">
                                                        <h2>维度：</h2>
                                                        {cubeCodeState && i >= cubeCount
                                                            ? <EditDimensionPage onId={item.id} onReceiveData={this.handleReceiveData.bind(this)} onList={item.dimension_fields}/>
                                                            : <DimensionList onList={item.dimension_fields}/>}
                                                    </div>
                                                    <div className="data">
                                                        <h2>数据项：</h2>
                                                        {cubeCodeState && i >= cubeCount
                                                            ? <EditDataPage onId={item.id} onReceiveData={this.handleReceiveData.bind(this)} onList={item.data_fields}/>
                                                            : <DimensionList onList={item.data_fields}/>}
                                                    </div>
                                                </div>
                                            </Card>
                                        </Col>
                                    )
                                })
                                : <Col span='8'>
                                    <Card title='暂无维度' extra={< a href = '#' > 编辑 < /a>}>
                                        <div className="new-cube">
                                            <Icon type="plus" onClick={this.handleAddDimension.bind(this)}/>
                                        </div>
                                    </Card>
                                </Col>
}
                            <Col span='8'>
                                <Card title='暂无维度' extra={< a href = '#' > 编辑 < /a>}>
                                    <div className="new-cube">
                                        <Icon type="plus" onClick={this.handleAddDimension.bind(this)}/>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Card>
            </div>
        )
    }
}
class EventPage extends React.Component {
    constructor(context, props) {
        super(props, context);
        const {onCubeState} = this.props;
        this.state = {
            cubeState: onCubeState
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({cubeState: nextProps.onCubeState})
    }
    handleEventType(type) {
        this.props.onReceiveEventType(type)
    }
    render() {
        const {cubeState} = this.state;
        console.log(cubeState,'@cubeState');
        let content =( <Button type="primary" icon="edit" onClick={this.handleEventType.bind(this, 'edit')}>编辑</Button>);
        if (cubeState) {
            content = (
                <div>
                    <Button type="primary" onClick={this.handleEventType.bind(this, 'save')}>保存</Button>
                    <Button onClick={this.handleEventType.bind(this, 'cancel')}>取消</Button>
                </div>
            )
        }
        return (<div>{content}</div>)
    }
}
