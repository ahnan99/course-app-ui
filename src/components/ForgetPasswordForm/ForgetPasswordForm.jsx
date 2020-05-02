import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'

export default class ForgetPassword extends Component {
    onFinish = values => {
        this.props.handleClick()
    }


    render() {
        return (
            <Form
            onFinish={values => this.onFinish(values)}>
                <Form.Item
                    name="name"
                    label="用户名"
                    rules={[{ required: true, message: '请输入用户名' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="身份证号码" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        重置密码
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}
