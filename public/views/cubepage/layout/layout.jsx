'use strict';

var React = require('react');
import {Layout, Menu, Icon} from 'antd';
const {Header, Sider, Content} = Layout;

export default class SiderDemo extends React.Component {
    constructor(context, props) {
        super(context, props);
        this.state = {
            collapsed: false
        };

    }

    toggle() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    goHome(item) {
        if (!item || item.key == '0') {
            this.context.router.push({pathname: '/index'})
        } else if (item.key == '1') {
            this.context.router.push('/index/report/cube')
        }
    }
    render() {
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" onClick={this.goHome.bind(this)}/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={this.goHome.bind(this)}>
                        <Menu.Item key="0">
                            <Icon type="rollback"/>
                            <span className="nav-text">首页</span>
                        </Menu.Item>
                        <Menu.Item key="1">
                            <Icon type="bars"/>
                            <span className="nav-text">CUBE 列表</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{
                        background: '#fff',
                        padding: 0
                    }}>
                        <Icon className="trigger" type={this.state.collapsed
                            ? 'menu-unfold'
                            : 'menu-fold'} onClick={this.toggle.bind(this)}/>
                    </Header>
                    <Content style={{
                        margin: '10px',
                        padding: 16,
                        background: '#fff',
                        minHeight: 800
                    }}>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
SiderDemo.contextTypes = {
    router: React.PropTypes.func.isRequired
}
