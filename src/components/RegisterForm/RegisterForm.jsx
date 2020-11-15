import React, { Component } from 'react'
import { Form, Input, Button, Select, Radio, message, Upload, AutoComplete } from 'antd'
import checkIDcard from '../../modules/function/checkID'
import { withRouter } from 'react-router-dom'
import { UploadOutlined } from '@ant-design/icons';

const props = {
    name: 'avatar',
    action: 'http://localhost:8081/files/uploadSingle?username=120107196604032113&upID=student_photo',
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
        this.state = { kindID: "0" }
    }

    componentWillMount = () => {
        if (this.props.loggedIn) {
            this.props.history.push('/homepage')
        }


    }

    componentWillReceiveProps = (nextProps) => {
        this.props.userActions.getEducation({ kindID: 'education' })
        if (nextProps.loggedIn) {
            this.props.history.push('/homepage')
        }
        if (nextProps.registerError) {
            message.error(nextProps.registerError)
        }
        if (!this.props.application.companyInfo && nextProps.application.companyInfo) {
            this.props.userActions.getDept1({ kindID: 0, pID: nextProps.application.companyInfo[0].deptID })
        }
        if (nextProps.registered) {
            message.success("注册成功！")
            this.props.resetRegisterStatus()
            this.props.history.push('/login')
        }
    }

    listToOptions = deptList => {
        const option = []
        for (var i = 0; i < deptList.length; i++) {
            option.push({ value: deptList[i].deptName })
        }
        return option
    }

    onFinish = values => {
        console.log('Success:', values)
        this.props.requestRegister({
            username: values.username,   //*
            name: values.name,   //*
            password: values.password,   //*
            kindID: this.props.application.companyInfo[0].hostNo !== 'spc' ? 0 : values.kindID,
            education: values.education,    //0:系统内单位  1:系统外单位
            companyID: this.props.application.companyInfo[0].deptID, //*
            dept1: values.kindID === "0" ? values.dept1 : 0,
            dept1Name: values.kindID === "0" ? null : values.dept1,
            dept2: values.dept2 ? values.dept2 : 0,
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
            this.setState({ kindID: changedValue.kindID })
            this.props.userActions.getDept1({ kindID: changedValue.kindID, pID: this.props.application.companyInfo[0].deptID })
            this.props.userActions.updateDept2([])
            this.formRef.current.setFieldsValue({ dept1: null, dept2: null })
        }
        if (values.kindID === "0" && changedValue.dept1) {
            this.props.userActions.getDept2({ kindID: values.kindID, pID: changedValue.dept1 })
            this.formRef.current.setFieldsValue({ dept2: null })
        }
    }

    render() {
        const { kindID } = this.state
        if (!this.props.application.companyInfo) {
            return (<div />)
        }
        return (
            <Form
                {...formItemLayout}
                onFinish={this.onFinish}
                scrollToFirstError
                initialValues={{ kindID: "0" }}
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
                        {
                            min: 6,
                            message: '密码至少六位'
                        }
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
                    name="education"
                    label="学历"
                >
                    <Select>
                        {this.props.user.educationList.map(item => (
                            <Option value={item.ID}>{item.item}</Option>
                        ))}
                    </Select>
                </Form.Item>
                {this.props.application.companyInfo[0].hostNo === 'spc'?<Form.Item
                    name="kindID"
                    label="性质"
                >
                    <Radio.Group>
                        <Radio value="0">石化系统员工</Radio>
                        <Radio value="1">非石化系统员工</Radio>
                    </Radio.Group>
                </Form.Item>:null}
                <Form.Item
                    name="dept1"
                    label={kindID === "0" ? "一级部门" : "公司名称"}
                    rules={[
                        {
                            required: true,
                            message: '请输入一级部门名称',
                        },
                    ]}
                >
                    {kindID === "0" ? <Select showSearch>
                        {this.props.user.dept1List.map(dept => (
                            <Option value={dept.deptID}>{dept.deptName}</Option>
                        ))}
                    </Select> :
                        <AutoComplete
                            options={this.listToOptions(this.props.user.dept1List)}
                            filterOption={(inputValue, option) =>
                                option.value.indexOf(inputValue) !== -1
                            } />
                    }
                </Form.Item>
                <Form.Item
                    name="dept2"
                    label="二级部门"
                >
                    <Select disabled={kindID !== "0"}>
                        {this.props.user.dept2List.map(dept => (
                            <Option value={dept.deptID}>{dept.deptName}</Option>
                        ))}
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
                        {
                            validator: (rule, value) => {
                                console.log(this.checkIDcard(value))
                                if (!value || value.length === 11) {
                                    return Promise.resolve();
                                } else {
                                    return Promise.reject('手机号不合法')
                                }
                            },
                        }
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
                        }
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
                {false ? <Form.Item
                    name="upload"
                    label="上传照片"
                >
                    <Upload {...props}>
                        <Button>
                            <UploadOutlined /> Click to Upload
                        </Button>
                    </Upload>
                </Form.Item> : null}
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