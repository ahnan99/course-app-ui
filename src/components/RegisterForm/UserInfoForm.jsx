import React, { Component } from 'react'
import { Form, Input, Button, Select, Radio, message, Upload, AutoComplete, Row, Col } from 'antd'
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
        this.props.userActions.getEducation({ kindID: 'education' })
        this.props.userActions.getDept1({ kindID: this.props.application.userInfo.kindID, pID: this.props.application.companyInfo[0].deptID })
        if (this.props.application.userInfo.dept1 && this.props.application.userInfo.dept1 !== 0) {
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
            username: values.username,
            password: values.password,  //*
            name: values.name,   //*
            kindID: this.props.application.userInfo.host === 'spc' ? values.kindID : 0,    //0:系统内单位  1:系统外单位
            education: values.education,
            companyID: this.props.application.companyInfo[0].deptID, //*
            dept1: values.kindID === "0" ? values.dept1 : "",
            dept1Name: values.kindID === "0" ? "" : values.dept1,
            dept2: values.dept2 ? values.dept2 : "",
            dept3: values.dept3,
            job: values.job,
            mobile: values.mobile,
            phone: values.phone,
            email: values.email,   //*
            memo: values.memo,
            address: values.address,
            unit: values.unit,
            experience: values.experience,
            dept: values.dept
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
        if (changedValue.dept2) {
            this.props.user.dept2List.map(dept => {
                if (dept.deptID === changedValue.dept2) {
                    this.formRef.current.setFieldsValue({
                        address: dept.address,
                        phone: dept.phone
                    })
                }
            })
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
                        password: null,
                        kindID: this.props.application.userInfo.kindID.toString(),
                        education: this.props.application.userInfo.education.toString(),
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
                    name="password"
                    label="密码"
                    rules={[
                        {
                            required: false,
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
                            required: false,
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
                    rules={[{ required: true, message: '请输入学历' }]}
                >
                    <Select>
                        {this.props.user.educationList.map(item => (
                            <Option key={item.ID} value={item.ID}>{item.item}</Option>
                        ))}
                    </Select>
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
                {this.props.application.userInfo.host === 'spc' ? <Form.Item
                    name="kindID"
                    label="性质"
                >
                    <Radio.Group>
                        <Radio value="0">石化系统员工</Radio>
                        <Radio value="1">非石化系统员工</Radio>
                    </Radio.Group>
                </Form.Item> : null}
                {this.props.application.companyInfo[0].hostNo !== 'spc' && this.props.application.companyInfo[0].hostNo !== 'shm' ? null : <Form.Item
                    name="dept1"
                    label={kindID === "0" ? "部门(单位)" : "公司名称"}
                    rules={[
                        {
                            required: true,
                            message: '请输入部门(单位)名称',
                        },
                    ]}
                >
                    {kindID === "0" ? <Select showSearch
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
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
                </Form.Item>}
                {this.props.application.companyInfo[0].hostNo !== 'spc' && this.props.application.companyInfo[0].hostNo !== 'shm' ? null : <Form.Item
                    name="dept2"
                    label="基层单位"
                >
                    <Select disabled={kindID !== "0"}
                        showSearch
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                        {this.props.user.dept2List.map(dept => (
                            <Option key={dept.deptID} value={dept.deptID}>{dept.deptName}</Option>
                        ))}
                    </Select>
                </Form.Item>}

                {this.props.application.companyInfo[0].hostNo !== 'spc' && this.props.application.companyInfo[0].hostNo !== 'shm' ? <Form.Item
                    name="unit"
                    label="单位"
                    rules={[{ required: true, message: '请输入单位' }]}
                >
                    <Input />
                </Form.Item> : null}
                {this.props.application.companyInfo[0].hostNo !== 'spc' && this.props.application.companyInfo[0].hostNo !== 'shm' ? <Form.Item
                    name="dept"
                    label="部门"
                    rules={[{ required: true, message: '请输入部门' }]}
                >
                    <Input />
                </Form.Item> : null}
                <Form.Item
                    name="job"
                    label="岗位"
                    rules={[{ required: true, message: '请输入岗位' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="experience"
                    label="工作经历"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="单位电话"
                    rules={[{ required: true, message: '请输入单位电话' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="单位地址"
                    rules={[{ required: true, message: '请输入单位地址' }]}
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
                    label="上传照片(仅供制作证件)"
                >
                    <Row>
                        <Col span={12}>
                            <Avatar imageUrl={this.props.application.userInfo.photo_filename !== "" ? axios.defaults.baseURL + this.props.application.userInfo.photo_filename : axios.defaults.baseURL + '/public/images/guy.png'} action={`${axios.defaults.baseURL}/files/uploadSingle?username=${this.props.application.username}&upID=student_photo`} />
                        </Col>
                        <Col span={12} style={{ textAlign: "left" }}>
                            <span>
                                正面免冠彩色近照, 头部占画面的2/3，图像清晰无畸变。照片高宽比为7:5。请适当裁剪，不合格者无法取证。
                            </span>
                        </Col></Row>
                </Form.Item>
                <Form.Item
                    name="upload2"
                    label="上传身份证正面"
                >
                    <Row>
                        <Col span={12}>
                            <Avatar imageUrl={this.props.application.userInfo.IDa_filename ? axios.defaults.baseURL + this.props.application.userInfo.IDa_filename : null} action={`${axios.defaults.baseURL}/files/uploadSingle?username=${this.props.application.username}&upID=student_IDcardA`} />
                        </Col>
                        <Col span={12} style={{ textalign: "left" }}>
                            <span>
                                水平放置, 身份证充满画面至少4/5，图像清晰，无明显畸变。高宽比为5:8。
                            </span>
                        </Col></Row>
                </Form.Item>
                <Form.Item
                    name="upload3"
                    label="上传身份证背面"
                >
                    <Row>
                        <Col span={12}>
                            <Avatar imageUrl={this.props.application.userInfo.IDb_filename ? axios.defaults.baseURL + this.props.application.userInfo.IDb_filename : null} action={`${axios.defaults.baseURL}/files/uploadSingle?username=${this.props.application.username}&upID=student_IDcardB`} />
                        </Col>
                        <Col span={12} style={{ textalign: "left" }}>
                            <span>
                                同上。
                            </span>
                        </Col></Row>
                </Form.Item>
                <Form.Item
                    name="upload4"
                    label="上传学历证明"
                >
                    <Row>
                        <Col span={12}>
                            <Avatar imageUrl={this.props.application.userInfo.edu_filename ? axios.defaults.baseURL + this.props.application.userInfo.edu_filename : null} action={`${axios.defaults.baseURL}/files/uploadSingle?username=${this.props.application.username}&upID=student_education`} />
                        </Col>
                        <Col span={12} style={{ textalign: "left" }}>
                            <span>
                            </span>
                        </Col></Row>
                </Form.Item>
                <Form.Item
                    name="upload5"
                    label="上传在职证明"
                >
                    <Row>
                        <Col span={12}>
                            <Avatar imageUrl={this.props.application.userInfo.employe_filename ? axios.defaults.baseURL + this.props.application.userInfo.employe_filename : null} action={`${axios.defaults.baseURL}/files/uploadSingle?username=${this.props.application.username}&upID=student_employment`} />
                        </Col>
                        <Col span={12} style={{ textalign: "left" }}>
                            <span>
                            </span>
                        </Col></Row>
                </Form.Item>
                <Form.Item>
                <Form.Item
                    name="upload6"
                    label="上传学信网图"
                >
                    <Row>
                        <Col span={12}>
                            <Avatar imageUrl={this.props.application.userInfo.CHESICC_filename ? axios.defaults.baseURL + this.props.application.userInfo.CHESICC_filename : null} action={`${axios.defaults.baseURL}/files/uploadSingle?username=${this.props.application.username}&upID=student_CHESICC`} />
                        </Col>
                        <Col span={12} style={{ textalign: "left" }}>
                            <span>
                            </span>
                        </Col></Row>
                </Form.Item>
                    <Button type="primary" htmlType="submit">保存</Button>
                    <span> </span>
                    <span> </span>
                </Form.Item>
            </Form>

        )
    }
}
export default withRouter(UserInfoForm)