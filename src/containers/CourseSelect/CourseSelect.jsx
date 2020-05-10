import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions as CertActions } from '../../modules/certificate'
import { bindActionCreators } from 'redux'
import { Row, Col } from 'antd'
import CertList from '../../components/CertList/CertList'
import RestCertList from '../../components/CertList/RestCertList'

class CourseSelect extends Component {

    render() {
        const { cert, application } = this.props
        const { actions } = this.props
        return (
            <div>
                <Row>
                    <Col span={24}>
                        <CertList application={application} cert={cert} actions={actions} />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <RestCertList application={application} cert={cert} actions={actions} />
                    </Col>
                </Row>
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