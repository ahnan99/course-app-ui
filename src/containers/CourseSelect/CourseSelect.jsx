import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions as CertActions } from '../../modules/certificate'
import { bindActionCreators } from 'redux'
import { Row, Col, Tabs } from 'antd'
import CertList from '../../components/CertList/CertList'
import CourseList from '../../components/CertList/CourseList'
import RestCertList from '../../components/CertList/RestCertList'
import RestCourseList from '../../components/CertList/RestCourseList'


const { TabPane } = Tabs;
class CourseSelect extends Component {

    render() {
        const { cert, application } = this.props
        const { actions } = this.props
        const { fetchingSelected, fetchingCourse, fetchingRest } = cert
        const loading = fetchingSelected || fetchingCourse || fetchingRest
        return (
            <div>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="证书选择" key="1">
                        <Row>
                            <Col span={24}>
                                <CertList application={application} cert={cert} actions={actions} loading={loading} />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <RestCertList application={application} cert={cert} actions={actions} loading={loading} />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="课程选择" key="2">
                        <Row>
                            <Col span={24}>
                                <CourseList application={application} cert={cert} actions={actions} loading={loading} />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <RestCourseList application={application} cert={cert} actions={actions} loading={loading} />
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    cert: state.cert,
    application: state.application
})


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(CertActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CourseSelect);