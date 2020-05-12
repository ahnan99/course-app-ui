import React, { Component } from 'react'
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer'
import { connect } from 'react-redux'
import { Row, Col, Layout, Button, Breadcrumb, Spin } from 'antd'
import { withRouter } from 'react-router-dom'
import { actions as CourseActions } from '../../modules/courses'
import { bindActionCreators } from 'redux'
import './ClassPage.css'


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
        this.props.actions.updateVideo(null)
        this.props.actions.updatePDF(null)
        this.props.history.push('/homepage')
    }

    onOk = () => {
        this.setState({ PDFVisible: false })
    }

    render() {
        if (!this.props.course.currentLesson || !this.props.course.video || !this.props.course.PDF) {
            return (

                <Row className="form-row">
                    <Col xs={2} sm={4} md={6} lg={8} xl={8}>
                    </Col>
                    <Col xs={20} sm={16} md={12} lg={8} xl={8} className="form-container">
                        <Spin spinning={true} />
                    </Col>
                    <Col xs={2} sm={4} md={6} lg={8} xl={8}>
                    </Col>
                </Row>
            )
        }
        return (
            <div>
                <Spin spinning={!this.props.course.video || !this.props.course.PDF}>
                    <Row gutter={[16, 32]}>
                        <Col span={24} style={{ textAlign: 'left' }}>
                            <Breadcrumb>
                                <Breadcrumb.Item>我的课程</Breadcrumb.Item>
                                <Breadcrumb.Item>{this.props.course.currentLesson.lessonName}</Breadcrumb.Item>
                            </Breadcrumb>
                        </Col>
                    </Row>
                    <Row gutter={[16, 32]}>
                        <Col span={24} style={{ fontSize: '18px' }}>
                            <b>{this.props.course.currentLesson.lessonName}</b>
                        </Col>
                    </Row>
                    <Row gutter={[16, 32]}>
                        <Col span={24}>
                            <VideoPlayer actions={this.props.actions} video={this.props.course.video[0]} />
                        </Col>
                    </Row>
                    <Row gutter={[16, 32]}>
                        <Col span={24} style={{ textAlign: 'left' }}>
                            <span>课件:</span><br></br>
                            <ul>
                                {this.props.course.PDF ? this.props.course.PDF.map(doc => (<li key={doc.ID}>
                                    <a onClick={() => this.onClickDoc(doc)}>{doc.coursewareName}</a>
                                </li>)) : "没有课件"}
                            </ul>
                        </Col>
                    </Row>
                    <Row gutter={[16, 32]}>
                        <Col span={24}>
                            <Button type="primary" onClick={this.onClickBack}>返回我的课程</Button>
                        </Col>
                    </Row>
                </Spin>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClassPage))
