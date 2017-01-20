'use strict';
import React from 'react';
import {Layout, Menu, Icon, Dropdown} from 'antd';
import http from '../../../lib/http';
const {SubMenu} = Menu;
const {Header, Sider, Content} = Layout;

export default class ReportLayout extends React.Component {
    constructor(context, props) {
        super(context, props);
        const {onSendParams,onFolderConf} = this.props;
        this.state = {
            collapsed: false,
            folderList: null,
            folderConf: onFolderConf,
            params: onSendParams // 判断当前路由是否有params
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.onSendParams) {
            this.props.onReceiveFolderConf("can't set state");
        }
        this.setState({
            selectedKeys: nextProps.onFolderConf.folderId + '-' + nextProps.onFolderConf.fileId,
            openKeys: nextProps.onFolderConf.folderId
        })
    }
    componentDidMount() {
        const {params,folderConf} = this.state;
        this.handleInitFolderTree();
    }
    handleInitFolderTree() {
        http.get('/api/?c=table.folder&ac=tree').then(data => data.data).then(data => {
            if (data.errcode === 10000) {
                this.setState({folderList: data.data})
                this.props.onReceiveFolderConf({folderId: data.data[0].id, fileId: data.data[0].tables[0].id});
            }
        })
    }
    toggle() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    change(folderId, fileId) {
        this.props.onChange({folderId: folderId, fileId: fileId});
    }
    render() {
        const {folderList, selectedKeys, openKeys} = this.state;
        const addContentMenu = (
            <Menu>
                <Menu.Item key="0">
                    添加文件
                </Menu.Item>
                <Menu.Item key="1">
                    添加报表
                </Menu.Item>
            </Menu>
        );
        const delContentMenu = (
            <Menu>
                <Menu.Item key="0">
                    删除文件
                </Menu.Item>
                <Menu.Item key="1">
                    删除报表
                </Menu.Item>
            </Menu>
        );
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo"/>
                    <div className="power-line">
                        <Dropdown overlay={addContentMenu} trigger={['click']}>
                            <a className="ant-dropdown-link" href="#">
                                <Icon type="plus"/>
                                添加
                            </a>
                        </Dropdown>
                        <Dropdown overlay={delContentMenu} trigger={['click']}>
                            <a className="ant-dropdown-link" href="#">
                                <Icon type="minus"/>
                                删除
                            </a>
                        </Dropdown>
                    </div>
                    {folderList && selectedKeys && <Menu mode="inline" defaultSelectedKeys={[selectedKeys]} defaultOpenKeys={[openKeys]} theme="dark">
                        {folderList.map((item, i) => {
                            return (
                                <SubMenu key={item.id} title={< span > <Icon type="laptop"/>
                                    {item.title} < /span>}>
                                    {item.tables && item.tables.length > 0 && item.tables.map((subItem, subI) => {
                                        return (
                                            <Menu.Item key={item.id + '-' + subItem.id}>
                                                <span onClick={this.change.bind(this, item.id, subItem.id)}>{subItem.title}</span>
                                            </Menu.Item>
                                        )
                                    })}
                                </SubMenu>
                            )
                        })}
                    </Menu>}
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
                        margin: '10px 16px',
                        padding: 24,
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
