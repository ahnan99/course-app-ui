import React, { Component } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions as AuditActions } from '../../modules/audit'
import { Row, Col, Button, Spin, message, Breadcrumb } from 'antd'
import { bindActionCreators } from 'redux'
import axios from 'axios'
import './AuditPage.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
class CertImage extends Component {
    constructor(props) {
        super(props)
        this.divRef = React.createRef()
        this.state = {
            loading: true,
            numPages: null,
            pageNumber: 1,
            width: 0
        }
        window.addEventListener("resize", this.update);
    }

    onLoadError = () => {
        message.error('文档载入失败')
        this.setState({ loading: false })
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages, loading: false })
    }

    update = () => {
        this.setState({
            width: this.divRef.current.offsetWidth
        })
    }

    componentDidMount() {
        this.update()
    }

    onClickBack = () => {
        this.props.actions.updateSelectedCert(null)
        this.props.history.push('/certpage')
    }
    render() {
        const { pageNumber } = this.state
        const { width } = this.state
        return (
            <div style={{ width: "100%" }} ref={this.divRef}>
                <Row gutter={[16, 32]}>
                    <Col span={24} style={{ textAlign: 'left' }}>
                        <Breadcrumb>
                            <Breadcrumb.Item>学员证书列表</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row gutter={[16, 32]}>
                    <Col span={24} className="form-container">
                        <Document
                            file={axios.defaults.baseURL + this.props.audit.selectedCert.filename}
                            onLoadSuccess={this.onDocumentLoadSuccess}
                            onLoadError={this.onLoadError}
                        >
                            <Page pageNumber={pageNumber}
                                width={width} />
                        </Document>
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
    audit: state.audit,
})


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(AuditActions, dispatch)
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CertImage))
