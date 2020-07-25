import React, { Component } from 'react'
import ForgetPasswordForm from '../../components/ForgetPasswordForm/ForgetPasswordForm'
import NewPasswordModal from '../../components/ForgetPasswordForm/NewPasswordModal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions as LoginActions } from '../../modules/user'
import { Row, Col } from 'antd'
import './ForgetPassword.css'
import { withRouter } from 'react-router-dom'

class ForgetPassword extends Component {
  
    render() {
        return (
            <Row className="form-row">
                <Col xs={2} sm={4} md={6} lg={8} xl={8}>
                </Col>
                <Col xs={20} sm={16} md={12} lg={8} xl={8} className="form-container">
                    <ForgetPasswordForm
                        actions={this.props.actions}
                        user={this.props.user} />
                </Col>
                <Col xs={2} sm={4} md={6} lg={8} xl={8}>
                </Col>
            </Row>
        )
    }
}


const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(LoginActions, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgetPassword))
