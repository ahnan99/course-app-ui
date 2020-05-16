import React, { Component } from 'react'
import { Form, Input, Button, Radio, message, Checkbox, Spin } from 'antd'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
export default class ExamForm extends Component {
    formRef = React.createRef()

    onValuesChange = (changedValue, values) => {
        console.log(changedValue)
    }

    onFinish = values => {

    }

    render() {
        if(!this.props.exam.examQuestion){
            return (<div style={{height: '100vh',verticalAlign:'middle',lineHeight: '100vh'}}><Spin spinning></Spin></div>)
        }
        return (
            <Form
                name="exam_form"
                className="login-form"
                initialValues={{}}
                onFinish={this.onFinish}
                {...layout}
                ref={this.formRef}
                onValuesChange={this.onValuesChange}
            >
                {
                    this.props.exam.examQuestion.map(question => (
                        <Form.Item name={question.ID}
                            label={question.questionName}>
                            {
                                question.kindID !== 2 ?
                                    <Radio.Group>
                                        {question.A !== '' ? <Radio value='A'>{question.A}</Radio> : null}
                                        {question.B !== '' ? <Radio value='B'>{question.B}</Radio> : null}
                                        {question.C !== '' ? <Radio value='C'>{question.C}</Radio> : null}
                                        {question.D !== '' ? <Radio value='D'>{question.D}</Radio> : null}
                                        {question.E !== '' ? <Radio value='E'>{question.E}</Radio> : null}
                                    </Radio.Group> :
                                    <Checkbox.Group>
                                        {question.A !== '' ? <Checkbox value='A'>{question.A}</Checkbox> : null}
                                        {question.B !== '' ? <Checkbox value='B'>{question.B}</Checkbox> : null}
                                        {question.C !== '' ? <Checkbox value='C'>{question.C}</Checkbox> : null}
                                        {question.D !== '' ? <Checkbox value='D'>{question.D}</Checkbox> : null}
                                        {question.E !== '' ? <Checkbox value='E'>{question.E}</Checkbox> : null}
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
        )
    }
}
