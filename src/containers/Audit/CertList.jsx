import React, { Component } from 'react'
import { actions as AuditActions } from '../../modules/audit'
import { actions as CertActions } from '../../modules/certificate'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'
import { List, Button, Row, Col, Breadcrumb } from 'antd'
import axios from 'axios'
import './AuditPage.css'

class CertList extends Component {

    onClickBack = () => {
        this.props.certActions.updateAccomplished([])
        this.props.history.push('/auditpage')
    }

    onClick = (item) => {
        this.props.actions.updateSelectedCert(item)
    }

    componentWillReceiveProps = nextProps => {
        if (nextProps.audit.selectedCert) {
            this.props.history.push('/auditpage/certlist/certimage')
        }
    }


    render() {
        return (
            <div>
                <Row gutter={[16, 32]}>
                    <Col span={24} style={{ textAlign: 'left' }}>
                        <Breadcrumb>
                            <Breadcrumb.Item>学员筛选</Breadcrumb.Item>
                            <Breadcrumb.Item>学员证书列表</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row gutter={[16, 32]}>
                    <Col span={24} className="form-container">
                        <List
                            itemLayout="horizontal"
                            dataSource={this.props.cert.accomplished}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={<a onClick={() => this.onClick(item)}>{item.certName}</a>}
                                        description={item.endDate}
                                    />
                                </List.Item>)}
                        />
                    </Col>
                </Row>
                <Row gutter={[16, 32]}>
                    <Col span={24} className="form-container">
                        <Button type="primary" onClick={() => this.onClickBack()}>返回</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    cert: state.cert,
    audit: state.audit
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(AuditActions, dispatch),
    certActions: bindActionCreators(CertActions, dispatch)
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CertList))
