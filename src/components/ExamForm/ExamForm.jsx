import React, { Component } from 'react'
import { Form, Button, Radio, message, Checkbox, Spin, Alert, Affix, Row, Col, Image, Space, Modal, Pagination, InputNumber } from 'antd'
import moment from 'moment'
import './ExamForm.css'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const font = '1.2em'
const font1 = '1.5em'
const pageSize = 20;
// const [form] = Form.useForm();

class ExamForm extends Component {
    formRef = React.createRef()
    // form = Form.useForm();

    state = {
        time: 0,
        loading: false,
        buttonDisabled: false,
        submitBtnDisable: true,
        submitConfirmVisible: false,
        showMsg: false,
        currQID: 0,
        answer: false,
        myAnswer: null,
        numPages: null,
        pageNumber: 0,
        currQuestion: null,
        readSec: 3,
        page: 1,
        goPage: 0,
        loadExam: 0,
        showAnswer: false,
        getQuestion: true,
        showQuestion: 0,
        answerQty: this.props.exam.exam[0].answerQty || 0
    }


    onValuesChange = (changedValue, values) => {
        // if (this.props.exam.exam && this.props.exam.exam[0] && this.props.exam.exam[0].status !== 2) {
        //     for (var key in changedValue) {
        //         if (Array.isArray(changedValue[key])) {
        //             var aggre = ''
        //             for (var i = 0; i < changedValue[key].length; i++) {
        //                 aggre += changedValue[key][i]
        //             }
        //             this.props.actions.postSingleQuestion({ ID: key, answer: aggre })
        //         } else {
        //             this.props.actions.postSingleQuestion({ ID: key, answer: changedValue[key] })
        //         }
        //     }
        // }
        
        if (this.props.exam.exam[0].pkind === 0) {  // 考试
            if (this.props.exam.exam && this.props.exam.exam[0] && this.props.exam.exam[0].status !== 2) {// && this.props.exam.exam[0].pkind !== 2
                let myAnswer = ""
                for (let key in changedValue) {
                    if (Array.isArray(changedValue[key])) {
                        let aggre = ''
                        for (let i = 0; i < changedValue[key].length; i++) {
                            aggre += changedValue[key][i]
                        }
                        myAnswer = this.answerSort(aggre)
                        aggre = myAnswer
                        this.props.actions.postSingleQuestion({ ID: key, answer: aggre, pkind: this.props.exam.exam[0].pkind })
                    } else {
                        this.props.actions.postSingleQuestion({ ID: key, answer: changedValue[key], pkind: this.props.exam.exam[0].pkind })
                        myAnswer = changedValue[key]
                    }
                }
                this.setState({ answer: true, myAnswer: myAnswer })
            }
        } else {
            // 总题库，错题集，收藏夹
            let myAnswer = ""
            for (let key in changedValue) {
                if (Array.isArray(changedValue[key])) {
                    let aggre = ''
                    for (let i = 0; i < changedValue[key].length; i++) {
                        aggre += changedValue[key][i]
                    }
                    myAnswer = this.answerSort(aggre)
                } else {
                    myAnswer = changedValue[key]
                }
            }
            this.setState({ myAnswer: myAnswer })
        }
    }

    toInitialValues = questions => {
        if (questions) {
            const res = {}
            for (let i = 0; i < questions.length; i++) {
                const question = questions[i]
                if (question.myAnswer && question.myAnswer !== '') {
                    if (question.kindID !== 2) {
                        res[question.ID] = question.myAnswer
                    } else {
                        res[question.ID] = Array.from(question.myAnswer)
                    }
                } else {
                    res[question.ID] = null
                }

            }
            // console.log("res:",questions,res);
            this.setState({ getQuestion: false, showQuestion: 1 })
            return res
        }
    }

