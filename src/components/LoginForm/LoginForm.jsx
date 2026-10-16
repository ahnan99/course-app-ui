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
    state = {
        waiting: false
    }

    redirectToRegister = () => {
        this.props.history.push('/register')
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.loginError && this.props.loginError !== prevProps.loginError) {
            message.error(this.props.loginError.msg || '登录失败，请重试')
            if (this.props.loginError.status === 1) {
                this.props.history.push('/register')
            }
        }
    }

    onFinish = values => {
        if (this.props.isFetching) return
        if (values.auditor && values.auditor.length > 0) {
            this.props.auditorRequestLogin({ username: values.username, password: values.password })
        } else {
            // const { fromID } = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
            // console.log("formID:", fromID, window._sales)
            this.props.requestLogin({ username: values.username, password: values.password, fromID:window._sales })
        }
    }

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo)
    }

    onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    }

    onChangeID = (e) => {
        // console.log('ID value:', e.target.value)
        // this.setState({ waiting: e.target.value==="123" ? false : true });
    };

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
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="身份证号码" onChange={this.onChangeID} />
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
                    {this.state.waiting ? <span style={{color:'red', paddingLeft:'10px', fontSize:'1.5em'}}>系统正在维护，预计在20:00恢复</span> :
                    <Button type="primary" htmlType="submit" className="login-form-button" loading={this.props.isFetching}>
                        登录
                    </Button>}
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
