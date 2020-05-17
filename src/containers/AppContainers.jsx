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
import { actions as MessageActions} from '../modules/message'
import { bindActionCreators } from 'redux'


axios.defaults.baseURL = process.env.REACT_APP_ALIYUNHOST ? process.env.REACT_APP_ALIYUNHOST + ":8081" : "http://127.0.0.1:8081"
//axios.defaults.baseURL = "http://spc.shznxfxx.cn:8081"
axios.defaults.withCredentials = true
class App extends Component {

    constructor(props) {
        super(props)
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.props.application.loggedIn === true && nextProps.application.loggedIn === false) {
            message.success('登出成功')
        }
        if (this.props.application.loggedIn === false && nextProps.application.loggedIn === true) {
            message.success('登录成功')
        }
        
    }

    render() {
        return (
            <Switch>
                <Route key={"register"} exact path="/register" component={Register} />
                <Route key={"resetpassword"} exact path="/forgetpassword" component={ForgetPassword} />
                <Route key={"login"} exact path="/login" component={Login} />
                {this.props.application.loggedIn ? <MainView /> : <Redirect to="/login" />}
            </Switch>
        )
    }
}

const mapStateToProps = state => ({
    application: state.application,
    message: state.message
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ApplicationActions, dispatch),
    messageActions: bindActionCreators(MessageActions,dispatch)

})
export default connect(mapStateToProps, mapDispatchToProps)(App)
