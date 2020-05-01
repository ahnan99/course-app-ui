import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm.jsx'
import 'antd/dist/antd.css'
import { Row, Col } from 'antd'

export default class index extends Component {
    render() {
        return (
            <Row>
                <Col xs={2} sm={4} md={6} lg={8} xl={6}>

                </Col>
                <Col xs={20} sm={16} md={12} lg={8} xl={10}>
                    <LoginForm />
                </Col>
                <Col xs={2} sm={4} md={6} lg={8} xl={6}>

                </Col>
            </Row>
        )
    }
}
