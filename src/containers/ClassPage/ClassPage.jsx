import React, { Component } from 'react'
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer'
import { connect } from 'react-redux'
import { Row, Col, Layout, Button } from 'antd'
import { withRouter } from 'react-router-dom'
import { actions as CourseActions } from '../../modules/courses'
import { bindActionCreators } from 'redux'


class ClassPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            PDFVisible: false
        }
    }


    componentWillMount() {
        if (this.props.course.currentLesson) {
            const { currentLesson } = this.props.course
            this.props.actions.getVideo({ refID: currentLesson.ID })
            this.props.actions.getPDF({ refID: currentLesson.ID })
        }
    }

    onClickDoc = async (doc) => {
        await this.props.actions.updateCurrentPDF(doc)
        await this.props.history.push('/classpage/pdfView')
    }


    onClickBack = () => {
        this.props.history.push('/homepage')
    }

    onOk = () =>{
        this.setState({PDFVisible:false})
    }

    render() {
        if (!this.props.course.currentLesson || this.props.course.video.length === 0 || !this.props.course.PDF) {
            return (<h2>Not found</h2>)
        }
        return (
            <Layout>
                <Row gutter={[16, 32]}>
                    <Col span={24}>
                        <a>{this.props.course.currentLesson.lessonName}</a>
                    </Col>
                </Row>
                <Row gutter={[16, 32]}>
                    <Col span={24}>
                        <VideoPlayer actions={this.props.actions} video={this.props.course.video[0]} />
                    </Col>
                </Row>
                <Row gutter={[16, 32]}>
                    <Col span={24} style={{ textAlign: 'left' }}>
                        <ul>
                            {this.props.course.PDF.map(doc => (<li key={doc.ID}>
                                <a onClick={() => this.onClickDoc(doc)}>{doc.coursewareName}</a>
                            </li>))}
                        </ul>
                    </Col>
                </Row>
                <Row gutter={[16, 32]}>
                    <Col span={24}>
                        <Button type="primary" onClick={this.onClickBack}>返回</Button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClassPage))
