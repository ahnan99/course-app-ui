import React, { Component } from 'react'
import { Row, Col } from 'antd'
import UserInfoForm from '../../components/RegisterForm/UserInfoForm'
import { actions as RegisterActions } from '../../modules/application'
import { actions as UserActions } from '../../modules/user'
import { connect } from 'react-redux'
import 'antd/dist/antd.css'
import './Register.css'
import { bindActionCreators } from 'redux'

class UserInfo extends Component {
    render() {
        return (
           
                    <UserInfoForm
                        application={this.props.application}
                        actions={this.props.actions}
                        userActions={this.props.userActions}
                        user={this.props.user}
                    />
               
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
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
