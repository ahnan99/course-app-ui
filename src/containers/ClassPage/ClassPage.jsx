import React, { Component } from 'react'
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer'
import { connect } from 'react-redux'
import { Row, Col, Layout, Button } from 'antd'
import { actions as CourseActions } from '../../modules/courses'
import { bindActionCreators } from 'redux'
import axios from 'axios'


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
        if (!this.props.course.currentLesson || this.props.course.video.length === 0 || !this.props.course.PDF) {
            return (<h2>Not found</h2>)
        }
        return (
            <Layout>
                <Row gutter={[16,32]}>
                    <Col span={24}>
                        <a>{this.props.course.currentLesson.lessonName}</a>
                    </Col>
                </Row>
                <Row gutter={[16,32]}>
                    <Col span={24}>
                        <VideoPlayer actions={this.props.actions} video={this.props.course.video[0]} />
                    </Col>
                </Row>
                <Row gutter={[16,32]}>
                    <Col span={24} style={{ textAlign: 'left' }}>
                        <ul>
                            {this.props.course.PDF.map(doc => (<li key={doc.ID}>
                                <a href={axios.defaults.baseURL + doc.filename}>{doc.coursewareName}</a>
                            </li>))}
                        </ul>
                    </Col>
                </Row>
                <Row gutter={[16,32]}>
                    <Col span={24}>
                       <Button type="primary" href="/homepage">返回</Button>
                    </Col>
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
