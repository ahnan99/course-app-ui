import React, { Component } from 'react'
import { Form, Input, Button, Select, Radio, message, Upload } from 'antd'
import checkIDcard from '../../modules/function/checkID'
import { withRouter } from 'react-router-dom'
import { UploadOutlined } from '@ant-design/icons';

const props = {
    name: 'file',
    action: 'http://localhost:8081/files/uploadSingle?username=120107196604032113&upid=student_photo',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const { Option } = Select
class RegisterForm extends Component {
    formRef = React.createRef()
    constructor(props) {
        super(props)
        this.checkIDcard = checkIDcard
    }

    componentWillMount = () => {
        if (this.props.loggedIn) {
            this.props.history.push('/homepage')
        }
        this.props.userActions.getDept1({ kindID: 0, pID: this.props.user.companyID })

    }


    componentWillReceiveProps = (nextProps) => {
        if (nextProps.loggedIn) {
            this.props.history.push('/homepage')
        }
        if (nextProps.registerError) {
            message.error(nextProps.registerError)
        }
        if (nextProps.registered) {
            message.success("注册成功！")
            this.props.resetRegisterStatus()
            this.props.history.push('/login')
        }
    }

    onFinish = values => {
        console.log('Success:', values)
        this.props.requestRegister({
            username: values.username,   //*
            name: values.name,   //*
            password: values.password,   //*
            kindID: values.kindID,    //0:系统内单位  1:系统外单位
            companyID: values.companyID, //*
            dept1: values.dept1,
            dept2: values.dept2,
            dept3: values.dept3,
            job: values.job,
            mobile: values.mobile,
            phone: values.phone,
            email: values.email,   //*
            memo: values.memo
        })
    }

    onValuesChange = (changedValue, values) => {
        if (changedValue.kindID) {
            this.props.userActions.getDept1({ kindID: changedValue.kindID, pID: this.props.user.companyID })
            this.formRef.current.setFieldsValue({ dept1: null, dept2: null })
        }
        if (changedValue.dept1) {
            this.props.userActions.getDept2({ kindID: values.kindID, pID: changedValue.dept1 })
            this.formRef.current.setFieldsValue({ dept2: null })
        }
    }

    render() {
        return (
            <Form
                {...formItemLayout}
                onFinish={this.onFinish}
                scrollToFirstError
                initialValues={{ kindID: "0", companyID: this.props.user.companyName }}
                onValuesChange={this.onValuesChange}
                ref={this.formRef}
            >
                <Form.Item
                    name="username"
                    label="身份证"
                    rules={[
                        {
                            required: true,
                            message: '请输入身份证号',
                        },
                        {
                            validator: (rule, value) => {
                                console.log(this.checkIDcard(value))
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
                    <Input />
                </Form.Item>
                <Form.Item
                    name="name"
                    label="姓名"
                    rules={[
                        {
                            required: true,
                            message: '请输入姓名',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="密码"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="确认密码"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: '请确认密码',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('两次输入不匹配');
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="kindID"
                    label="性质"
                >
                    <Radio.Group>
                        <Radio value="0">系统内单位</Radio>
                        <Radio value="1">系统外单位</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    name="companyID"
                    label="公司名称"
                    rules={[
                        {
                            required: true,
                            message: '请输入公司名称',
                        },
                    ]}
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="dept1"
                    label="部门1"
                >
                    <Select>
                        {this.props.user.dept1List.map(dept => (
                            <Option value={dept.deptID}>{dept.deptName}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="dept2"
                    label="部门2"
                >
                    <Select>
                        {this.props.user.dept2List.map(dept => (
                            <Option value={dept.deptID}>{dept.deptName}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="dept3"
                    label="部门3"
                >
                    <Select disabled>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="job"
                    label="岗位"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="mobile"
                    label="手机号码"
                    rules={[
                        {
                            required: true,
                            message: '请输入手机号码',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="固定电话"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'E-mail地址不合法',
                        },
                        {
                            required: true,
                            message: '请输入email',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="memo"
                    label="备注"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="upload"
                    label="上传照片"
                >
                    <Upload {...props}>
                        <Button>
                            <UploadOutlined /> Click to Upload
                        </Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">注册</Button>
                    <span> </span>
                    <span> </span>
                    <a href="/login">取消</a>
                </Form.Item>
            </Form>

        )
    }
}
export default withRouter(RegisterForm)