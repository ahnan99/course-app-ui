import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm.jsx'
import 'antd/dist/antd.css'
import './Login.css'
import { Row, Col } from 'antd'
import { actions as LoginActions } from '../../modules/application'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import axios from 'axios'
import qs from 'qs'
import { withRouter } from 'react-router-dom'
class Login extends Component {

    componentDidMount() {

        if (qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).fromID) {
            this.props.actions.updateFromID(qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).fromID)
            this.props.actions.updateLogurl(this.props.location.search)
        }
        this.props.actions.getCompanyInfo()        
        if (this.props.application.loggedIn) {
            this.props.history.push('/homepage')
        }
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
                                {<img src={axios.defaults.baseURL + this.props.application.companyInfo[0].logo} width={60} heigth={60} />}
                            </div>
                            <div>
                                <b className="title">{this.props.application.companyInfo[0].hostName}</b>
                            </div>
                        </div>
                        : null
                    }
                    <LoginForm
                        requestLogin={this.props.actions.requestLogin}
                        loggedIn={this.props.application.loggedIn}
                        loginError={this.props.application.loginError}
                        username={this.props.application.username}
                        getUserInfo={this.props.actions.getUserInfo}
                        userInfo={this.props.application.userInfo}
                        auditorRequestLogin={this.props.actions.auditorRequestLogin}
                        auditor={this.props.application.auditor} 
                        teacher={this.props.application.teacher} />

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
