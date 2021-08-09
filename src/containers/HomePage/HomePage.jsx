import React, { Component } from 'react'
import LessonCard from '../../components/LessonCard/LessonCard'
import { connect } from 'react-redux'
import { actions as CourseActions } from '../../modules/courses'
import { actions as ExamActions } from '../../modules/exam'
import { bindActionCreators } from 'redux'
import { Button, Card, notification, message, Modal } from 'antd'

class HomePage extends Component {

    componentDidMount() {
        this.props.actions.getCourseList({ username: this.props.application.username })
        this.props.actions.getLessonList({ username: this.props.application.username })
        this.props.examActions.getRealExam({ username: this.props.application.username })
    }

    componentWillReceiveProps = nextProps => {
        if (nextProps.application.userInfo && this.props.application.userInfo !== nextProps.application.userInfo && nextProps.application.userInfo.newMessage > 0) {
            notification.info({
                message: `你有${nextProps.application.userInfo.newMessage}条新信息`,
                placement: 'topRight',
                duration: 2
            })
        }
    }

    componentDidUpdate = prevProps => {
        if (prevProps.exam.exam !== this.props.exam.exam && this.props.exam.exam) {
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
            } else {
                this.props.history.push("/exampage")
                this.props.examActions.updateLeave(false)
                this.props.examActions.getExamQuestion({ paperID: this.props.exam.exam[0].paperID })
            }
        }
    }

    onClickExam = paperID => {
        this.props.examActions.getExam({ paperID })
    }

    onClickRule = () => {
        Modal.info({
            title: '考生须知',
            content: (
                <div>
                    <p>some messages...some messages...</p>
                    <p>some messages...some messages...</p>
                </div>
            ),
            onOk() { },
        });
    }



    render() {
        const { courses, lessons } = this.props.course
        const { actions, examActions, exam } = this.props
        if (courses.length === 0) {
            return <div>
                <h3>还未选择课程</h3>
            </div>
        }
        return (
            <div>
                <div>
                    {this.props.exam.realExam ? <Card title="我的考试">
                        {this.props.exam.realExam.map(exam => (
                            <Card.Grid style={{ width: '100%', textAlign: 'left' }}>
                                <p>{exam.certName}</p>
                                <p>开始日期：{exam.startDate}</p>
                                <p>地点：{exam.address}</p>
                                <p>类型：{exam.kindName}</p>
                                <Button type="primary" onClick={this.onClickRule}>考生须知</Button>&nbsp;&nbsp;
                                {exam.kindID === 1 ? (exam.status === 2 ? <Button type="primary" onClick={() => this.onClickExam(exam.paperID)}>开始考试</Button> : <span>已完成</span>) : null}
                            </Card.Grid>
                        ))}
                    </Card> : null}
                </div>
                <div>
                    {courses.map(course => (
                        <LessonCard key={course.id} exam={exam} key={course.ID} course={course} lessons={lessons} actions={actions} examActions={examActions} />
                    ))}
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
    actions: bindActionCreators(CourseActions, dispatch),
    examActions: bindActionCreators(ExamActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);