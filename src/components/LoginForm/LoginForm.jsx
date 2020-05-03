import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

class LoginForm extends Component {
    constructor(props) {
        super(props)
    }

    onFinish = values => {
        console.log('Success:', values)
        this.props.requestLogin({ username: values.username, password: values.password })
        this.props.history.push("/homepage")
    }

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo)
    }

    render() {
        return (
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
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
                        登陆
                    </Button>
                    <span> </span>或 <a href="/register">注册</a>
                </Form.Item>
            </Form>
        )
    }
}

export default withRouter(LoginForm)