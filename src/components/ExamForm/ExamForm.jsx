import React, { Component } from 'react'
import { Form, Input, Button, Radio, message, Checkbox, Spin } from 'antd'
import moment from 'moment'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
export default class ExamForm extends Component {
    formRef = React.createRef()

    state = {time:0}

    onValuesChange = (changedValue, values) => {
        for(var key in changedValue){
            if(Array.isArray(changedValue[key])){
                var aggre = ''
                for(var i =0;i<changedValue[key].length;i++){
                    aggre += changedValue[key][i]
                }
                this.props.actions.postSingleQuestion({ID:key, answer:aggre})
            }else{
                this.props.actions.postSingleQuestion({ID:key, answer:changedValue[key]})
            }
        }
    }

    onFinish = values => {

    }

    componentWillReceiveProps = nextProps =>{
        if (!this.props.exam.exam && nextProps.exam.exam){
            this.setState({time:nextProps.exam.exam.secondRest},()=>{
                message.info(moment({}).seconds(this.state.time).format("H:mm:ss"), 0)
            })
            
        }
    }

    render() {
        if (!this.props.exam.examQuestion) {
            return (<div style={{ height: '100vh', verticalAlign: 'middle', lineHeight: '100vh' }}><Spin spinning></Spin></div>)
        }
        return (
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
                    this.props.exam.examQuestion.map((question,index) => (
                        <Form.Item style={{ textAlign: 'left' }}
                            name={question.ID}
                            key={question.ID}
                            label={(index+1)+'. '+question.questionName}>
                            {
                                question.kindID !== 2 ?
                                    <Radio.Group>
                                        {question.A !== '' ? <Radio key={question.ID + 'A'} value='A'>{'A. ' + question.A}</Radio> : null}
                                        {question.B !== '' ? <Radio key={question.ID + 'B'} value='B'>{'B. ' +question.B}</Radio> : null}
                                        {question.C !== '' ? <Radio key={question.ID + 'C'} value='C'>{'C. ' +question.C}</Radio> : null}
                                        {question.D !== '' ? <Radio key={question.ID + 'D'} value='D'>{'D. ' +question.D}</Radio> : null}
                                        {question.E !== '' ? <Radio key={question.ID + 'E'} value='E'>{'E. ' +question.E}</Radio> : null}
                                    </Radio.Group> :
                                    <Checkbox.Group>
                                        {question.A !== '' ? <Checkbox key={question.ID + 'A'} value='A'>{'A. ' +question.A}</Checkbox> : null}
                                        {question.B !== '' ? <Checkbox key={question.ID + 'B'} value='B'>{'B. ' +question.B}</Checkbox> : null}
                                        {question.C !== '' ? <Checkbox key={question.ID + 'C'} value='C'>{'C. ' +question.C}</Checkbox> : null}
                                        {question.D !== '' ? <Checkbox key={question.ID + 'D'} value='D'>{'D. ' +question.D}</Checkbox> : null}
                                        {question.E !== '' ? <Checkbox key={question.ID + 'E'} value='E'>{'E. ' +question.E}</Checkbox> : null}
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
