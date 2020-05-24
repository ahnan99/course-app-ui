import React, { Component } from 'react'
import LessonCard from '../../components/LessonCard/LessonCard'
import { connect } from 'react-redux'
import { actions as CourseActions } from '../../modules/courses'
import { actions as ExamActions } from '../../modules/exam'
import { bindActionCreators } from 'redux'
import { notification } from 'antd'

class HomePage extends Component {
    componentDidMount() {
        this.props.actions.getCourseList({ username: this.props.application.username })
        this.props.actions.getLessonList({ username: this.props.application.username })
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



    render() {
        const { courses, lessons } = this.props.course
        const { actions, examActions } = this.props
        if (courses.length === 0) {
            return <div>
                <h3>还未选择课程</h3>
            </div>
        }
        return (
            <div>
                {courses.map(course => (
                    <LessonCard key={course.ID} course={course} lessons={lessons} actions={actions} examActions={examActions}/>
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    course: state.course,
    application: state.application
})


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(CourseActions, dispatch),
    examActions: bindActionCreators(ExamActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);