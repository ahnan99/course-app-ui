import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm.jsx'
import 'antd/dist/antd.css'
import './Login.css'
import { Row, Col } from 'antd'
import { actions as LoginActions } from '../../modules/application'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import axios from 'axios'

class Login extends Component {

    componentDidMount() {
        this.props.actions.getCompanyInfo()
    }

    render() {
        return (
            <Row className="form-row">
                <Col xs={2} sm={4} md={6} lg={8} xl={8}>
                </Col>
                <Col xs={20} sm={16} md={12} lg={8} xl={8} className="form-container">
                    {this.props.application.companyInfo ?
                        <div className="title-div">
                            <div>
                                {<img src={axios.defaults.baseURL + this.props.application.companyInfo[0].logo} width={60} heigth={60}/>}
                            </div>
                            <div>
                                <b class="title">{this.props.application.companyInfo[0].hostName}</b>
                            </div>
                        </div>
                        : null
                    }
                        <LoginForm
                            requestLogin={this.props.actions.requestLogin}
                            loggedIn={this.props.application.loggedIn}
                            loginError={this.props.application.loginError}
                            username={this.props.application.username}
                            getUserInfo={this.props.actions.getUserInfo} />
                 
                </Col>
                <Col xs={2} sm={4} md={6} lg={8} xl={8}>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = state => ({
    application: state.application
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(LoginActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
