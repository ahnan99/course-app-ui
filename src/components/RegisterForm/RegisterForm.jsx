import React, { Component } from 'react'
import { Form, Input, Button, Select, Radio, message, Upload, AutoComplete } from 'antd'
import checkIDcard from '../../modules/function/checkID'
import checkUSCI from '../../modules/function/checkUSCI'
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
        this.checkUSCI = checkUSCI
        this.state = { kindID: "0" }
    }

    componentWillMount = () => {
        if (this.props.loggedIn) {
            this.props.history.push('/homepage')
        }
        this.props.userActions.getEducation({ kindID: 'education' })
        if (this.props.application.companyInfo) {
            this.props.userActions.getDept1({ kindID: 0, pID: this.props.application.companyInfo[0].deptID })
        }

    }

    componentWillReceiveProps = (nextProps) => {

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
            const values = this.formRef.current.getFieldsValue();
            const { fromID } = this.props.application;
            this.props.requestLogin({
              username: values.username,
              password: values.password,
              fromID
            });
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
            dept1: !values.kindID || values.kindID === "0" ? values.dept1 : 0,
            dept1Name: !values.kindID || values.kindID === "0" ? null : values.dept1,
            dept2: values.dept2 ? values.dept2 : 0,
            dept3: values.dept3,
            job: values.job,
            mobile: values.mobile,
            phone: values.phone,
            email: '',   //*
            tax: values.tax,   //*单位统一编码
            memo: '',
            address: values.address,
            unit: values.unit,
            experience: '',
            dept: values.dept,
            fromID: window._sales
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

    validatePassword = (_, value) => {
        if (!value) {
          return Promise.reject(new Error('请输入密码'));
        }
        console.log("window._host",window._host);
        let regex = /^.{6,}$/;
        if(window._host==="spc"){
            regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        }
        if (!regex.test(value)) {
          return Promise.reject(new Error(window._host==="spc"?'密码至少8位，包含数字、大写字母和小写字母':"密码至少6位"));
        }
        return Promise.resolve();
    };

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
                        { validator: this.validatePassword },
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
                    rules={[{ required: true, message: '请输入学历' }]}
                >
                    <Select>
                        {this.props.user.educationList.map(item => (
                            <Option value={item.ID}>{item.item}</Option>
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
                {this.props.application.companyInfo[0].hostNo === 'spc' ? <Form.Item
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
                            <Option value={dept.deptID}>{dept.deptName}</Option>
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
                    <Select
                        disabled={kindID !== "0"}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        showSearch>
                        {this.props.user.dept2List.map(dept => (
                            <Option value={dept.deptID}>{dept.deptName}</Option>
                        ))}
                    </Select>
                </Form.Item>}
                {this.props.application.companyInfo[0].hostNo !== 'spc' && this.props.application.companyInfo[0].hostNo !== 'shm' ? <Form.Item
                    name="unit"
                    label="单位名称（全称）"
                    rules={[{ required: true, message: '请输入单位' }]}
                >
                    <Input />
                </Form.Item> : null}
                <Form.Item
                    name="tax"
                    label="单位代码"
                    rules={[
                        {
                            message: '请输入社会统一信用代码',
                        },
                        {
                            validator: (rule, value) => {
                                console.log(this.checkUSCI(value))
                                if (!value || this.checkUSCI(value)) {
                                    return Promise.resolve();
                                } else if (value.length !== 18) {
                                    return Promise.reject('编码长度应该是18位');
                                } else
                                    return Promise.reject('单位代码校验错误');
                            }
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
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
                {/* <Form.Item
                    name="experience"
                    label="工作经历"
                >
                    <Input />
                </Form.Item> */}
                <Form.Item
                    name="address"
                    label="单位地址（上海）"
                    rules={[{ required: true, message: '请输入单位地址' }]}
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
                {/* <Form.Item
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
                </Form.Item> */}
                {/* <Form.Item
                    name="memo"
                    label="备注"
                >
                    <Input />
                </Form.Item> */}
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