    onFinish = values => {
        if (this.props.exam.exam[0].status === 2) {
            this.props.actions.updateExamQuestion(null)
            // this.props.actions.getExamQuestion({ paperID: this.props.exam.exam[0].paperID, mark: 1 })
            this.props.actions.getExamQuestion({ paperID: this.props.exam.exam[0].paperID, mark: 1, pkind: 0, examID: this.props.exam.exam[0].examID, kind: this.props.exam.exam[0].kind1, page: 1, pageSize, s: 1 })
            this.setState({ getQuestion: true })
        } else {
            this.props.actions.postExam({ paperID: this.props.exam.exam[0].paperID })
            this.setState({ loading: true })
        }
        this.setState({ submitConfirmVisible: false, submitBtnDisable: true, readSec: 3 });
    }

    onClickCancel = () => {
        this.setState({ submitConfirmVisible: false, submitBtnDisable: true, readSec: 3 });
    }

    onSubmit = () => {
        this.setState({ submitConfirmVisible: true })
        const t1 = setInterval(() => {
            this.setState({ readSec: this.state.readSec - 1 })
        }, 1000)
        setTimeout(() => {
            this.setState({ submitBtnDisable: false })
            clearInterval(t1)
        }, 3000)
    }

    componentDidMount() {
        this.timer = setInterval(() => {

            if (this.state.time > 0 && this.props.exam.exam && this.props.exam.exam[0].pkind === 0 && this.props.exam.exam[0].status !== 2) {
                const { time } = this.state


                this.props.actions.postTime({ paperID: this.props.exam.exam[0].paperID, secondRest: this.state.time })
            }
        }, 5000)    //exam submission Interval

        this.timer2 = setInterval(() => {
            if (this.state.time > 0 && this.props.exam.exam && this.props.exam.exam[0].pkind === 0 && this.props.exam.exam[0].status !== 2) {
                this.setState({ time: this.state.time - 1 })
                if (this.state.time === 1 && this.props.exam.exam[0].kind === 1) {
                    this.onFinish({})
                }
            }
        }, 1000)
    }

    leave = () => {
        this.props.actions.updateLeave(true)
        this.props.history.push('/homepage')
    }

    componentWillUnmount() {
        this.props.actions.updateExam(null)
        this.props.actions.updateExamQuestion(null)
        clearInterval(this.timer)
        clearInterval(this.timer2)
    }

    componentDidUpdate = prevProps => {
        if (this.props.exam.postTimeRes) {
            if (this.props.exam.postTimeRes.status === 1) {
                this.onFinish({})
                this.props.actions.updatePostTime(null)
            } else if (this.props.exam.postTimeRes.secondRest !== 0) {
                this.setState({ time: this.props.exam.postTimeRes.secondRest })
                this.props.actions.updatePostTime(null)
            }
        }
        if (!prevProps.exam.exam && this.props.exam.exam) {
            this.setState({ time: this.props.exam.exam[0].secondRest })
        }
        if (this.props.exam.postExamRes) {
            if (this.props.exam.exam[0].kind === 0) {
                this.props.actions.getExam({ paperID: this.props.exam.exam[0].paperID, pkind: this.props.exam.exam[0].pkind, examID: '', username: this.props.exam.exam[0].username, kind: this.props.exam.exam[0].kind1 })
                // this.props.actions.getExamQuestion({ paperID: this.props.exam.exam[0].paperID })
                this.props.actions.getExamQuestion({ paperID: this.props.exam.exam[0].paperID, pkind: this.props.exam.exam[0].pkind, examID: '', kind: this.props.exam.exam[0].kind1, page: this.state.page, pageSize, s: 3 })
                this.setState({ getQuestion: true })
            }
            message.success('提交成功')
            setTimeout(() => { this.setState({ loading: false }) }, 3000);
            this.props.actions.updatePostExam(null)
            this.props.actions.updateLeave(true)
            if (this.props.exam.exam[0].kind === 1) {
                this.props.history.push('/homepage')
            }
        }
        if (this.props.exam.exam && this.props.exam.examQuestion && prevProps.exam.examQuestion === null) {
            this.props.actions.getExam({ paperID: this.props.exam.exam[0].paperID, pkind: this.props.exam.exam[0].pkind, examID: this.props.exam.exam[0].examID, username: this.props.exam.exam[0].username, kind: this.props.exam.exam[0].kind1 })
        }
        if (prevProps.exam.exam && this.props.exam.exam && prevProps.exam.exam !== this.props.exam.exam) {
            this.setState({ time: this.props.exam.exam[0].secondRest })
        }
        if (this.props.exam.postSingleQuestionRes && this.props.exam.exam[0].pkind === 0) {
            this.setState({ answerQty: this.props.exam.postSingleQuestionRes.answerQty })
            this.props.actions.updatePostSingleQuestion(null)
        }
        if (this.props.exam.exam[0].pkind > 0 && prevProps.exam.examQuestion === null && this.props.exam.examQuestion) {
            let p = (this.props.exam.exam[0].lastNum >= this.props.exam.examQuestion.length ? this.props.exam.examQuestion.length - 1 : this.props.exam.exam[0].lastNum<0?0:this.props.exam.exam[0].lastNum) || 0;
            this.setState({ currQuestion: this.props.exam.examQuestion[p], numPages: this.props.exam.examQuestion.length, pageNumber: p }, () => { })
        }
        if (this.getQuestion) {  //20250926
            let vs = toInitialValues(this.props.exam.examQuestion);
            console.log("setFieldsValue:", vs);
            this.formRef.current.setFieldsValue(vs);
            this.setState({ getQuestion: false});
            // this.props.actions.updateExamQuestion(null)
        }
    }

