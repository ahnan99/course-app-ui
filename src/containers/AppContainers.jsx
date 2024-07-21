import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { message } from 'antd'
import Login from './Login/Login'
import Register from './Register/Register'
import ForgetPassword from './ForgetPassword/ForgetPassword'
import MainView from './MainView'
import axios from 'axios'
import { actions as ApplicationActions } from '../modules/application'
import { actions as MessageActions } from '../modules/message'
import { actions as UserActions } from '../modules/user'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import qs from 'qs'

axios.defaults.baseURL = process.env.REACT_APP_ALIYUNHOST ? process.env.REACT_APP_ALIYUNHOST + ":8081" : "http://127.0.0.1:8081"
//axios.defaults.baseURL = "http://spc.shznxfxx.cn:8081"
axios.defaults.withCredentials = true
class App extends Component {

    componentDidMount() {
        this.props.actions.confirmLogin()
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.props.application.loggedIn === true && nextProps.application.loggedIn === false) {
            message.success('登出成功')
        }
        if (this.props.application.loggedIn === false && nextProps.application.loggedIn === true) {
            message.success('登录成功')
        }
        if (
          this.props.application.loggedIn === true &&
          nextProps.application.loggedIn === 401
        ) {
          message.error("登录已超时，自动退出。");
          this.props.actions.updateLoginStatus(false);
        }
        if (
          this.props.application.loggedIn === true &&
          nextProps.application.loggedIn === 501
        ) {
          message.error("已在其他设备登录，自动退出。");
          this.props.actions.updateLoginStatus(false);
        }
        if (this.props.application.loggedIn === false && nextProps.user.resetStatus !== null) {
            if (nextProps.user.resetStatus === 0) {
                message.success(nextProps.user.resetMessage)
                this.props.history.push('/login?username=' + qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).username)
            } else {
                console.log('shibai')
                message.error(nextProps.user.resetMessage)
            }
            this.props.userActions.updateResetPassword({ status: null, msg: null })

        }
    }

    render() {
        return (
            <Switch>
                <Route key={"register"} exact path="/register" component={Register} />
                <Route key={"resetpassword"} exact path="/forgetpassword" component={ForgetPassword} />
                <Route key={"login"} exact path="/login" component={Login} />
                {this.props.application.loggedIn ? <MainView /> : <Redirect to={qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).username && qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).username !== undefined ?
                    '/login?username=' + qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).username : '/login'
                } />}
            </Switch>
        )
    }
}

const mapStateToProps = state => ({
    application: state.application,
    message: state.message,
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ApplicationActions, dispatch),
    messageActions: bindActionCreators(MessageActions, dispatch),
    userActions: bindActionCreators(UserActions, dispatch)
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
