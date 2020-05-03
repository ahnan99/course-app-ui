import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './Login/Login'
import Register from './Register/Register'
import ForgetPassword from './ForgetPassword/ForgetPassword'
import MainView from './MainView'
import axios from 'axios'


axios.defaults.baseURL = "http://localohost:8081"
class App extends Component {
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

export default connect(mapStateToProps, null)(App)
