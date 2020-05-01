import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm.jsx'
import 'antd/dist/antd.css'
import './Login.css'
import { Row, Col } from 'antd'


class Login extends Component {
        render() {
            return (
                <Row className="form-row">
                    <Col xs={2} sm={4} md={6} lg={8} xl={8}>
                    </Col>
                    <Col xs={20} sm={16} md={12} lg={8} xl={8} className="form-container">
                        <LoginForm />
                    </Col>
                    <Col xs={2} sm={4} md={6} lg={8} xl={8}>
                    </Col>
                </Row>
            )
        }
    }

export default Login;
