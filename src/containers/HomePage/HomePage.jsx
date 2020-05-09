import React, { Component } from 'react'
import LessonCard from '../../components/LessonCard/LessonCard'
import { connect } from 'react-redux'
import { actions as CourseActions } from '../../modules/courses'
import { bindActionCreators } from 'redux'

class HomePage extends Component {
    componentDidMount() {
        this.props.actions.getCourseList({username:this.props.application.username})
        this.props.actions.getLessonList({username:this.props.application.username})
    }

    render() {
        const { courses } = this.props.course
        const { lessons } = this.props.course
        return (
            <div>
                {courses.map(course => (
                    <LessonCard key={course.ID} course={course} lessons={lessons} />
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
    actions: bindActionCreators(CourseActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);