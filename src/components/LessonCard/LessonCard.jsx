import React, { Component } from 'react'
import { Card, Row, Col, Progress, message, Button, Checkbox, Modal, Space } from 'antd'
import { withRouter } from 'react-router-dom'
import 'antd/dist/antd.css'
import SignatureCanvas from 'react-signature-canvas'
import axios from 'axios'
import { Document, Page } from 'react-pdf';

// document.addEventListener('visibilitychange', function() { 
//     var isHidden = document.hidden; 
//     if (!isHidden) {
//         window.location.reload() // 强制页面刷新
//     }
// });

class LessonCard extends Component {

    constructor(props) {
        super(props)
        this.divRef = React.createRef()
        this.state = {
            signatureAgreementChecked: false,
            signatureModalVisible: false,
            signatureBtnDisable: true,
            pay: 0,
            invoice: 0,
            showPayBtn: true,
            showInvoiceBtn: true,
            img: null,
            busy: false,
            loading: true,
            numPages: null,
            pageNumber: 2,
            width: 0,
            displaySignature: false,
            readSec: 5,
            showItem: 0,
            questionOption: 0,
            showQuestionOption: false,
            showQuestionOption4: false,
            paperID:0, 
            pkind:0, 
            examID:'', 
            username:'',
            qty1: 0,
            qty2: 0,
            qty3: 0,
            paperItem: '',
            busyGetExamQuestion:1,
            chapterList:[],
            checkWrong: 1
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
    
    onClickOptionCancel = () => {
        this.setState({ showQuestionOption: false, questionOption: 0 });
    }
    
    onClickOptionCancel4 = () => {
        this.setState({ showQuestionOption4: false, questionOption: 0 });
    }
    
    setQuestionOption = (kind) => {
        this.setState({ questionOption: kind, showQuestionOption: false });
        this.state.questionOption = kind;
        this.onClickExam(this.state.paperID, this.state.pkind, this.state.examID, this.state.username, kind, 0, 0, 0, '', []);
    }
    
    setQuestionOption4 = (kind) => {
        this.setState({ questionOption: kind, showQuestionOption4: false });
        this.state.questionOption = kind;
        this.onClickExam(this.state.paperID, this.state.pkind, this.state.examID, this.state.username, kind, 0, 0, 0, '', []);
    }

    onClickExam = (paperID, pkind, examID, username, kind, qty1, qty2, qty3, paperItem, chapterList) => {
        if(pkind ===2 && kind===0){
            this.setState({showQuestionOption:true, paperID, pkind, examID, username, qty1, qty2, qty3, paperItem})
        }else if(pkind ===4 && kind===0){ //pkind=4 章节练习
            this.setState({showQuestionOption4:true, paperID, pkind, examID, username, paperItem, chapterList})
        }else{
            this.props.examActions.updateLeave(true)
            this.props.examActions.getExam({ paperID, pkind, examID, username, kind });
            this.props.examActions.updateBusyGetExamQuestion(1);
            this.setState({ busyGetExamQuestion: 1 });
        }
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
            } else if (this.props.exam.exam[0].allowMockMsg !== "") {
                message.info(this.props.exam.exam[0].allowMockMsg)
            } else if (this.state.busyGetExamQuestion === 1 && this.props.exam.busyGetExamQuestion === 1 && ((this.props.exam.exam[0].pkind !==2 && this.props.exam.exam[0].pkind !==4) || this.state.questionOption>0)) {
                this.props.history.push("/exampage")
                this.props.examActions.getExamQuestion({ paperID: this.props.exam.exam[0].paperID, pkind: this.props.exam.exam[0].pkind, examID:this.props.exam.exam[0].examID, kind: this.state.questionOption, page:1, pageSize:20, onlyWrong:this.state.checkWrong, s:0 })
                this.props.examActions.updateBusyGetExamQuestion(0);
                this.setState({ busyGetExamQuestion: 0 });
            }
        }
        
        if (this.state.busy && this.props.courseState.postSignature && !prevProps.courseState.postSignature) {
            this.setState({ signatureModalVisible: false })
            if (this.props.courseState.postSignature.status === 0) {
                message.success('签名提交成功')
                this.props.actions.getCourseList({ username: this.props.application.username })
            } else {
                message.error('签名提交失败')
            }
            this.setState({ busy: false, displaySignature: false })
            this.sigCanvas.clear()
            this.props.actions.updateSignature(null)
            this.setState({ signatureModalVisible: false })
        }

        if (this.props.courseState.postPayment && !prevProps.courseState.postPayment) {
            if (this.props.courseState.postPayment.code === "JH200") {
                if(this.state.pay === 1){
                    this.setState({ showPayBtn: false });
                    let redirectUrl = this.props.courseState.postPayment.result.payUtl;
                    setTimeout(
                        function(){
                            window.location.href = redirectUrl;
                    }, 0);   
                }
                if(this.state.invoice === 1){
                    this.setState({ showInvoiceBtn: false })
                    let redirectUrl = this.props.courseState.postPayment.result.invoiceUrl;
                    // window.open(this.props.courseState.postPayment.result.invoiceUrl, "_blank");
                    setTimeout(
                        function(){
                            window.location.href = redirectUrl;
                    }, 0);   
                }
            } else {
                message.error('链接失效，请稍后再试。' + this.props.courseState.postPayment.code);
                this.setState({ pay: 0, invoice: 0 });
            }
            this.props.actions.updatePayment(null)
        }
    }

