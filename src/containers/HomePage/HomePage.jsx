import React, { Component } from 'react'
import LessonCard from '../../components/LessonCard/LessonCard'
import { connect } from 'react-redux'
import { actions as CourseActions } from '../../modules/courses'
import { actions as ExamActions } from '../../modules/exam'
import { bindActionCreators } from 'redux'
import { Button, Card, notification, message, Modal } from 'antd'
import qs from 'qs'

class HomePage extends Component {

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
                duration: 2
            })
        }
    }


    onClickExam = paperID => {
        this.props.examActions.updateLeave(false)
        this.props.examActions.getExam({ paperID: paperID })
    }

    onClickRule = () => {
        Modal.info({
            title: '考生须知',
            content: (
                <div>
                    <p>1、务必携带身份证原件和准考证。</p>
                    <p>2、迟到15分钟不得入场。</p>
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