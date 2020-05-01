import React, { Component } from 'react'
import { Form, Input, Button, Select, Layout } from 'antd'

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

export default class RegisterForm extends Component {
    constructor(props) {
        super(props)
        this.checkIDcard = this.checkIDcard.bind(this)
    }

    //校验身份证号码
    checkIDcard(idcard) {
        /*
        1."验证通过!", 
        2."身份证号码位数不对!", 
        3."身份证号码出生日期超出范围或含有非法字符!", 
        4."身份证号码校验错误!", 
        5."身份证地区非法!" 
        */
        var Errors = new Array(1, 2, 3, 4, 5);
        var area = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" }
        var idcard, Y, JYM;
        var S, M;
        var idcard_array = new Array();
        idcard_array = idcard.split("");
        var ereg;
        //地区检验 
        if (area[parseInt(idcard.substr(0, 2))] == null) return Errors[4];
        //身份号码位数及格式检验 
        switch (idcard.length) {
            case 15:
                if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
                    ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性 
                } else {
                    ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性 
                }
                if (ereg.test(idcard)) return Errors[0];
                else return Errors[2];
                break;
            case 18:
                //18位身份号码检测 
                //出生日期的合法性检查  
                //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9])) 
                //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8])) 
                if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
                    ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//闰年出生日期的合法性正则表达式 
                } else {
                    ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//平年出生日期的合法性正则表达式 
                }
                if (ereg.test(idcard)) {//测试出生日期的合法性 
                    //计算校验位 
                    S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
                        + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
                        + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
                        + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
                        + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
                        + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
                        + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
                        + parseInt(idcard_array[7]) * 1
                        + parseInt(idcard_array[8]) * 6
                        + parseInt(idcard_array[9]) * 3;
                    Y = S % 11;
                    M = "F";
                    JYM = "10X98765432";
                    M = JYM.substr(Y, 1);//判断校验位 
                    if (M == idcard_array[17]) return Errors[0]; //检测ID的校验位 
                    else return Errors[3];
                }
                else return Errors[2];
                break;
            default:
                return Errors[1];
                break;
        }
    }


    render() {
        return (
            <Form
                {...formItemLayout}
                scrollToFirstError>
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
                    name="companyID"
                    label="公司名称"
                    rules={[
                        {
                            required: true,
                            message: '请输入公司名称',
                        },
                    ]}
                >
                    <Select />
                </Form.Item>
                <Form.Item
                    name="dept1"
                    label="部门1"
                >
                    <Select />
                </Form.Item>
                <Form.Item
                    name="dept2"
                    label="部门2"
                >
                    <Select />
                </Form.Item>
                <Form.Item
                    name="dept3"
                    label="部门3"
                >
                    <Select />
                </Form.Item>
                <Form.Item
                    name="moblie"
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
                <Form.Item>
                    <Button type="primary" >注册</Button>
                    <span> </span>
                    <span> </span>
                    <a href="/login">取消</a>
                </Form.Item>
            </Form>

        )
    }
}
