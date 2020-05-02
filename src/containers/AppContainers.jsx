import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import routes from '../routes'
import { connect } from 'react-redux'
import Login from './Login/Login'
import Register from './Register/Register'
import ForgetPassword from './ForgetPassword/ForgetPassword'

class App extends Component {
    constructor(props) {
        super(props)
    }

    get routes() {
        return (
            routes.map(route => (
                <Route key={route.pathKey} exact {...route} />
            ))
        )
    }

    render() {
        return (
            <Switch>
                <Route key={"register"} exact path="/register" component={Register} />
                <Route key={"resetpassword"} exact path="/forgetpassword" component={ForgetPassword} />
                <Route key={"login"} exact path="/login" component={Login} />
                {this.props.application.loggedIn ? this.routes : <Redirect to="/login" />}
            </Switch>
        )
    }
}

const mapStateToProps = state => ({
    application: state.application
})

export default connect(mapStateToProps, null)(App)
