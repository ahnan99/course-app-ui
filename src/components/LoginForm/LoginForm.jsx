import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { actions as LoginActions } from '../../modules/application'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

class LoginForm extends Component {


    onFinish = values => {
        console.log('Success:', values)
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
                
            >
                <Form.Item
                    name="用户名"
                    rules={[{ required: true, message: '请输入用户名' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="身份证号码" />
                </Form.Item>
                <Form.Item
                    name="密码"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="密码"
                    />
                </Form.Item>
                <Form.Item>

                    <a className="login-form-forgot" href="">
                        忘记密码
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button onClick={this.props.actions.userLogin} type="primary" htmlType="submit" className="login-form-button">
                        登陆
                    </Button>
                    <span> </span>或 <a href="/register">注册</a>
                </Form.Item>
            </Form>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(LoginActions, dispatch)
})

export default connect(null, mapDispatchToProps)(LoginForm)