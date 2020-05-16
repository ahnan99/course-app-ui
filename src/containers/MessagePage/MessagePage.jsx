import React, { Component } from 'react'
import MessageTable from '../../components/MessageTable/MessageTable'
import { connect } from 'react-redux'
import { actions as MessageActions } from '../../modules/message'
import { actions as applicationActions } from '../../modules/application'
import { bindActionCreators } from 'redux'

class MessagePage extends Component {

    componentDidMount() {
        this.props.actions.getMessage({ username: this.props.application.userInfo.username })
    }

    render() {
        const { message, application, actions, userActions } = this.props
        return (
            <MessageTable message={message} application={application} actions={actions} userActions={userActions}/>
        )
    }
}

const mapStateToProps = state => ({
    message: state.message,
    application: state.application
})


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(MessageActions, dispatch),
    userActions: bindActionCreators(applicationActions,dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MessagePage);