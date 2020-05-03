import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import { Route, withRouter } from 'react-router-dom'
import {
    AuditOutlined,
    BarChartOutlined,
    CloudOutlined,
    UserOutlined,
    AppstoreOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css'
import routes from '../routes'
import './MainView.css'

const { Content, Footer, Sider } = Layout
class MainView extends Component {
    get routes() {
        return (
            routes.map(route => (
                <Route key={route.pathKey} exact {...route} />
            ))
        )
    }

    onClick = e =>{
        switch(e.key){
            case "1":
                this.props.history.push("/homepage")
                break
            case "2":
                this.props.history.push("/classpage")
                break
            default:
                this.props.history.push("/homepage")
        }
    }

    render() {
        return (
            <Layout>
                <Sider
                    breakpoint="md"
                    collapsedWidth="0"
                    style={{ height:"100vh", position: "fixed",zIndex:99}}
                >
                    <div className="logo" />
                    <Menu onClick={this.onClick} theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                        <Menu.Item key="1" icon={<AppstoreOutlined />}>
                            我的课程
                        </Menu.Item>
                        <Menu.Item key="2" icon={<AuditOutlined />}>
                            我的证书
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UserOutlined />}>
                            个人信息
                        </Menu.Item>
                        <Menu.Item key="4" icon={<BarChartOutlined />}>
                            帮助
                        </Menu.Item>
                        <Menu.Item key="5" icon={<CloudOutlined />}>
                            反馈
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

export default withRouter(MainView)