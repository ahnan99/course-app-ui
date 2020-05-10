import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './Login/Login'
import Register from './Register/Register'
import ForgetPassword from './ForgetPassword/ForgetPassword'
import MainView from './MainView'
import axios from 'axios'
import { actions as ApplicationActions } from '../modules/application'
import { bindActionCreators } from 'redux'
import Cookies from 'js-cookie'


axios.defaults.baseURL = "http://127.0.0.1:8081"
axios.defaults.withCredentials = true
class App extends Component {
    componentWillMount() {
        if (Cookies.get('elearning')) {
            Cookies.get('elearning')
            this.props.actions.updateLoginStatus(true)
        }
    }
    constructor(props) {
        super(props)
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
    application: state.application
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ApplicationActions, dispatch),

})
export default connect(mapStateToProps, mapDispatchToProps)(App)
