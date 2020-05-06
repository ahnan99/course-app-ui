import React, { Component } from 'react'
import { Row, Col } from 'antd'
import RegisterForm from '../../components/RegisterForm/RegisterForm'
import { actions as RegisterActions } from '../../modules/application'
import { actions as UserActions } from '../../modules/user'
import { connect } from 'react-redux'
import 'antd/dist/antd.css'
import './Register.css'
import { bindActionCreators } from 'redux'

class Register extends Component {


    render() {
        return (
            <Row className="form-row">
                <Col xs={2} sm={4} md={6} lg={8} xl={8}>
                </Col>
                <Col xs={20} sm={16} md={12} lg={8} xl={8} className="form-container">
                    <RegisterForm
                        requestRegister={this.props.actions.requestRegister}
                        userActions={this.props.userActions}
                        loggedIn={this.props.application.loggedIn}
                        registered={this.props.application.registered}
                        registerError={this.props.application.registerError}
                        resetRegisterStatus={this.props.actions.resetRegisterStatus}
                        user={this.props.user}
                    />
                </Col>
                <Col xs={2} sm={4} md={6} lg={8} xl={8}>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = state => ({
    application: state.application,
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(RegisterActions, dispatch),
    userActions: bindActionCreators(UserActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
