import React, { Component } from 'react'
import FeedbackForm from '../../components/FeedbackForm/FeedbackForm'
import { connect } from 'react-redux'
import { actions as MessageActions } from '../../modules/message'
import { bindActionCreators } from 'redux'

class FeedbackPage extends Component {

    componentDidMount() {
        this.props.actions.getMessageType({
            "kind": "feedback"
        })
    }

    render() {
        const { message, application, actions } = this.props
        return (
            <FeedbackForm message={message} application={application} actions={actions}/>
        )
    }
}

const mapStateToProps = state => ({
    message: state.message,
    application: state.application
})


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(MessageActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackPage);