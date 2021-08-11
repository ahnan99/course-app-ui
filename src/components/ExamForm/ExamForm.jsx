import React, { Component } from 'react'
import { Form, Input, Button, Radio, message, Checkbox, Spin, Alert, Affix, Row, Col, Image } from 'antd'
import moment from 'moment'
import './ExamForm.css'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
class ExamForm extends Component {
    formRef = React.createRef()

    state = { time: 0, loading: false }


    onValuesChange = (changedValue, values) => {
        if (this.props.exam.exam && this.props.exam.exam[0] && this.props.exam.exam[0].status !== 2) {
            for (var key in changedValue) {
                if (Array.isArray(changedValue[key])) {
                    var aggre = ''
                    for (var i = 0; i < changedValue[key].length; i++) {
                        aggre += changedValue[key][i]
                    }
                    this.props.actions.postSingleQuestion({ ID: key, answer: aggre })
                } else {
                    this.props.actions.postSingleQuestion({ ID: key, answer: changedValue[key] })
                }
            }
        }
    }

    toInitialValues = questions => {
        if (questions) {
            const res = {}
            for (var i = 0; i < questions.length; i++) {
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
            return res
        }
    }

    onFinish = values => {
        if (this.props.exam.exam[0].status === 2) {
            this.props.actions.updateExamQuestion(null)
            this.props.actions.getExamQuestion({ paperID: this.props.exam.exam[0].paperID, mark: 1 })
        } else {
            this.props.actions.postExam({ paperID: this.props.exam.exam[0].paperID })
            this.setState({ loading: true })
        }
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            if (this.state.time > 0 && this.props.exam.exam && this.props.exam.exam[0].status !== 2) {
                const { time } = this.state

                if (this.state.time === 0) {
                    this.onFinish()
                }
                this.props.actions.postTime({ paperID: this.props.exam.exam[0].paperID, secondRest: this.state.time })
            }
        }, 5000)    //exam submission Interval

