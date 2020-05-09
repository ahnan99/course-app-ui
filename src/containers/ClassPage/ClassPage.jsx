import React, { Component } from 'react'
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer'
import { connect } from 'react-redux'
import { Row, Col, Layout } from 'antd'
import { actions as CourseActions } from '../../modules/courses'
import { bindActionCreators } from 'redux'


class ClassPage extends Component {

    componentWillMount() {
        if (this.props.course.currentLesson) {
            const { currentLesson } = this.props.course
            this.props.actions.getVideo({ refID: currentLesson.ID })
            this.props.actions.getPDF({ refID: currentLesson.ID })
        }
    }

    componentWillUnmount() {
        this.props.actions.updateVideo([])
        this.props.actions.updatePDF([])
        this.props.actions.updateCurrentLesson(null)
    }

    render() {
        if (!this.props.course.currentLesson) {
            return (<h2>Not found</h2>)
        }
        return (
            <Layout>
                <Row>
                    <a>{this.props.course.currentLesson.lessonName}</a>
                </Row>
                <Row>
                    <VideoPlayer src={this.props.course.video[0].filename} />
                </Row>
                <Row>
                    <ul>
                        {this.props.course.PDF.map(doc => (<li key={doc.ID}>
                            <a href={doc.filename}>{doc.coursewareName}</a>
                        </li>))}
                    </ul>
                </Row>
            </Layout>
        )
    }
}

const mapStateToProps = state => ({
    course: state.course
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(CourseActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ClassPage)
