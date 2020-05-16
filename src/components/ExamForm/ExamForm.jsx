import React, { Component } from 'react'
import { Form, Input, Button, Radio, message, Checkbox, Spin, Alert, Affix } from 'antd'
import moment from 'moment'
import './ExamForm.css'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
export default class ExamForm extends Component {
    formRef = React.createRef()

    state = { time: 0 }

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

    onFinish = values => {

    }

    componentDidMount() {
        this.timer = setInterval(() => {
            if (this.state.time > 0) {
                const { time } = this.state
                this.setState({ time: time - 1 }, () => {
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
    }

    render() {
        if (!this.props.exam.examQuestion) {
            return (<div style={{ height: '100vh', verticalAlign: 'middle', lineHeight: '100vh' }}><Spin spinning></Spin></div>)
        }
        return (<div>
            <Affix offsetTop={10}>
                <div className='alert-container'>
                    <Alert message={'剩余时间：' + moment.utc(this.state.time * 1000).format("H:mm:ss")} type='info' />
                </div>
            </Affix>
            <p> </p>
            <div>
                <Form
                    name="exam_form"
                    className="login-form"
                    initialValues={{}}
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
                                label={(index + 1) + '. ' + question.questionName}>
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
                        <Button type="primary" htmlType="submit">交卷</Button>
                        <span> </span>
                        <span> </span>
                    </Form.Item>
                </Form>
            </div>
        </div>
        )
    }
}
