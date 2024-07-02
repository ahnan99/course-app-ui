import React, { Component } from 'react'
import { Card, Row, Col, Progress, message, Button, Checkbox, Modal, Popover } from 'antd'
import { withRouter } from 'react-router-dom'
import { RightOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import SignatureCanvas from 'react-signature-canvas'
import { actions as CourseActions } from '../../modules/courses'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// document.addEventListener('visibilitychange', function() { 
//     var isHidden = document.hidden; 
//     if (!isHidden) {
//         window.location.reload() // 强制页面刷新
//     }
// });

class LessonCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            signatureAgreementChecked: false,
            signatureModalVisible: false,
            pay: 0,
            invoice: 0,
            showPayBtn: true,
            showInvoiceBtn: true,
            showPayURL: false
        }
    }

    onClick = (lesson) => {
        if (this.props.lessons && this.props.lessons[0].missingItems) {
            message.info({
                content: '请填写' + this.props.lessons[0].missingItems,
                style: {
                    marginTop: '50%',
                    color: 'red',
                    textAlign: 'left'
                },
                duration: 10,
            })
            this.props.history.push("/userinfo")
        }else {
            this.props.actions.updateCurrentLesson(lesson)
            this.props.history.push("/classpage")
        }

    }

    onClickExam = paperID => {
        this.props.examActions.updateLeave(true)
        this.props.examActions.getExam({ paperID })
    }

    componentDidUpdate = prevProps => {
        if (this.props.exam.exam && prevProps.exam.exam !== this.props.exam.exam) {
            if (this.props.exam.exam[0].missingItems) {
                message.info({
                    content: '请填写' + this.props.exam.exam[0].missingItems,
                    style: {
                        marginTop: '50%',
                        color: 'red',
                        textAlign: 'left'
                    },
                    duration: 10,
                })
                this.props.history.push("/userinfo")
            } else if (this.props.exam.exam[0].startExamMsg !== "") {
                message.info(this.props.exam.exam[0].startExamMsg)
            } else {
                this.props.history.push("/exampage")
                this.props.examActions.getExamQuestion({ paperID: this.props.exam.exam[0].paperID })
            }
        }
        if (this.props.courseState.postSignature && !prevProps.courseState.postSignature) {
            this.setState({ signatureModalVisible: false })
            if (this.props.courseState.postSignature.status === 0) {
                message.success('签名提交成功')
                this.props.actions.getCourseList({ username: this.props.application.username })
            } else {
                message.error('签名提交失败')
            }
            this.sigCanvas.clear()
            this.props.actions.updateSignature(null)
        }
        if (this.props.courseState.postPayment && !prevProps.courseState.postPayment) {
            if (this.props.courseState.postPayment.code === "JH200") {
                if(this.state.pay === 1){
                    this.setState({ showPayBtn: false })
                    window.open(this.props.courseState.postPayment.result.payUtl, "_blank");
                }
                if(this.state.invoice === 1){
                    this.setState({ showInvoiceBtn: false })
                    window.open(this.props.courseState.postPayment.result.invoiceUrl, "_blank");
                }
            } else {
                message.error('链接失效，请稍后再试。' + this.props.courseState.postPayment.code);
                this.setState({ pay: 0, invoice: 0 });
            }
            this.props.actions.updatePayment(null)
        }
    }

    gridStyle = {
        width: '100%',
        textAlign: 'left',
    };

    onChangeCheckBox = (e) => {
        this.setState({ signatureAgreementChecked: e.target.checked })
    }

    onClickCommentPage = () => {
        this.props.history.push(`/classcommentpage?classID=${this.props.course.classID}`);
    };

    onSubmitSignature = () => {
        if (this.sigCanvas.isEmpty()) {
            message.error('请正确签名。')
            return;
        }
        const imgData = this.sigCanvas.toDataURL();

        this.props.actions.postSignature({
            upID: "student_letter_signature", //固定内容
            username: this.props.course.ID, //P7. getStudentCourseList.ID
            currUser: this.props.application.username, //当前用户身份证
            imgData
        })
    }

    onClickSignature = () => {
        if (!this.state.signatureAgreementChecked) {
            message.warn('请阅读并勾选同意承诺书')
            return;
        }
        this.setState({ signatureModalVisible: true });
    }

    onClickPay = () => {
        this.props.actions.postPayment({
            enterID: this.props.course.ID, //P7. getStudentCourseList.ID
            kindID: 0   //支付
        })
        this.setState({ pay: 1 });
    }

    onClickInvoice = () => {
        this.props.actions.postPayment({
            enterID: this.props.course.ID, //P7. getStudentCourseList.ID
            kindID: 2   //开票
        })
        this.setState({ invoice: 1 });
    }

    onClickPayNow = () => {
        this.setState({ showPayURL: false })
        window.open(this.props.courseState.postPayment.result.payUtl, "_blank");
    }

    render() {
        const { course } = this.props
        const { lessons } = this.props

        return (
            <Row key={course.lessonID} gutter={[16, 32]}>
                <Modal title="请在下面空白处签名" visible={this.state.signatureModalVisible} footer={[<Button onClick={() => { this.sigCanvas.clear(); this.setState({ signatureModalVisible: false }); }}>取消</Button>, <Button type='primary' onClick={this.onSubmitSignature}>提交签名</Button>]}>
                    <SignatureCanvas penColor='black' minWidth={0.7}
                        canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }} ref={(ref) => { this.sigCanvas = ref }} />
                </Modal>
                <Col span={24}>
                    <Card title={course.courseName + [course.re !== 0 ? '(' + course.reexamineName + ')' : null]} style={{ textAlign: 'left' }} extra={<div>{[course.type === 0 ? <span style={{ color: 'red' }}>{course.checkName}&nbsp;</span> : null]} <a>{course.statusName}</a></div>}>{
                        course.status < 2 ? <Card.Grid style={this.gridStyle}>
                            {course.completion ? <Progress percent={course.completion} size="small" /> : null}<p>时长：{course.hours}</p>
                            <p>开始日期：{course.startDate}</p>
                            <p>结束日期：{course.endDate}</p>
                            <p>完成条件：{course.pass_condition}</p>
                            {!this.props.application.teacher ? <Button type='primary' onClick={() => this.onClickCommentPage()}>课程答疑</Button> : null}
                        </Card.Grid> : null}
                        {course.signatureType === 1 && course.signature === "" ? <Card.Grid style={this.gridStyle}><Checkbox onChange={this.onChangeCheckBox}></Checkbox>
                        <text>&nbsp;&nbsp;已阅读</text>
                            <Popover placement="top" title={<span>承诺书及签字说明</span>} content={<div>
                                <p>1. 如实填写报名表内容</p>
                                <p>2. 遵守学校的各项规定</p>
                                <p>3. 电子签名与手写签名具有同等效力</p>
                                <p>4. 电子签名将会用在报名表、承诺书、复印材料的确认等处</p>
                            </div>} trigger="click">
                                <a>培训承诺书</a>
                            </Popover>&nbsp;&nbsp;&nbsp;&nbsp;<Button type='primary' onClick={this.onClickSignature} >签名</Button></Card.Grid> : null}
                        {course.regDate >= "2024-06-13" && this.state.showPayBtn && this.state.pay === 0 && course.payNow === 0 && course.pay_status === 0 ? <Card.Grid style={this.gridStyle}>
                            <Button type='primary' onClick={this.onClickPay} >付款</Button></Card.Grid> : null}
                        {this.state.showPayURL ? <Card.Grid style={this.gridStyle}>
                            <Button type='primary' onClick={this.onClickPayNow} >微信支付</Button></Card.Grid> : null}
                        {course.regDate >= "2024-06-13" && this.state.showInvoiceBtn && this.state.invoice === 0 && course.autoPay === 1 && course.pay_status === 1 && course.invoice === "" ? <Card.Grid style={this.gridStyle}>
                            <Button type='primary' onClick={this.onClickInvoice} >开发票</Button></Card.Grid> : null}
                        {course.status < 2 && (course.signatureType === 0 || course.signature > "") ? <Card.Grid style={this.gridStyle}>
                            <b>课程内容</b>
                            <p> </p>
                            <ul style={{ textAlign: 'left', margin: 0, padding: 0 }}>
                                {lessons.filter(lesson => lesson.refID === course.ID).map((lesson, index) => (
                                    <li style={{ listStyleType: 'none', clear: 'both' }} key={lesson.ID}>
                                        <p style={{ float: 'left' }}>
                                            <a onClick={() => this.onClick(lesson)}>{index + 1}. {lesson.lessonName}&nbsp;&nbsp;</a>
                                            <span style={{ color: 'lightgray' }}>{lesson.completion}%</span>
                                        </p>

                                    </li>
                                ))}
                                <li key={999} style={{ listStyleType: 'none', clear: 'both' }}>
                                    <span style={{ color: 'lightgray' }}>{course.examTimes}次</span>
                                    <span>{course.type === 0 ? '模拟考试' : '考试'}</span>
                                    <ul style={{ textAlign: 'left', margin: 0, padding: 0 }}>
                                        {
                                            course.paperID !== null && course.paperID !== '' ? JSON.parse(course.paperID)
                                                .map(singlePaperID => (
                                                    <li key={singlePaperID.paperID} style={{ listStyleType: 'none', clear: 'both' }}>
                                                        <p style={{ float: 'left' }}>
                                                            <a onClick={() => this.onClickExam(singlePaperID.paperID)}>*&nbsp;&nbsp;{singlePaperID.item}&nbsp;&nbsp;&nbsp;</a><span style={{ color: 'lightgray' }}>
                                                                {singlePaperID.examScore}分&nbsp;&nbsp;</span>
                                                        </p>
                                                    </li>
                                                ))
                                                : null}
                                    </ul>
                                </li>
                                {/* {course.paperID !== null && course.paperID !== '' ? <li key={999} style={{ listStyleType: 'none', clear: 'both' }}>
                                    <p style={{ float: 'left' }}>
                                        <a onClick={() => this.onClickExam(course)}>*&nbsp;&nbsp;{course.type === 0 ? '模拟考试' : '考试'}&nbsp;&nbsp;&nbsp;</a><span style={{ color: 'lightgray' }}>
                                            {course.examScore}分&nbsp;&nbsp;</span>
                                        <span style={{ color: 'lightgray' }}>{course.examTimes}次</span>
                                    </p>
                                </li> : null} */}
                            </ul>

                        </Card.Grid> : null}


                    </Card>
                </Col>
            </Row >
        )
    }
}



export default withRouter(LessonCard)
