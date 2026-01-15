import React, { Component } from 'react'
import LessonCard from '../../components/LessonCard/LessonCard'
import { connect } from 'react-redux'
import { actions as CourseActions } from '../../modules/courses'
import { actions as ExamActions } from '../../modules/exam'
import { actions as RegisterActions } from '../../modules/application'
import { bindActionCreators } from 'redux'
import { Button, Card, notification, message, Modal, Radio, Form, Input } from 'antd'


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
class HomePage extends Component {
    formRef = React.createRef()
    state = {
        visible: false,
        evalution_ID: 0,
        evalution_course: ""
    }

    componentDidMount() {
        this.props.actions.getCourseList({ username: this.props.application.username })
        this.props.actions.getLessonList({ username: this.props.application.username })
        this.props.examActions.getRealExamList({ username: this.props.application.username })
    }

    componentWillReceiveProps = nextProps => {
        if (nextProps.application.userInfo && this.props.application.userInfo !== nextProps.application.userInfo && nextProps.application.userInfo.newMessage > 0) {
            notification.info({
                message: `你有${nextProps.application.userInfo.newMessage}条新信息`,
                placement: 'topRight',
                duration: 5
            })
        }
        if (nextProps.application.userInfo && this.props.application.userInfo !== nextProps.application.userInfo && nextProps.application.userInfo.newEvalution > '') {
            let ar = nextProps.application.userInfo.newEvalution.split("|");
            this.setState({ visible: true, evalution_ID: ar[0], evalution_course: ar[1] })
        }
    }


    onClickExam = paperID => {
        this.props.examActions.updateLeave(false);
        this.props.examActions.getExam({ paperID: paperID });
        this.props.examActions.updateBusyGetExamQuestion(1);
    }

    onClickRule = () => {
        Modal.info({
            title: '考生须知',
            content: (
                <div>
                    <p>1、仔细检查题目，交卷后将无法进入。</p>
                    <p>2、迟到15分钟不得入场。</p>
                </div>
            ),
            onOk() { },
        });
    }

    handleOk = values => {
        this.props.postEvalution({
            ID: this.state.evalution_ID,
            enterID: 0,
            F1: values.F1,
            F2: values.F2,
            F3: values.F3,
            F4: values.F4,
            F5: values.F5,
            F6: values.F6,
            F7: values.F7,
            memo: values.memo,
            registerID: ""
        });
        this.setState({
          visible: false,
        });
    };
    
    handleCancel = e => {
        this.setState({
          visible: false,
        });
    };

    render() {
        const { courses, lessons } = this.props.course
        const { actions, examActions, exam } = this.props
        const { TextArea } = Input;
        if (courses.length === 0) {
            return <div>
                <h3>还未选择课程</h3>
            </div>
        }
        return (
            <div>
                <div>
                    {this.props.exam.realExamList && this.props.exam.realExamList.length > 0 ? <Card title="我的考试">
                        {this.props.exam.realExamList.map(exam => (
                            <Card.Grid style={{ width: '100%', textAlign: 'left', background: '#BBFFFF' }}>
                                <p>科目：{exam.certName}</p>
                                <p>日期：{exam.startDate}</p>
                                <p>地点：{exam.address}</p>
                                <p>姓名：{exam.name} &nbsp;&nbsp;类型：{exam.kindName}</p>
                                <Button type="primary" onClick={this.onClickRule}>考生须知</Button>&nbsp;&nbsp;
                                {exam.kindID === 1 ? (exam.status < 2 ? <Button type="primary" onClick={() => this.onClickExam(exam.paperID)}>开始考试</Button> : <span>已完成</span>) : null}
                            </Card.Grid>
                        ))}
                    </Card> : null}
                </div>
                <div>
                    {courses.map(course => (
                        <LessonCard application={this.props.application} exam={exam} key={course.ID} course={course} courseState={this.props.course} lessons={lessons} actions={actions} examActions={examActions} />
                    ))}
                </div>
                <div>
                    <Modal
                    title={"课程评议表：" + this.state.evalution_course}
                    visible={this.state.visible}
                    // onOk={this.handleOk}
                    // onCancel={this.handleCancel}
                    // okText="提交"
                    // cancelText="取消"
                    footer={[]}
                    >
                    <Form
                        {...formItemLayout}
                        onFinish={this.handleOk}
                        scrollToFirstError
                        ref={this.formRef}
                    >
                        <Form.Item
                            name="F1"
                            label="教学态度："
                        >
                            <Radio.Group defaultValue={"0"}>
                                <Radio value="0">好</Radio>
                                <Radio value="1">较好</Radio>
                                <Radio value="2">尚可</Radio>
                                <Radio value="3">差</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            name="F2"
                            label="教学内容："
                        >
                            <Radio.Group defaultValue={"0"}>
                                <Radio value="0">好</Radio>
                                <Radio value="1">较好</Radio>
                                <Radio value="2">尚可</Radio>
                                <Radio value="3">差</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            name="F3"
                            label="教学方法："
                        >
                            <Radio.Group defaultValue={"0"}>
                                <Radio value="0">好</Radio>
                                <Radio value="1">较好</Radio>
                                <Radio value="2">尚可</Radio>
                                <Radio value="3">差</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            name="F4"
                            label="教学手段："
                        >
                            <Radio.Group defaultValue={"0"}>
                                <Radio value="0">好</Radio>
                                <Radio value="1">较好</Radio>
                                <Radio value="2">尚可</Radio>
                                <Radio value="3">差</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            name="F5"
                            label="讲解示范："
                        >
                            <Radio.Group defaultValue={"0"}>
                                <Radio value="0">好</Radio>
                                <Radio value="1">较好</Radio>
                                <Radio value="2">尚可</Radio>
                                <Radio value="3">差</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            name="F6"
                            label="巡回指导："
                        >
                            <Radio.Group defaultValue={"0"}>
                                <Radio value="0">好</Radio>
                                <Radio value="1">较好</Radio>
                                <Radio value="2">尚可</Radio>
                                <Radio value="3">差</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            name="F7"
                            label="课时完成："
                        >
                            <Radio.Group defaultValue={"0"}>
                                <Radio value="0">好</Radio>
                                <Radio value="1">较好</Radio>
                                <Radio value="2">尚可</Radio>
                                <Radio value="3">差</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            name="memo"
                            label="意见与建议："
                        >
                            <TextArea rows={4} placeholder="感谢您的支持" />
                        </Form.Item>
                        <Form.Item>
                            <span></span>
                            <span></span>
                            <Button type="primary" htmlType="submit">提交</Button>
                        </Form.Item>
                    </Form>
                    </Modal>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    course: state.course,
    application: state.application,
    exam: state.exam
})


const mapDispatchToProps = dispatch => ({
    registerActions: bindActionCreators(RegisterActions, dispatch),
    actions: bindActionCreators(CourseActions, dispatch),
    examActions: bindActionCreators(ExamActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);