import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import {Layout, Divider } from 'antd'
import routes from '../routes'
import { connect } from 'react-redux'
import Login from './Login/Login'
class App extends Component {
    constructor(props){
        super(props)
    }

    get routes(){
        return(
            <Layout>
                <Switch>
                    {routes.map(route=>(
                        <Route key={route.pahtKey} exact {...route}/>
                    ))}
                </Switch>
            </Layout>
        )
    }

    render() {
        return(
            
            <div>
                {this.props.application.loggedIn?this.routes:<Login/>}
            </div>
        )
    }
}

const mapStateToProps = state =>({
    application: state.application
})

export default connect(mapStateToProps,null)(App)
