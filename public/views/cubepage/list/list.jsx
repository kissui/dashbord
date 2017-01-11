'use strict';
import React from 'react';
import SideMenu from '../layout/sidebar';
import HeaderPage from '../../layout/head';
import http from '../../../lib/http';
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;

export default class SiderDemo extends React.Component {
    constructor(context,props){
        super(context,props);
        this.state = {
          collapsed: false,
        };
    }
     toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render() {
        return (
          <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="bars" />
                            <span className="nav-text">CUBE 列表</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <Icon
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle.bind(this)}
                    />
                </Header>
                <Content style={{ margin: '10px', padding: 16, background: '#fff', minHeight: 280 }}>
                    
                </Content>
                </Layout>
            </Layout>
        );
      }
}