    componentDidMount() {
        if (this.props.courseState.currentLesson) {
            const el = document.getElementById(this.props.courseState.currentLesson.refID);
            if(el){
                el.scrollIntoView();
                this.setState({ showItem: this.props.courseState.currentLesson.refID })
            }
            this.props.actions.updateCurrentLesson(null);
        }
    }

    gridStyle = {
        width: '100%',
        textAlign: 'left',
        backgroundColor: '#FCFCFC'
    };

    onChangeCheckBox = (e) => {
        this.setState({ signatureAgreementChecked: e.target.checked })
    }

    onChangeCheckWrong = (e) => {
        this.setState({ checkWrong: e.target.checked?1:0 })
    }

    onClickCommentPage = () => {
        this.props.history.push(`/classcommentpage?classID=${this.props.course.classID}`);
    };

    onClickNext = () => {
        this.setState({displaySignature: true});
    }

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
        this.setState({ busy: true })
    }

    onClickSignature = () => {
        // if (!this.state.signatureAgreementChecked) {
        //     message.warn('请阅读并勾选同意承诺书')
        //     return;
        // }
        // this.setState({ signatureModalVisible: true });
        this.setState({ width: this.divRef.current.offsetWidth })
        this.setState({ signatureModalVisible: true })
        //此处函数叫匿名函数
        const t1 = setInterval(() => {
            this.setState({ readSec: this.state.readSec - 1 })
        },1000)
        
        setTimeout(() => {
            this.setState({ signatureBtnDisable: false })
            clearInterval(t1)
        },5000)
    }

    previousPage = () => {
        const { pageNumber } = this.state
        if (pageNumber > 1) {
          this.setState({ pageNumber: pageNumber - 1 })
        }
    }
    
    nextPage = () => {
        const { pageNumber, numPages } = this.state
        if (pageNumber < numPages) {
          this.setState({ pageNumber: pageNumber + 1 })
        }
    }
    
    onClickCancel = () => {
        if(this.sigCanvas) {
            this.sigCanvas.clear(); 
        }
        
        this.setState({ signatureModalVisible: false, displaySignature: false, readSec: 5, signatureBtnDisable: true });
    }
    
    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages, loading: false })
    }

    onLoadError = () => {
        message.error('文档载入失败')
        this.setState({ loading: false })
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
    
    onClickShowItem = (courseID) => {
        this.setState({ showItem: (this.state.showItem === 0 ? courseID : 0) })
    }

    render() {
        const { course } = this.props
        const { lessons } = this.props
        const { pageNumber } = this.state

        return (
            <Row key={course.lessonID} gutter={[16, 32]}>
                {/* <Modal title="请在下面空白处签名" visible={this.state.signatureModalVisible} footer={[<Button onClick={() => { this.sigCanvas.clear(); this.setState({ signatureModalVisible: false }); }}>取消</Button>, <Button type='primary' onClick={this.onSubmitSignature}>提交签名</Button>]}>
                    <SignatureCanvas penColor='black' minWidth={0.7}
                        canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }} ref={(ref) => { this.sigCanvas = ref }} />
                </Modal> */}
                <div className="document" style={{ width: "100%" }} ref={this.divRef}>
                <Modal title={[<Button onClick={this.onClickCancel}>取消</Button>, 
                    <Button type='primary' onClick={this.state.displaySignature ? this.onSubmitSignature: this.onClickNext} disabled={this.state.signatureBtnDisable}>{this.state.displaySignature ? '提交签名':'已阅读并同意'}</Button>
                    , <span style={{color:'red', paddingLeft:'10px'}}>{this.state.displaySignature || this.state.readSec === 0 ? null : this.state.readSec + '报名表及培训协议'}</span>, 
                    <span style={{color:'red', paddingLeft:'10px'}}>{this.state.displaySignature ? '请在下面空白处签名' : null}</span>]} visible={this.state.signatureModalVisible} footer={[]}>
                    {this.state.displaySignature ? <div style={{border:'2px solid blue'}}><SignatureCanvas penColor='black' minWidth='0.7'
                        canvasProps={{ width: 500, height: 200, className: 'sigCanvas', contentBg: '#ddd' }} ref={(ref) => { this.sigCanvas = ref }} /></div>:
                    <div>
                        <Button onClick={() => this.previousPage()}>报名表</Button><Button type='primary' onClick={() => this.nextPage()}>培训协议</Button>
                        <Document
                            file={axios.defaults.baseURL + this.props.course.file4}
                            onLoadSuccess={this.onDocumentLoadSuccess}
                            onLoadError={this.onLoadError}
                        ><Page pageNumber={pageNumber} width={this.state.width} onRenderSuccess={this.onRenderSuccess} />
                        </Document>
                    </div>}
                </Modal>
                </div>
                <Col span={24}>
                    <Card title={course.courseName + [course.re !== 0 ? '(' + course.reexamineName + ')' : null]} style={{ textAlign: 'left' }} extra={<div>{course.type === 0 ? <span style={{ color: 'red' }}>{course.checkName}&nbsp;</span> : null}<a>{course.statusName}</a></div>}>{
                        course.status < 2 ? <Card.Grid style={this.gridStyle}>
                            {course.completion ? <Progress percent={course.completion} size="small" /> : null}<p>时长：{course.hours}</p>
                            <p>开始日期：{course.startDate}</p>
                            <p>结束日期：{course.endDate}</p>
                            <p>完成条件：{course.pass_condition}</p>
                            {!this.props.application.teacher ? <Button type='primary' onClick={() => this.onClickCommentPage()}>课程答疑</Button> : null}
                        </Card.Grid> : null}
                        {course.signatureType === 1 && course.signature === "" && course.agencyID !== "5" ? <Card.Grid style={this.gridStyle}>
                            <Button type='primary' onClick={this.onClickSignature} >签名</Button></Card.Grid> : null}
                        {course.regDate >= "2024-06-13" && (this.props.application.userInfo.host==="znxf" || this.props.application.userInfo.host==="spc" || this.props.application.userInfo.host==="shm") && course.agencyID !== "5" && this.state.showPayBtn && this.state.pay == 0 && course.payNow == 0 && course.pay_status === 0 ? <Card.Grid style={this.gridStyle}>
                            <Button type='primary' onClick={this.onClickPay} >付款</Button></Card.Grid> : null}
                        {course.regDate >= "2024-06-13" && this.state.showInvoiceBtn && this.state.invoice === 0 && course.autoPay === 1 && course.pay_status === 1 && course.invoice === "" ? <Card.Grid style={this.gridStyle}>
                            <Button type='primary' onClick={this.onClickInvoice} >开发票</Button></Card.Grid> : null}
                        {this.state.invoice === 1 ? <Card.Grid style={this.gridStyle}><p style={{ color: 'red' }}>将在三个工作日内完成开票，请注意短信通知</p></Card.Grid> : null}
                        {course.status < 2 && (course.signatureType === 0 || course.signature > "") && (course.pre===0 || course.pay_status===1 || course.payNow===1) ? <Card.Grid style={this.gridStyle}>
                            <div style={{padding:'5px'}}>
                                <Button type='primary' onClick={() => this.onClickShowItem(course.ID)} >视频课程</Button>
                            </div>
                            <p> </p>
                            <ul style={{ textAlign: 'left', margin: 0, padding: 0, display:(this.state.showItem===course.ID ? "block" : "none")}}>
                                {lessons.filter(lesson => lesson.refID === course.ID).map((lesson, index) => (
                                    <li style={{ listStyleType: 'none', clear: 'both' }} key={lesson.ID}>
                                        <p style={{ float: 'left' }}>
                                            <a onClick={() => this.onClick(lesson)} id={'x' + lesson.ID}>{index + 1}. {lesson.lessonName}&nbsp;&nbsp;</a>
                                            <span style={{ color: 'lightgray' }}>{lesson.completion}%</span>
                                        </p>

                                    </li>
                                ))}
                            </ul>
                            <ul style={{ textAlign: 'left', margin: 0, padding: 0 }}>
                                <li style={{ listStyleType: 'none', clear: 'both' }}>
                                    <div style={{padding:'5px'}}>
                                    <span>{course.type === 0 ? '模拟考试' : '考试'}</span>
                                    <span style={{ color: 'lightgray', paddingLeft:'1em' }}>{course.examScore || 0}分&nbsp;&nbsp;{course.examTimes}次</span>
                                    </div>
                                    <ul style={{ textAlign: 'left', margin: 0, padding: 0 }}>
                                        {
                                            course.paperID !== null && course.paperID !== '' ? JSON.parse(course.paperID)
                                                .map(singlePaperID => (
                                                    <li key={singlePaperID.paperID + singlePaperID.pkind + singlePaperID.examID} style={{ listStyleType: 'none', clear: 'both' }}>
                                                        <div style={{ padding:'5px' }}>
                                                        <Button type='primary' onClick={() => this.onClickExam(singlePaperID.paperID, singlePaperID.pkind, singlePaperID.examID, course.username, 0, singlePaperID.qty1, singlePaperID.qty2, singlePaperID.qty3, singlePaperID.item, singlePaperID.list)}>{singlePaperID.item}</Button>
                                                        <span style={{ color: 'lightgray', paddingLeft:'10px' }}>{singlePaperID.examScore}&nbsp;&nbsp;</span>
                                                        </div>
                                                    </li>
                                                ))
                                        : null}
                                    </ul>
                                    {this.state.showQuestionOption && <div style={{textAlign:'left', backgroundColor:'#f0f0f0', padding: '30px', width:'70%', boxShadow:'initial'}}><Space direction="vertical" align="left" >
                                        {<div><div style={{ color: 'blue', textAlign:'center', fontSize:'1.2em', width:'100%' }}>{this.state.paperItem}</div><hr style={{margin:'3px 0'}}></hr></div>}
                                        {this.state.qty1>0 && <div><Button shape="round" type='primary' onClick={() => this.setQuestionOption(1)}>单选题</Button><span style={{ color: 'lightgray', paddingLeft:'1em' }}>({this.state.qty1})</span></div>}
                                        {this.state.qty2>0 && <div><Button shape="round" type='primary' onClick={() => this.setQuestionOption(2)}>多选题</Button><span style={{ color: 'lightgray', paddingLeft:'1em' }}>({this.state.qty2})</span></div>}
                                        {this.state.qty3>0 && <div>
                                            <Button shape="round" type='primary' onClick={() => this.setQuestionOption(3)}>判断题</Button>
                                            <span style={{ color: 'lightgray', paddingLeft:'1em' }}>({this.state.qty3})</span>
                                            <span style={{ color: 'lightgray', paddingLeft:'1em' }}><Checkbox key='A' value='只看错题' onChange={this.onChangeCheckWrong} checked={this.state.checkWrong}>只看错题</Checkbox></span>
                                        </div>}
                                        <Button shape="round" onClick={this.onClickOptionCancel}>&nbsp;关&nbsp;&nbsp;闭&nbsp;</Button>
                                    </Space></div>}
                                    {this.state.showQuestionOption4 && <div style={{textAlign:'left', backgroundColor:'#f0f0f0', padding: '30px', width:'70%', boxShadow:'initial'}}><Space direction="vertical" align="left" >
                                        {<div><div style={{ color: 'blue', textAlign:'center', fontSize:'1.2em', width:'100%' }}>{this.state.paperItem}</div><hr style={{margin:'3px 0'}}></hr></div>}
                                        {this.state.chapterList.map(chapter => (
                                            chapter.qty>0 && <div><Button shape="round" type='primary' onClick={() => this.setQuestionOption4(chapter.chapterID)}>{chapter.item}</Button><span style={{ color: 'lightgray', paddingLeft:'1em' }}>({chapter.qty})</span></div>
                                        ))
                                        }
                                        <Button shape="round" onClick={this.onClickOptionCancel4}>&nbsp;关&nbsp;&nbsp;闭&nbsp;</Button>
                                    </Space></div>}
                                </li>
                            </ul>

                        </Card.Grid> : null}


                    </Card>
                </Col>
            </Row >
        )
    }
}



export default withRouter(LessonCard)
