import React, { Component } from 'react'
import { Form, Input, Button, Select, Radio, message, Upload, AutoComplete } from 'antd'
import checkIDcard from '../../modules/function/checkID'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Avatar from './Avatar'

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
class UserInfoForm extends Component {
    formRef = React.createRef()
    constructor(props) {
        super(props)
        this.checkIDcard = checkIDcard
        this.state = { kindID: "0" }
    }

    componentWillMount() {
        this.props.userActions.getDept1({ kindID: this.props.application.userInfo.kindID, pID: this.props.application.companyInfo[0].deptID })
        if (this.props.application.userInfo.dept2 && this.props.application.userInfo.dept2 !== 0) {
            this.props.userActions.getDept2({ kindID: this.props.application.userInfo.kindID, pID: this.props.application.userInfo.dept1 })
        }

    }

    componentDidMount() {
        if (this.props.application.userInfo) {
            this.setState({ kindID: this.props.application.userInfo.kindID.toString() })
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.application.postUserInfoStatus && nextProps.application.postUserInfoStatus.status === 0) {
            message.success("学员信息修改成功")
            this.props.actions.getUserInfo({ username: this.props.application.username })
            this.props.actions.resetPostUserInfo()
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
        this.props.actions.postUserInfo({
            username: values.username,   //*
            name: values.name,   //*
            kindID: values.kindID,    //0:系统内单位  1:系统外单位
            companyID: this.props.application.companyInfo[0].deptID, //*
            dept1: values.kindID === "0" ? values.dept1 : "",
            dept1Name: values.kindID === "0" ? "" : values.dept1,
            dept2: values.dept2 ? values.dept2 : "",
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
        return (
            <Form
                {...formItemLayout}
                onFinish={this.onFinish}
                scrollToFirstError
                initialValues={this.props.application.userInfo ?
                    {
                        ...this.props.application.userInfo,
                        kindID: this.props.application.userInfo.kindID.toString(),
                        companyID: this.props.application.companyInfo[0].deptName,
                        dept1: this.props.application.userInfo.kindID.toString() === "1" ? this.props.application.userInfo.dept1Name : this.props.application.userInfo.dept1,
                        dept2: this.props.application.userInfo.dept2 == 0 ? "" : this.props.application.userInfo.dept2
                    }
                    : { kindID: "0", companyID: this.props.user.companyName }}
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
                    <Input disabled />
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
                    label="一级部门"
                    rules={[
                        {
                            required: true,
                            message: '请输入一级部门名称',
                        },
                    ]}
                >
                    {kindID === "0" ? <Select showSearch>
                        {this.props.user.dept1List.map(dept => (
                            <Option key={dept.deptID} value={dept.deptID}>{dept.deptName}</Option>
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
                            <Option key={dept.deptID} value={dept.deptID}>{dept.deptName}</Option>
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
                <Form.Item
                    name="upload"
                    label="上传照片(自拍头像)"
                >
                    <Avatar imageUrl={this.props.application.userInfo.photo_filename !== "" ? axios.defaults.baseURL + this.props.application.userInfo.photo_filename : axios.defaults.baseURL + '/public/images/guy.png'} action={`${axios.defaults.baseURL}/files/uploadSingle?username=${this.props.application.username}&upID=student_photo`} />
                </Form.Item>
                <Form.Item
                    name="upload2"
                    label="上传身份证正面"
                >
                    <Avatar imageUrl={this.props.application.userInfo.IDa_filename ? axios.defaults.baseURL + this.props.application.userInfo.IDa_filename : null} action={`${axios.defaults.baseURL}/files/uploadSingle?username=${this.props.application.username}&upID=student_IDcardA`} />
                </Form.Item>
                <Form.Item
                    name="upload3"
                    label="上传身份证背面"
                >
                    <Avatar imageUrl={this.props.application.userInfo.IDb_filename ? axios.defaults.baseURL + this.props.application.userInfo.IDb_filename : null} action={`${axios.defaults.baseURL}/files/uploadSingle?username=${this.props.application.username}&upID=student_IDcardB`} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">修改信息</Button>
                    <span> </span>
                    <span> </span>
                </Form.Item>
            </Form>

        )
    }
}
export default withRouter(UserInfoForm)