    showAnswer = () => {
        this.setState({ showAnswer: true });
    }

    onPageChange = (page) => {
        this.props.actions.getExamQuestion({ paperID: this.props.exam.exam[0].paperID, pkind: this.props.exam.exam[0].pkind, examID: '', kind: this.props.exam.exam[0].kind1, page, pageSize, s: 2 });
        this.setState({ getQuestion: true });
        this.setState({ page });
    }

    onChangeGoPage = (value) => {
        // this.setState({ pageNumber: value - 1 });
        const { numPages } = this.state
        let p = (value || 1) - 1
        if (p > numPages - 1) {
            p = numPages - 1;
        }
        this.setState({ pageNumber: p }, () => {
            this.setState({ answer: false, myAnswer: null, currQuestion: this.props.exam.examQuestion[p], showAnswer: false })
        })
        this.props.actions.postTotalExamNum({ num: p, username: this.props.exam.exam[0].username, examID: (this.props.exam.exam[0].kind1 === '4' ? this.props.exam.exam[0].paperID : this.props.exam.exam[0].examID), kind: this.props.exam.exam[0].kind1 })
    };

    previousPage = () => {
        const { pageNumber } = this.state
        let p = 0
        if (pageNumber > 0) {
            this.setState({ pageNumber: pageNumber - 1 }, () => {
                this.setState({ answer: false, myAnswer: null, currQuestion: this.props.exam.examQuestion[pageNumber - 1], showAnswer: false })
            })
            p = pageNumber - 1
        }
        this.props.actions.postTotalExamNum({ num: p, username: this.props.exam.exam[0].username, examID: (this.props.exam.exam[0].kind1 === '4' ? this.props.exam.exam[0].paperID : this.props.exam.exam[0].examID), kind: this.props.exam.exam[0].kind1 })
    }

    nextPage = () => {
        const { pageNumber, numPages } = this.state
        let p = pageNumber
        if (pageNumber < numPages - 1) {
            this.setState({ pageNumber: pageNumber + 1 }, () => {
                this.setState({ answer: false, myAnswer: null, currQuestion: this.props.exam.examQuestion[pageNumber + 1], showAnswer: false })
            })
            p = pageNumber + 1
        }
        if (p > 0) {    //防止意外导致当前页数数据丢失
            this.props.actions.postTotalExamNum({ num: p, username: this.props.exam.exam[0].username, examID: (this.props.exam.exam[0].kind1 === '4' ? this.props.exam.exam[0].paperID : this.props.exam.exam[0].examID), kind: this.props.exam.exam[0].kind1 })
        }
    }

