import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions as ExamActions } from '../../modules/exam'
import { bindActionCreators } from 'redux'
import ExamForm from '../../components/ExamForm/ExamForm'


class ExamPage extends Component {

    render() {
        const {exam,actions} = this.props
        return (
            <ExamForm exam={exam} actions={actions}/>
        )
    }
}

const mapStateToProps = state => ({
    exam: state.exam,
})


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ExamActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ExamPage);