        this.timer2 = setInterval(() => {
            this.setState({ time: this.state.time - 1 })
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
        if (!prevProps.exam.exam && this.props.exam.exam) {
            this.setState({ time: this.props.exam.exam[0].secondRest })
        }
        if (this.props.exam.postExamRes) {
            if (this.props.exam.exam[0].kind === 0) {
                this.props.actions.getExam({ paperID: this.props.exam.exam[0].paperID })
                this.props.actions.getExamQuestion({ paperID: this.props.exam.exam[0].paperID })
            }
            message.success('提交成功')
            this.setState({ loading: false })
            this.props.actions.updatePostExam(null)
            this.props.actions.updateLeave(true)
            if (this.props.exam.exam[0].kind === 1){
                this.props.history.push('/homepage')
            }
            
        }
        if (this.props.exam.exam && this.props.exam.examQuestion && prevProps.exam.examQuestion === null) {
            this.props.actions.getExam({ paperID: this.props.exam.exam[0].paperID })
        }
        if (prevProps.exam.exam && this.props.exam.exam && prevProps.exam.exam !== this.props.exam.exam) {
            this.setState({ time: this.props.exam.exam[0].secondRest })
        }

    }

    render() {
        if (!this.props.exam.examQuestion || !this.props.exam.exam) {
            return (<div style={{ height: '100vh', verticalAlign: 'middle', lineHeight: '100vh' }}><Spin spinning></Spin></div>)
        }
        return (<Form
            name="exam_form"
            className="login-form"
            initialValues={this.props.exam.examQuestion ? this.toInitialValues(this.props.exam.examQuestion) : null}
            onFinish={this.onFinish}
            {...layout}
            layout={"vertical"}
            ref={this.formRef}
            onValuesChange={this.onValuesChange}
        >
            <Affix offsetTop={10}>
                <div className='alert-container'>
                    <Form.Item>
                        <Row gutter={4} style={{ textAlign: 'center' }}>
                            <Col span={10}><Alert message={this.props.exam.exam[0].status === 2 ? '得分: ' + this.props.exam.exam[0].score : '' + moment.utc(this.state.time * 1000).format("H:mm:ss")} type='info' /></Col>
                            <Col span={7}><Button style={{ height: '100%' }} type="primary" htmlType="submit" loading={this.state.loading}>{this.props.exam.exam[0].status !== 2 ? '交卷' : '重新开始'}</Button></Col>
                            {this.props.exam.leave ? <Col span={7}><Button style={{ height: '100%' }} onClick={() => this.leave()}>离开</Button></Col> : null}
                        </Row>
                    </Form.Item>
                </div>
            </Affix>
            <p> </p>
            <div>

                {
                    this.props.exam.examQuestion.map((question, index) => (
                        <Form.Item style={{ textAlign: 'left' }}
                            name={question.ID}
                            key={question.ID}
                            label={
                                <div>
                                    <span>{(index + 1) + '. ' + question.questionName + '(' + question.scorePer + '分' + ')'}{question.image !== '' ? <Image src={axios.defaults.baseURL + question.image} /> : null}</span>
                                    &nbsp;<span>{this.props.exam.exam[0].status === 2 && question.score > 0 ? <CheckOutlined style={question.score > 0 ? { color: 'green' } : { color: 'red' }} /> : null}{this.props.exam.exam[0].status === 2 && question.score === 0 ? <CloseOutlined style={question.score > 1 ? { color: 'green' } : { color: 'red' }} /> : null}</span>
                                    &nbsp;<span>{this.props.exam.exam[0].status === 2 ? '正确答案: ' + question.answer : null}</span>
                                </div>
                            }>
                            {
                                question.kindID !== 2 ?
                                    <Radio.Group>
                                        <Row>{question.A !== '' || question.imageA !== '' ? <Radio key={question.ID + 'A'} value='A'>{'A. ' + question.A}</Radio> : null}{question.imageA !== '' ? <Image src={axios.defaults.baseURL + question.imageA} /> : null}</Row>
                                        <Row>{question.B !== '' || question.imageB !== '' ? <Radio key={question.ID + 'B'} value='B'>{'B. ' + question.B}</Radio> : null}{question.imageB !== '' ? <Image src={axios.defaults.baseURL + question.imageB} /> : null}</Row>
                                        <Row>{question.C !== '' || question.imageC !== '' ? <Radio key={question.ID + 'C'} value='C'>{'C. ' + question.C}</Radio> : null}{question.imageC !== '' ? <Image src={axios.defaults.baseURL + question.imageC} /> : null}</Row>
                                        <Row>{question.D !== '' || question.imageD !== '' ? <Radio key={question.ID + 'D'} value='D'>{'D. ' + question.D}</Radio> : null}{question.imageD !== '' ? <Image src={axios.defaults.baseURL + question.imageD} /> : null}</Row>
                                        <Row>{question.E !== '' || question.imageE !== '' ? <Radio key={question.ID + 'E'} value='E'>{'E. ' + question.E}</Radio> : null}{question.imageE !== '' ? <Image src={axios.defaults.baseURL + question.imageE} /> : null}</Row>
                                        <Row>{question.F !== '' || question.imageF !== '' ? <Radio key={question.ID + 'F'} value='F'>{'F. ' + question.F}</Radio> : null}{question.imageF !== '' ? <Image src={axios.defaults.baseURL + question.imageF} /> : null}</Row>
                                        {/* <Row>{question.C !== '' || question.imageC !== '' ? <Radio key={question.ID + 'C'} value='C'>{'C. ' + question.C + question.imageC !== '' ? <Image src={question.imageC} /> : null}</Radio> : null}</Row>
                                        <Row>{question.D !== '' || question.imageD !== '' ? <Radio key={question.ID + 'D'} value='D'>{'D. ' + question.D + question.imageD !== '' ? <Image src={question.imageD} /> : null}</Radio> : null}</Row>
                                        <Row>{question.E !== '' || question.imageE !== '' ? <Radio key={question.ID + 'E'} value='E'>{'E. ' + question.E + question.imageE !== '' ? <Image src={question.imageE} /> : null}</Radio> : null}</Row>
                                        <Row>{question.F !== '' || question.imageF !== '' ? <Radio key={question.ID + 'F'} value='F'>{'F. ' + question.F + question.imageF !== '' ? <Image src={question.imageF} /> : null}</Radio> : null}</Row> */}
                                    </Radio.Group> :
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
                    ))
                }


            </div>
        </Form>
        )
    }
}
export default withRouter(ExamForm)