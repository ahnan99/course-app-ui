import React, { Component } from 'react'
import { Form, Input, Button, Radio, message, Checkbox, Spin, Alert, Affix } from 'antd'
import moment from 'moment'
import './ExamForm.css'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
export default class ExamForm extends Component {
    formRef = React.createRef()

    state = { time: 0,loading:false }


    onValuesChange = (changedValue, values) => {
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
                }

            }
            return res
        }
    }

    onFinish = values => {
        if(this.props.exam.exam[0].status === 2){
            this.props.actions.updateExamQuestion(null)
            this.props.actions.getExamQuestion({ paperID: this.props.exam.exam[0].paperID, mark: 1 })
        }else{
            this.props.actions.postExam({ paperID: this.props.exam.exam[0].paperID})
            this.setState({loading:true})
        } 
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            if (this.state.time > 0 && this.props.exam.exam &&this.props.exam.exam[0].status !== 2) {
                const { time } = this.state
                this.setState({ time: time - 1 }, () => {
                    if(this.state.time === 0){
                        this.onFinish()
                    }
                    this.props.actions.postTime({ paperID: this.props.exam.exam[0].paperID, secondRest: this.state.time })
                })
            }
        }, 1000)
    }

    componentWillUnmount() {
        this.props.actions.updateExam(null)
        this.props.actions.updateExamQuestion(null)
        clearInterval(this.timer)
    }

    componentDidUpdate = prevProps => {
        if (!prevProps.exam.exam && this.props.exam.exam) {
            this.setState({ time: this.props.exam.exam[0].secondRest })
        }
        if (this.props.exam.postExamRes) {
            this.props.actions.getExam({ paperID: this.props.exam.exam[0].paperID })
            message.success('提交成功')
            this.setState({loading:false})
            this.props.actions.updatePostExam(null)
        }
        if(this.props.exam.exam && this.props.exam.examQuestion && prevProps.exam.examQuestion === null){
            this.props.actions.getExam({ paperID: this.props.exam.exam[0].paperID })
        }
        if(prevProps.exam.exam && this.props.exam.exam && prevProps.exam.exam !== this.props.exam.exam){
            this.setState({ time: this.props.exam.exam[0].secondRest })
        }
        
    }

    render() {
        if (!this.props.exam.examQuestion || !this.props.exam.exam) {
            return (<div style={{ height: '100vh', verticalAlign: 'middle', lineHeight: '100vh' }}><Spin spinning></Spin></div>)
        }
        return (<div>
            <Affix offsetTop={10}>
                <div className='alert-container'>
                    <Alert message={this.props.exam.exam[0].status === 2?'得分: ' + this.props.exam.exam[0].score:'剩余时间：' + moment.utc(this.state.time * 1000).format("H:mm:ss")} type='info' />
                </div>
            </Affix>
            <p> </p>
            <div>
                <Form
                    name="exam_form"
                    className="login-form"
                    initialValues={this.props.exam.examQuestion ? this.toInitialValues(this.props.exam.examQuestion) : null}
                    onFinish={this.onFinish}
                    {...layout}
                    layout={"vertical"}
                    ref={this.formRef}
                    onValuesChange={this.onValuesChange}
                >
                    {
                        this.props.exam.examQuestion.map((question, index) => (
                            <Form.Item style={{ textAlign: 'left' }}
                                name={question.ID}
                                key={question.ID}
                                label={<span>
                                    <span>{(index + 1) + '. ' + question.questionName + '(' + question.scorePer + '分' + ')'}</span>
                                    &nbsp;<span>{this.props.exam.exam[0].status === 2 && question.score > 0 ? <CheckOutlined style={question.score>1?{color:'green'}:{color:'red'}}/> : null}{this.props.exam.exam[0].status === 2 && question.score === 0 ? <CloseOutlined style={question.score>1?{color:'green'}:{color:'red'}}/> : null}</span>
                                    &nbsp;<span>{this.props.exam.exam[0].status === 2 ? '正确答案: ' + question.answer : null}</span>
                                </span>
                                }>
                                {
                                    question.kindID !== 2 ?
                                        <Radio.Group>
                                            {question.A !== '' ? <Radio key={question.ID + 'A'} value='A'>{'A. ' + question.A}</Radio> : null}
                                            {question.B !== '' ? <Radio key={question.ID + 'B'} value='B'>{'B. ' + question.B}</Radio> : null}
                                            {question.C !== '' ? <Radio key={question.ID + 'C'} value='C'>{'C. ' + question.C}</Radio> : null}
                                            {question.D !== '' ? <Radio key={question.ID + 'D'} value='D'>{'D. ' + question.D}</Radio> : null}
                                            {question.E !== '' ? <Radio key={question.ID + 'E'} value='E'>{'E. ' + question.E}</Radio> : null}
                                        </Radio.Group> :
                                        <Checkbox.Group>
                                            {question.A !== '' ? <Checkbox key={question.ID + 'A'} value='A'>{'A. ' + question.A}</Checkbox> : null}
                                            {question.B !== '' ? <Checkbox key={question.ID + 'B'} value='B'>{'B. ' + question.B}</Checkbox> : null}
                                            {question.C !== '' ? <Checkbox key={question.ID + 'C'} value='C'>{'C. ' + question.C}</Checkbox> : null}
                                            {question.D !== '' ? <Checkbox key={question.ID + 'D'} value='D'>{'D. ' + question.D}</Checkbox> : null}
                                            {question.E !== '' ? <Checkbox key={question.ID + 'E'} value='E'>{'E. ' + question.E}</Checkbox> : null}
                                        </Checkbox.Group>
                                }
                            </Form.Item>
                        ))
                    }
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={this.state.loading}>{this.props.exam.exam[0].status !==2?'交卷':'重新开始'}</Button>
                        <span> </span>
                        <span> </span>
                    </Form.Item>
                </Form>
            </div>
        </div>
        )
    }
}
