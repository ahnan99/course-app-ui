import React, { Component } from 'react'
import { Form, Input, Button, message, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import qs from 'qs'
import axios from 'axios'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

class LoginForm extends Component {

    redirectToRegister = () => {
        this.props.history.push('/register')
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.loggedIn && nextProps.username && nextProps.auditor === 1) {
            if(nextProps.teacher){
                this.props.history.push('/homepage')
            }else{
                this.props.history.push('/auditpage')
            }   
        }
        else if (nextProps.loggedIn && nextProps.username) {
            this.props.getUserInfo({ username: nextProps.username })
            if (nextProps.userInfo && nextProps.userInfo.newCourse === 0 && nextProps.userInfo.host_kindID === 0) {
                console.log("goto courseselect")
                this.props.history.push('/courseselect')
            } else if (nextProps.userInfo) {
                console.log("goto homepage")
                this.props.history.push('/homepage')
            }
        }
        if (nextProps.loginError) {
            message.error(nextProps.loginError.msg)
            if (nextProps.loginError.status === 1) {
                this.props.history.push('/register')
            }
        }
    }

    onFinish = values => {
        console.log('Success:', values)
        if (values.auditor) {
            this.props.auditorRequestLogin({ username: values.username, password: values.password })
        } else {
            const { fromID } = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
            this.props.requestLogin({ username: values.username, password: values.password, fromID })
        }
    }

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo)
    }

    onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    }
    render() {
        return (
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ username: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).username, remember: true }}
                onFinish={this.onFinish}
                {...layout}
            >
                <Form.Item
                    name="username"
                    label="用户名"
                    rules={[{ required: true, message: '请输入用户名' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="身份证号码" />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="密码"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="密码"
                    />
                </Form.Item>
                <Form.Item>
                    <a className="login-form-forgot" href="/forgetpassword">
                        忘记密码
                    </a>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    <span>&nbsp;&nbsp;</span> <Button type="primary" onClick={() => this.redirectToRegister()}>注册</Button>
                </Form.Item>
                <div>&nbsp;&nbsp;</div>
                <Form.Item name="auditor">
                    <Checkbox.Group>
                        <Checkbox value="1" onChange={this.onChange}>督查</Checkbox>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item>
                <a href={axios.defaults.baseURL+"/public/temp/help.mp4"}>系统使用帮助</a>
                </Form.Item>
            </Form>
        )
    }
}

export default withRouter(LoginForm)