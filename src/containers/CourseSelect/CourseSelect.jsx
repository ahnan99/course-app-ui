import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions as CourseActions } from '../../modules/courses'
import { bindActionCreators } from 'redux'
import {Row, Col} from 'antd'
import CourseList from '../../components/CourseList/CourseList'

class CourseSelect extends Component {
    componentDidMount() {
        this.props.actions.getCourseList({ username: this.props.application.username })
        this.props.actions.getLessonList({ username: this.props.application.username })
    }

    render() {
        const { courses, lessons } = this.props.course
        const { actions } = this.props
        return (
            <div>
                <Row>
                    <CourseList/>
                </Row>
                <Row>

                </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(CourseSelect);