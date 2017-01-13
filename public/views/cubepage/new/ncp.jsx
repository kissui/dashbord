'use strict';
import React from 'react';
import http from '../../../lib/http';
import {
    Input,
    Card,
    Row,
    Col,
    Icon,
    Button
} from 'antd';
import EditDimensionPage from '../list/widget/editDimension';
import EditDataPage from '../list/widget/editData';

export default class NewCubeContentPage extends React.Component {
    constructor(context, props) {
        super(context, props);
        this.state = {
            defaultCube: {
                "name": "输入CUBE名称",
                "title": "输入CUBE名称",
                "description": "输入CUBE描述",
                "source_data_schema_id": 1,
                "dimensions": []
            },
            dimensionCount: 1
        };
        this.handleChangeTitle.bind(this);
    }
    handleCreateNewCubeDimension() {
        const {defaultCube, dimensionCount} = this.state;
        const newData = {
            "id": "d" + dimensionCount,
            "name": "CUBE name",
            "title": "CUBE描述",
            "data_fields": [
                {
                    "name": "数据项名称",
                    "type": 1,
                    "title": "数据项名称",
                    "field_id": "f1",
                    "val_conf": "sußßßm(f1)"
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
        };
        defaultCube.dimensions = _.concat(defaultCube.dimensions, [newData]);
        this.setState({
            defaultCube: defaultCube,
            dimensionCount: dimensionCount + 1
        })
    }
    handleChangeTitle(name, index) {
        const {defaultCube} = this.state;
        let _this = this;
        return (e) => {
            let value = e.target.value;
            if (name === 'cubeName') {
                defaultCube.name = value;
            } else if (name === 'cubeDes') {
                defaultCube.description = value;
            } else if (name = "dimensionName") {
                defaultCube.dimensions[index].title = value;
                defaultCube.dimensions[index].name = value;
            }
            _this.setState({defaultCube: defaultCube})
        }
    }
    saveCube() {
        const {defaultCube} = this.state;
        http.post('/api/?c=cube.cubes&ac=add', defaultCube).then(data => data.data).then(data => {
            console.log(data, '@addSuccess');
        })

    }
    handleDeleteDimension(index){
        const{defaultCube} = this.state;
        _.remove(defaultCube.dimensions,(res,i)=>{
            return index == i;
        })
        this.setState({
            defaultCube: defaultCube
        })
    }
    handleReceiveData(id, data, type) {
        const {defaultCube} = this.state;
        let index = _.findIndex(defaultCube.dimensions, (res) => {
            return res.id == id;
        });
        if (type === 'dimension') {
            defaultCube.dimensions[index].dimension_fields = data;
        } else {
            defaultCube.dimensions[index].data_fields = data;
        }
        this.setState({defaultCube: defaultCube});
        console.log(index, id, data, defaultCube);
    }
    render() {
        const {defaultCube} = this.state;
        return (
            <div className="cube-edit-boay">
                <Card title={< div > CUBE名称： < Input defaultValue = {
                    defaultCube.title
                }
                onChange = {
                    this.handleChangeTitle('cubeName')
                } />< /div>} extra={< Button type = "primary" onClick = {
                    this.saveCube.bind(this)
                } > 保存 < /Button>}>
                    <Row>
                        <Col span={2}>描述：</Col>
                        <Col span={10}>{< Input defaultValue = {
                                defaultCube.description
                            }
                            type = "textarea" />}</Col>
                    </Row>
                    <div className="edit-dimension-body" style={{
                        background: '#ECECEC',
                        padding: '16px'
                    }}>
                        <Row>
                            {defaultCube.dimensions + '' != 1 && defaultCube.dimensions.length > 0 && defaultCube.dimensions.map((item, i) => {
                                return (
                                    <Col span={8} key={i}>
                                        <Card title={< Input defaultValue = {
                                            item.title
                                        }
                                        onChange = {
                                            this.handleChangeTitle('dimensionName', i)
                                        } />} extra={< Button type = "primary" onClick = {
                                            this.handleDeleteDimension.bind(this, i)
                                        } > 删除 < /Button>}>
                                            <div className="dimension-list">
                                                <div className="dimension">
                                                    <h2>维度：</h2>
                                                    <EditDimensionPage onId={item.id} onReceiveData={this.handleReceiveData.bind(this)} onList={item.dimension_fields}/>
                                                </div>
                                                <div className="data">
                                                    <h2>数据项：</h2>
                                                    <EditDataPage onId={item.id} onReceiveData={this.handleReceiveData.bind(this)} onList={item.data_fields}/>
                                                </div>
                                            </div>
                                        </Card>
                                    </Col>
                                )
                            })}
                            <Col span='8'>
                                <Card title='添加维度'>
                                    <div className="new-cube">
                                        <Icon type="plus" onClick={this.handleCreateNewCubeDimension.bind(this)}/>
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
