import React, { Component } from 'react'
import LessonCard from '../../components/LessonCard/LessonCard'
import { connect } from 'react-redux'
import { actions as CourseActions } from '../../modules/courses'
import { bindActionCreators } from 'redux'

class HomePage extends Component {
    componentDidMount() {
        this.props.actions.getCourseList()
    }

    render() {
        const { courses } = this.props.course
        return (
            <div>
                {courses.map(course => (
                    <LessonCard key={course.lessonID} course={course}/>
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    course: state.course
})


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(CourseActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);