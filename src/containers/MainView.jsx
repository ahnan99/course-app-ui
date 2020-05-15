import React, { Component } from 'react'
import { Layout, Menu, message } from 'antd'
import { Route, withRouter } from 'react-router-dom'
import {
    AuditOutlined,
    QuestionCircleOutlined,
    InfoCircleOutlined,
    UserOutlined,
    LogoutOutlined,
    MailOutlined,
    AppstoreOutlined,
    ScheduleOutlined
} from '@ant-design/icons';
import { actions as ApplicationActions } from '../modules/application'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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

    state = {
        collapsed: true,
    }

    onClick = e => {
        this.setState({ collapsed: true })
        switch (e.key) {
            case "1":
                this.props.history.push("/homepage")
                break
            case "2":
                this.props.history.push("/courseselect")
                break
            case "4":
                this.props.history.push("/userinfo")
                break
            case "5":
                this.props.history.push("/feedbackpage")
                break
            case "6":
                this.props.history.push("/messagepage")
                break
            case "8":
                this.props.actions.requestLogout()
                break
            default:
                this.props.history.push("/homepage")
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.application.loggedIn == false) {
            this.props.history.push("/login")
        }
    }

    setCollapse = () => {
        this.setState({ collapsed: !this.state.collapsed })
    }

    render() {
        return (
            <Layout>
                <Sider
                    breakpoint="md"
                    collapsedWidth="0"
                    style={{ height: "100vh", position: "fixed", zIndex: 99 }}
                    collapsed={this.state.collapsed}
                    onClick={this.setCollapse}
                >
                    <div className="logo" />
                    <Menu onClick={this.onClick} theme="dark" mode="inline">
                        <Menu.Item key="1" icon={<AppstoreOutlined />} title={""}>
                            我的课程
                        </Menu.Item>
                        <Menu.Item key="2" icon={<ScheduleOutlined />} title={""}>
                            我要选课
                        </Menu.Item>
                        <Menu.Item key="3" icon={<AuditOutlined />} title={""}>
                            我的证书
                        </Menu.Item>
                        <Menu.Item key="4" icon={<UserOutlined />} title={""}>
                            个人信息
                        </Menu.Item>
                        <Menu.Item key="5" icon={<InfoCircleOutlined />} title={""}>
                            反馈
                        </Menu.Item>
                        <Menu.Item key="6" icon={<MailOutlined />} title={""}>
                            消息
                        </Menu.Item>
                        <Menu.Item key="7" icon={<QuestionCircleOutlined />} title={""}>
                            帮助
                        </Menu.Item>
                        <Menu.Item key="8" icon={<LogoutOutlined />} title={""}>
                            退出
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout" style={{ padding: 0 }}>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360, textAlign: 'center' }}>
                            {this.routes}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>NetBlue @2020</Footer>
                </Layout>
            </Layout>
        )
    }
}

const mapStateToProps = state => ({
    application: state.application
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ApplicationActions, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainView))