import React, { Component } from 'react'
import { Row, Col } from 'antd'
import RegisterForm from '../../components/RegisterForm/RegisterForm'
import 'antd/dist/antd.css'
import './Register.css'

export default class Register extends Component {


    render() {
        return (
            <Row className="form-row">
            <Col xs={2} sm={4} md={6} lg={8} xl={8}>
            </Col>
            <Col xs={20} sm={16} md={12} lg={8} xl={8} className="form-container">
                <RegisterForm />
            </Col>
            <Col xs={2} sm={4} md={6} lg={8} xl={8}>
            </Col>
        </Row>
        )
    }
}
