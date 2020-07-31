import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import checkIDcard from '../../modules/function/checkID'


export default class ForgetPassword extends Component {
    constructor(props) {
        super(props)
        this.checkIDcard = checkIDcard
    }

    onFinish = values => {
        this.props.actions.postResetPassword({ username: values.name, mobile: values.mobile })
    }


    render() {
        return (
            <Form
                onFinish={values => this.onFinish(values)}>
                <Form.Item
                    name="name"
                    label="用户名"
                    rules={[
                        {
                            required: true,
                            message: '请输入身份证号',
                        },
                        {
                            validator: (rule, value) => {
                                console.log(checkIDcard(value))
                                if (!value || this.checkIDcard(value) === 1) {
                                    return Promise.resolve();
                                } else if (this.checkIDcard(value) === 2) {
                                    return Promise.reject('身份证号码位数不对');
                                } else if (this.checkIDcard(value) === 3) {
                                    return Promise.reject('身份证号码出生日期超出范围或含有非法字符');
                                } else if (this.checkIDcard(value) === 4) {
                                    return Promise.reject('身份证号码校验错误');
                                } else if (this.checkIDcard(value) === 5) {
                                    return Promise.reject('身份证地区非法');
                                } else
                                    return Promise.reject('身份证号码校验错误');
                            },
                        }

                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="身份证号码" />
                </Form.Item>
                <Form.Item
                    name="mobile"
                    label="手机号"
                    rules={[
                        {
                            required: true,
                            message: '请输入手机',
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        重置密码
                    </Button>
                    <span> </span>
                    <span> </span>
                    <a href="/login">取消</a>
                </Form.Item>
            </Form>
        )
    }
}
