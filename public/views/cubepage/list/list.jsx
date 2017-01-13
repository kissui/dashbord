'use strict';
import React from 'react';
import LayoutCubePage from '../layout/layout';
import ContentPage from './content';
import http from '../../../lib/http';
import {Spin} from 'antd';
export default class SiderDemo extends React.Component {
    constructor(context, props) {
        super(context, props);
        this.state = {
            currentCubeData: null
        };
    }
    componentDidMount() {
        const {location, routeParams, params} = this.props;
        http.get('/api/?c=cube.cubes&ac=index&id=' + params.cubeId).then(data => data.data).then(data => {
            this.setState({currentCubeData: data.data})
        })

    }
    render() {
        const {currentCubeData} = this.state;
        return (
            <LayoutCubePage>
                {currentCubeData
                    ? <ContentPage onCurrentCubeData={currentCubeData}/>
                    : <Spin/>}
            </LayoutCubePage>
        );
    }
}
