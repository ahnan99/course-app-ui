import React, { Component } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Row, Col, Button, Spin } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions as CourseActions } from '../../modules/courses'
import { bindActionCreators } from 'redux'
import axios from 'axios'
import './PDFView.css'



pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class PDFView extends Component {
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
    this.setState({ pageNumber: this.props.course.currentPDF.lastPage })
  }

  previousPage = () => {
    const { pageNumber } = this.state
    const { currentPDF } = this.props.course
    if (pageNumber > 1) {
      this.setState({ pageNumber: pageNumber - 1 }, () => {
        this.props.actions.postMaxPage({ ID: currentPDF.ID, currentPage: this.state.pageNumber })
      })
    }
  }

  backToLesson = () => {
    this.props.history.push('/classpage')
  }

  nextPage = () => {
    const { pageNumber, numPages } = this.state
    const { currentPDF } = this.props.course
    if (pageNumber < numPages) {
      this.setState({ pageNumber: pageNumber + 1 }, () => {
        this.props.actions.postMaxPage({ ID: currentPDF.ID, currentPage: this.state.pageNumber })
      })
    }
  }

  render() {
    const { pageNumber, numPages } = this.state
    const { width } = this.state
    if (!this.props.course.currentPDF) {
      return (<h2>No PDF found</h2>)
    }
    return (
      <Spin spinning={this.state.loading}>
        <div className="document" ref={this.divRef}>
          <Row>
            <Col span={24} ref="parentCol">
              <Document
                file={axios.defaults.baseURL + this.props.course.currentPDF.filename}
                onLoadSuccess={this.onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber}
                  width={width} />
              </Document>
            </Col>
          </Row>
          <Row >
            <Col span={24} style={{ textAlign: 'center' }}>
              <Button onClick={() => this.previousPage()}>上一页</Button><Button onClick={() => this.nextPage()}>下一页</Button>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'center' }}>
              <p>Page {pageNumber} of {numPages}</p>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'center' }}>
              <Button type='primary' onClick={() => this.backToLesson()}>返回课程</Button>
            </Col>
          </Row>
        </div>
      </Spin>
    );
  }
}
const mapStateToProps = state => ({
  course: state.course,
})


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(CourseActions, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PDFView));
