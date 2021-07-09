import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Select, List, message, Row, Col, Breadcrumb } from 'antd'
import { actions as AuditActions } from '../../modules/audit'
import { actions as CertActions } from '../../modules/certificate'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'
import './AuditPage.css'


const { Search } = Input
const { Option } = Select

class AuditPage extends Component {

    constructor(props) {
        super(props)
        this.onSearch = this.onSearch.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
    }

    componentDidMount() {
        this.props.actions.getCertList()
    }

    onSearch(value) {
        console.log('search', value)
        this.props.actions.getFindStudent({ find: value })
    }

    onClick = item => {
        this.props.certActions.getAccomplished({ username: item.username, certID: this.props.audit.filter })
    }

    handleFilterChange(value) {
        console.log(value)
        this.props.actions.updateFilter(value)
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.cert.accomplished && nextProps.cert.accomplished.length > 0) {
            this.props.history.push('/auditpage/certlist')
        }
        if (nextProps.cert.emptyAccomplished) {
            message.error('没有对应类别的证书')
            this.props.certActions.updateEmptyAccomplished(false)
        }
    }

    render() {
        if (!this.props.audit.certList) {
            return (<div></div>)
        }
        return (
            <div>
                <Row gutter={[16, 32]}>
                    <Col span={24} style={{ textAlign: 'left' }}>
                        <Breadcrumb>
                            <Breadcrumb.Item>人员查找</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row gutter={[16,32]}>
                    <Col span={24} className="form-container">
                        <Select defaultValue={this.props.audit.filter} style={{ width: 200 }} onChange={this.handleFilterChange} placeholder='选择证书类型'>
                            {
                                this.props.audit.certList.map(item => (<Option key={item.certID} value={item.certID}>{item.certName}</Option>))
                            }
                        </Select>
                    </Col>
                </Row>
                <Row gutter={[16,32]}>
                    <Col span={24} className="form-container">
                        <Search
                            placeholder="输入姓名或身份证"
                            onSearch={value => this.onSearch(value)}
                            style={{ width: 200 }}
                            enterButton
                        />
                    </Col>
                </Row>
                <Row gutter={[8,8]}>
                    <Col span={24} className="form-container">
                        <List
                            itemLayout="horizontal"
                            dataSource={this.props.audit.findStudent}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={<a onClick={() => this.onClick(item)}>{item.name}</a>}
                                        description={item.username}
                                    />
                                </List.Item>)}
                        />
                    </Col>
                </Row>
            </div >
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuditPage))
