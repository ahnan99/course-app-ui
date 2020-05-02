import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm.jsx'
import 'antd/dist/antd.css'
import './Login.css'
import { Row, Col } from 'antd'
import { actions as LoginActions } from '../../modules/application'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

class Login extends Component {
    render() {
        return (
            <Row className="form-row">
                <Col xs={2} sm={4} md={6} lg={8} xl={8}>
                </Col>
                <Col xs={20} sm={16} md={12} lg={8} xl={8} className="form-container">
                    <LoginForm 
                    userLogin={this.props.actions.userLogin}/>
                </Col>
                <Col xs={2} sm={4} md={6} lg={8} xl={8}>
                </Col>
            </Row>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(LoginActions, dispatch)
})

export default connect(null, mapDispatchToProps)(Login);