    firstPage = () => {
        const { pageNumber, numPages } = this.state
        let p = 0
        this.setState({ pageNumber: 0 }, () => {
            this.setState({ answer: false, myAnswer: null, currQuestion: this.props.exam.examQuestion[0], showAnswer: false })
        })
        this.props.actions.postTotalExamNum({ num: p, username: this.props.exam.exam[0].username, examID: (this.props.exam.exam[0].kind1 === '4' ? this.props.exam.exam[0].paperID : this.props.exam.exam[0].examID), kind: this.props.exam.exam[0].kind1 })
    }

    answerSort = (str) => {
        const arr = str.split(''); //将字符串转换成数组
        arr.sort(); //对数组进行排序
        return arr.join(''); //将数组转换回字符串
    }

    setFavorite = (enterID, questionID, mark) => {
        const { pageNumber, numPages } = this.state
        this.props.actions.setFavorite({ enterID, questionID, mark });
        message.success(mark === 0 ? '已添加到收藏夹' : '已取消收藏');
        if (mark === 1) {
            //取消收藏后，将该题目从当前列表中删除，向后翻页。
            this.props.exam.examQuestion.splice(pageNumber, 1);
            this.setState({ numPages: numPages - 1, answer: false, myAnswer: null })
            if (pageNumber < numPages - 1) {
                this.setState({ currQuestion: this.props.exam.examQuestion[pageNumber] })
            }
        }
    }

