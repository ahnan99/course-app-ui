import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import { Route } from 'react-router-dom'
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UserOutlined,
    UploadOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css'
import routes from '../routes'
import './MainView.css'

const { Content, Footer, Sider, Header } = Layout
export default class MainView extends Component {
    get routes() {
        return (
            routes.map(route => (
                <Route key={route.pathKey} exact {...route} />
            ))
        )
    }

    render() {
        return (
            <Layout>
                <Sider
                    breakpoint="md"
                    collapsedWidth="0"
                    style={{ height:"100vh", position: "fixed"}}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            nav 1
                        </Menu.Item>
                        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                            nav 2
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UploadOutlined />}>
                            nav 3
                        </Menu.Item>
                        <Menu.Item key="4" icon={<BarChartOutlined />}>
                            nav 4
                        </Menu.Item>
                        <Menu.Item key="5" icon={<CloudOutlined />}>
                            nav 5
                        </Menu.Item>
                        <Menu.Item key="6" icon={<AppstoreOutlined />}>
                            nav 6
                        </Menu.Item>
                        <Menu.Item key="7" icon={<TeamOutlined />}>
                            nav 7
                         </Menu.Item>
                        <Menu.Item key="8" icon={<ShopOutlined />}>
                            nav 8
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout" style={{ padding: 0 }}>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360, textAlign: 'center' }}>
                            {this.routes}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    }
}
