import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions as CertActions } from '../../modules/certificate'
import { bindActionCreators } from 'redux'
import { Row, Col } from 'antd'
import CourseList from '../../components/CourseList/CourseList'

class CourseSelect extends Component {

    render() {
        const { cert, application } = this.props
        const { actions } = this.props
        return (
            <div>
                <Row>
                    <CourseList application={application} cert={cert} actions={actions} />
                </Row>
                <Row>
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