    render() {
        if (!this.props.exam.examQuestion || !this.props.exam.exam) {
            return (<div style={{ height: '100vh', verticalAlign: 'middle', lineHeight: '100vh' }}><Spin spinning></Spin></div>)
        }
        return (<Form
            // form = {this.form}
            // form = {form}
            name="exam_form"
            className="login-form"
            // initialValues={this.state.getQuestion && this.props.exam.examQuestion ? this.toInitialValues(this.props.exam.examQuestion) : null}
            onFinish={this.onFinish}
            {...layout}
            layout={"vertical"}
            ref={this.formRef}
            onValuesChange={this.onValuesChange}
        >
            <Affix offsetTop={10}>
                <div className='alert-container'>
                    {this.props.exam.exam[0].pkind === 0 ?
                        <Form.Item>
                            <Row gutter={4} style={{ textAlign: 'center' }}>
                                <Modal title={[<Button type='primary' onClick={this.onClickCancel}>取消</Button>,
                                // <Button onClick={this.onFinish} htmlType="submit">{this.props.exam.exam[0].status !== 2 ? '交卷' : '重新开始'}</Button>
                                <Button onClick={this.onFinish} htmlType="submit" disabled={this.state.submitBtnDisable}>{(this.state.readSec === 0 ? '' : this.state.readSec) + (this.props.exam.exam[0].status !== 2 ? '交卷' : '重新开始')}</Button>
                                    , <span style={{ color: 'red', paddingLeft: '10px' }}>{this.props.exam.exam[0].status !== 2 ? '确定要交卷吗？' : '确定要重新开始吗？'}</span>
                                ]} visible={this.state.submitConfirmVisible} footer={[]}>
                                </Modal>
                                <Col span={10}><Alert message={this.props.exam.exam[0].status === 2 ? '得分: ' + this.props.exam.exam[0].score : '' + moment.utc(this.state.time * 1000).format("H:mm:ss")} type='info' /></Col>
                                <Col span={7}><Button style={{ height: '100%' }} type="primary" htmlType="submit" loading={this.state.loading}>{this.props.exam.exam[0].status !== 2 ? '交卷' : '重新开始'}</Button></Col>
                                {this.props.exam.leave ? <Col span={7}><Button style={{ height: '100%' }} onClick={() => this.leave()}>离开</Button></Col> : null}
                            </Row>
                        </Form.Item>
                        : null}
                </div>
            </Affix>
            <p> </p>
            <div>

                {this.props.exam.exam[0].pkind === 0 ?
                    <div>
                        {this.props.exam.examQuestion.map((question, index) => (
                            <div><Form.Item style={{ textAlign: 'left' }}
                                name={question.ID}
                                key={question.ID}
                                label={
                                    <div>
                                        <span dangerouslySetInnerHTML={{ __html: ((this.state.page - 1) * pageSize + index + 1) + '. ' + '(' + question.kindName + '题 ' + question.scorePer + '分)' + question.questionName }} /><span>{question.image !== '' ? <Image src={axios.defaults.baseURL + question.image} /> : null}</span>
                                        &nbsp;<span>{this.props.exam.exam[0].status === 2 && question.score > 0 ? <CheckOutlined style={question.score > 0 ? { color: 'green' } : { color: 'red' }} /> : null}{this.props.exam.exam[0].status === 2 && question.score === 0 ? <CloseOutlined style={question.score > 1 ? { color: 'green' } : { color: 'red' }} /> : null}</span>
                                        &nbsp;<span style={{ color: 'orange' }}>{this.props.exam.exam[0].status === 2 ? '正确答案: ' + question.answer : null}</span>
                                        &nbsp;&nbsp;<Button type="primary" size="small" shape="round" style={{ height: '80%' }} onClick={() => this.setFavorite(this.props.exam.exam[0].refID, question.questionID, 0)}><span style={{ fontSize: '1em' }}>{(this.props.exam.exam[0].pkind === 3 ? '取消收藏' : '收藏此题')}</span></Button>
                                    </div>
                                }>
                                    {question.kindID !== 2 ?
                                        // <Radio.Group value={question.myAnswer}>
                                        <Radio.Group>
                                            <Row>{question.A !== '' || question.imageA !== '' ? <Radio key={question.ID + 'A'} value='A'>{'A. ' + question.A}</Radio> : null}{question.imageA !== '' ? <Image src={axios.defaults.baseURL + question.imageA} /> : null}</Row>
                                            <Row>{question.B !== '' || question.imageB !== '' ? <Radio key={question.ID + 'B'} value='B'>{'B. ' + question.B}</Radio> : null}{question.imageB !== '' ? <Image src={axios.defaults.baseURL + question.imageB} /> : null}</Row>
                                            <Row>{question.C !== '' || question.imageC !== '' ? <Radio key={question.ID + 'C'} value='C'>{'C. ' + question.C}</Radio> : null}{question.imageC !== '' ? <Image src={axios.defaults.baseURL + question.imageC} /> : null}</Row>
                                            <Row>{question.D !== '' || question.imageD !== '' ? <Radio key={question.ID + 'D'} value='D'>{'D. ' + question.D}</Radio> : null}{question.imageD !== '' ? <Image src={axios.defaults.baseURL + question.imageD} /> : null}</Row>
                                            <Row>{question.E !== '' || question.imageE !== '' ? <Radio key={question.ID + 'E'} value='E'>{'E. ' + question.E}</Radio> : null}{question.imageE !== '' ? <Image src={axios.defaults.baseURL + question.imageE} /> : null}</Row>
                                            <Row>{question.F !== '' || question.imageF !== '' ? <Radio key={question.ID + 'F'} value='F'>{'F. ' + question.F}</Radio> : null}{question.imageF !== '' ? <Image src={axios.defaults.baseURL + question.imageF} /> : null}</Row>
                                        </Radio.Group> :
                                        // <Checkbox.Group value={question.myAnswer?Array.from(question.myAnswer):null}>
                                        <Checkbox.Group>
                                            <Row>{question.A !== '' || question.imageA !== '' ? <Checkbox key={question.ID + 'A'} value='A'>{'A. ' + question.A}</Checkbox> : null}{question.imageA !== '' ? <Image src={axios.defaults.baseURL + question.imageA} /> : null}</Row>
                                            <Row>{question.B !== '' || question.imageB !== '' ? <Checkbox key={question.ID + 'B'} value='B'>{'B. ' + question.B}</Checkbox> : null}{question.imageB !== '' ? <Image src={axios.defaults.baseURL + question.imageB} /> : null}</Row>
                                            <Row>{question.C !== '' || question.imageC !== '' ? <Checkbox key={question.ID + 'C'} value='C'>{'C. ' + question.C}</Checkbox> : null}{question.imageC !== '' ? <Image src={axios.defaults.baseURL + question.imageC} /> : null}</Row>
                                            <Row>{question.D !== '' || question.imageD !== '' ? <Checkbox key={question.ID + 'D'} value='D'>{'D. ' + question.D}</Checkbox> : null}{question.imageD !== '' ? <Image src={axios.defaults.baseURL + question.imageD} /> : null}</Row>
                                            <Row>{question.E !== '' || question.imageE !== '' ? <Checkbox key={question.ID + 'E'} value='E'>{'E. ' + question.E}</Checkbox> : null}{question.imageE !== '' ? <Image src={axios.defaults.baseURL + question.imageE} /> : null}</Row>
                                            <Row>{question.F !== '' || question.imageF !== '' ? <Checkbox key={question.ID + 'F'} value='F'>{'F. ' + question.F}</Checkbox> : null}{question.imageF !== '' ? <Image src={axios.defaults.baseURL + question.imageF} /> : null}</Row>
                                        </Checkbox.Group>

                                    }
                            </Form.Item>
                                {this.props.exam.exam[0].status === 2 && question.memo > '' ? <div style={{ textAlign: 'left' }}><span style={{ color: 'green', fontSize: '1em' }}>解析: </span><span style={{ color: 'red', fontSize: '1em' }}>{question.memo}</span></div> : null}
                            </div>
                        ))}
                        <hr style={{ margin: '3px 0' }} noshadow="true" />
                        <div style={{ fontSize: font, color: 'red' }}> 共{this.props.exam.exam[0].questionQty || 0}已答{this.state.answerQty}题 翻页查看其它题目</div>
                        <Pagination total={this.props.exam.exam[0].questionQty || 0} current={this.state.page} showTotal={''} itemRender={this.itemRender} pageSize={pageSize} showSizeChanger={false} onChange={this.onPageChange} />
                    </div>
                    :
                    this.state.currQuestion ?
                        <div>
                            <Row style={{ textAlign: 'center', margin: '10px' }}>
                                <Space>
                                    {this.state.currQuestion.ID > 0 ?
                                        <div style={{ margin: '10px' }}><span style={{ fontSize: font }}>共{this.state.numPages}题</span>
                                            &nbsp;<InputNumber addonbefore="跳到" style={{ width: '30%', fontSize: font, margin: '3px' }} addonafter="题" size="small" controls={false} min={1} max={this.state.numPages} defaultValue={1} value={this.state.pageNumber + 1} onChange={this.onChangeGoPage} />
                                            &nbsp;<Button danger size="small" onClick={() => this.firstPage()}><span style={{ fontSize: font }}>重做</span></Button>
                                            <br />{this.state.pageNumber>0?<Button type="primary" onClick={() => this.previousPage()}><span style={{ fontSize: font }}>上一题</span></Button>:null}
                                            &nbsp;{this.state.pageNumber<this.state.numPages-1?<Button type="primary" onClick={() => this.nextPage()}><span style={{ fontSize: font }}>下一题</span></Button>:null}
                                            &nbsp;<Button danger size="small" onClick={() => this.leave()}><span style={{ fontSize: font }}>离开</span></Button></div>
                                        :
                                        <div style={{ margin: '10px' }}><Button danger size="small" onClick={() => this.leave()}><span style={{ fontSize: font }}>离开</span></Button></div>
                                    }
                                </Space>
                            </Row>
                            <div><Form.Item style={{ fontSize: '16px', textAlign: 'left' }}
                                name={this.state.currQuestion.ID}
                                key={this.state.currQuestion.ID}
                                label={
                                    <div>
                                        <div style={{ fontSize: font1 }}>
                                            <span>{(this.state.currQuestion.ID > 0 ? (this.state.pageNumber + 1) + '. ' + '(' + this.state.currQuestion.kindName + '题 ' + ')' : '') + this.state.currQuestion.questionName}{this.state.currQuestion.image !== '' ? <Image src={axios.defaults.baseURL + this.state.currQuestion.image} /> : null}</span>
                                            {/* &nbsp;<span>{this.state.myAnswer ? (this.state.myAnswer === this.state.currQuestion.answer ? <CheckOutlined style={{ color: 'green' }} /> : <CloseOutlined style={{ color: 'red' }} />) : null}</span> */}
                                            &nbsp;<span style={{ color: 'orange' }}>{this.state.showAnswer ? '正确答案: ' + this.state.currQuestion.answer : null}</span>
                                            <div>
                                            {this.state.currQuestion.ID > 0 ? <Button type="primary" size="small" shape="round" style={{ height: '80%', marginLeft: '5px' }} onClick={() => this.setFavorite(this.props.exam.exam[0].paperID, this.state.currQuestion.questionID, (this.props.exam.exam[0].pkind === 3 ? 1 : 0))}><span style={{ fontSize: font }}>{(this.props.exam.exam[0].pkind === 3 ? '取消收藏' : '收藏此题')}</span></Button> : null}
                                            {this.state.showAnswer ? null : <Button type="primary" size="small" shape="round" style={{ height: '80%', marginLeft: '5px' }} onClick={() => this.showAnswer()}><span style={{ fontSize: font }}>答案</span></Button>}
                                            </div>
                                        </div>
                                    </div>
                                }>
                                    {this.state.currQuestion.kindID !== 2 ?
                                        <Radio.Group value=''>
                                            <Row>{this.state.currQuestion.A !== '' || this.state.currQuestion.imageA !== '' ? <Radio key={this.state.currQuestion.ID + 'A'} value='A'><span style={{ fontSize: font1 }} dangerouslySetInnerHTML={{ __html: 'A. ' + this.state.currQuestion.A }} /></Radio> : null}{this.state.currQuestion.imageA !== '' ? <Image src={axios.defaults.baseURL + this.state.currQuestion.imageA} /> : null}</Row>
                                            <Row>{this.state.currQuestion.B !== '' || this.state.currQuestion.imageB !== '' ? <Radio key={this.state.currQuestion.ID + 'B'} value='B'><span style={{ fontSize: font1 }} dangerouslySetInnerHTML={{ __html: 'B. ' + this.state.currQuestion.B }} /></Radio> : null}{this.state.currQuestion.imageB !== '' ? <Image src={axios.defaults.baseURL + this.state.currQuestion.imageB} /> : null}</Row>
                                            <Row>{this.state.currQuestion.C !== '' || this.state.currQuestion.imageC !== '' ? <Radio key={this.state.currQuestion.ID + 'C'} value='C'><span style={{ fontSize: font1 }} dangerouslySetInnerHTML={{ __html: 'C. ' + this.state.currQuestion.C }} /></Radio> : null}{this.state.currQuestion.imageC !== '' ? <Image src={axios.defaults.baseURL + this.state.currQuestion.imageC} /> : null}</Row>
                                            <Row>{this.state.currQuestion.D !== '' || this.state.currQuestion.imageD !== '' ? <Radio key={this.state.currQuestion.ID + 'D'} value='D'><span style={{ fontSize: font1 }} dangerouslySetInnerHTML={{ __html: 'D. ' + this.state.currQuestion.D }} /></Radio> : null}{this.state.currQuestion.imageD !== '' ? <Image src={axios.defaults.baseURL + this.state.currQuestion.imageD} /> : null}</Row>
                                            <Row>{this.state.currQuestion.E !== '' || this.state.currQuestion.imageE !== '' ? <Radio key={this.state.currQuestion.ID + 'E'} value='E'><span style={{ fontSize: font1 }} dangerouslySetInnerHTML={{ __html: 'E. ' + this.state.currQuestion.E }} /></Radio> : null}{this.state.currQuestion.imageE !== '' ? <Image src={axios.defaults.baseURL + this.state.currQuestion.imageE} /> : null}</Row>
                                            <Row>{this.state.currQuestion.F !== '' || this.state.currQuestion.imageF !== '' ? <Radio key={this.state.currQuestion.ID + 'F'} value='F'><span style={{ fontSize: font1 }} dangerouslySetInnerHTML={{ __html: 'F. ' + this.state.currQuestion.F }} /></Radio> : null}{this.state.currQuestion.imageF !== '' ? <Image src={axios.defaults.baseURL + this.state.currQuestion.imageF} /> : null}</Row>
                                        </Radio.Group> :
                                        <Checkbox.Group value=''>
                                            <Row>{this.state.currQuestion.A !== '' || this.state.currQuestion.imageA !== '' ? <Checkbox key={this.state.currQuestion.ID + 'A'} value='A'><span style={{ fontSize: font1 }} dangerouslySetInnerHTML={{ __html: 'A. ' + this.state.currQuestion.A }} /></Checkbox> : null}{this.state.currQuestion.imageA !== '' ? <Image src={axios.defaults.baseURL + this.state.currQuestion.imageA} /> : null}</Row>
                                            <Row>{this.state.currQuestion.B !== '' || this.state.currQuestion.imageB !== '' ? <Checkbox key={this.state.currQuestion.ID + 'B'} value='B'><span style={{ fontSize: font1 }} dangerouslySetInnerHTML={{ __html: 'B. ' + this.state.currQuestion.B }} /></Checkbox> : null}{this.state.currQuestion.imageB !== '' ? <Image src={axios.defaults.baseURL + this.state.currQuestion.imageB} /> : null}</Row>
                                            <Row>{this.state.currQuestion.C !== '' || this.state.currQuestion.imageC !== '' ? <Checkbox key={this.state.currQuestion.ID + 'C'} value='C'><span style={{ fontSize: font1 }} dangerouslySetInnerHTML={{ __html: 'C. ' + this.state.currQuestion.C }} /></Checkbox> : null}{this.state.currQuestion.imageC !== '' ? <Image src={axios.defaults.baseURL + this.state.currQuestion.imageC} /> : null}</Row>
                                            <Row>{this.state.currQuestion.D !== '' || this.state.currQuestion.imageD !== '' ? <Checkbox key={this.state.currQuestion.ID + 'D'} value='D'><span style={{ fontSize: font1 }} dangerouslySetInnerHTML={{ __html: 'D. ' + this.state.currQuestion.D }} /></Checkbox> : null}{this.state.currQuestion.imageD !== '' ? <Image src={axios.defaults.baseURL + this.state.currQuestion.imageD} /> : null}</Row>
                                            <Row>{this.state.currQuestion.E !== '' || this.state.currQuestion.imageE !== '' ? <Checkbox key={this.state.currQuestion.ID + 'E'} value='E'><span style={{ fontSize: font1 }} dangerouslySetInnerHTML={{ __html: 'E. ' + this.state.currQuestion.E }} /></Checkbox> : null}{this.state.currQuestion.imageE !== '' ? <Image src={axios.defaults.baseURL + this.state.currQuestion.imageE} /> : null}</Row>
                                            <Row>{this.state.currQuestion.F !== '' || this.state.currQuestion.imageF !== '' ? <Checkbox key={this.state.currQuestion.ID + 'F'} value='F'><span style={{ fontSize: font1 }} dangerouslySetInnerHTML={{ __html: 'F. ' + this.state.currQuestion.F }} /></Checkbox> : null}{this.state.currQuestion.imageF !== '' ? <Image src={axios.defaults.baseURL + this.state.currQuestion.imageF} /> : null}</Row>
                                        </Checkbox.Group>
                                    }
                            </Form.Item>
                                {this.state.showAnswer && this.state.currQuestion.memo > '' ? <div style={{ textAlign: 'left' }}><span style={{ color: 'green', fontSize: font1 }}>解析: </span><span style={{ color: 'red', fontSize: font1 }}>{this.state.currQuestion.memo}</span></div> : null}
                            </div>
                        </div>
                    : null
                }
            </div>
        </Form>
        )
    }
}
export default withRouter(ExamForm)