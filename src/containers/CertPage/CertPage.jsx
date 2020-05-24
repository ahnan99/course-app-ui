import React, { Component } from 'react'
import CertCard from '../../components/CertCard/CertCard'
import { connect } from 'react-redux'
import { actions as CertActions } from '../../modules/certificate'
import { bindActionCreators } from 'redux'


class CertPage extends Component {
    componentDidMount() {
        this.props.actions.getAccomplished({ username: this.props.application.username })
    }




    render() {
        const { accomplished } = this.props.cert
        if (accomplished.length === 0) {
            return <div>
                <h3>还没有获得证书</h3>
            </div>
        }
        return (
            <div>
                {accomplished.map(cert => (
                    <CertCard cert={cert}/>
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    cert: state.cert,
    application: state.application
})


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(CertActions, dispatch),

})

export default connect(mapStateToProps, mapDispatchToProps)(CertPage);