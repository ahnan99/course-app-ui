import React, { Component } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Row, Col } from 'antd'
import { connect } from 'react-redux'
import { actions as CourseActions } from '../../modules/courses'
import { bindActionCreators } from 'redux'
import axios from 'axios'
import './PDFView.css'



pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class PDFView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numPages: null,
      pageNumber: 1,
      width: 0
    }
    window.addEventListener("resize", this.update);
  }
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages })
  }

  update = () => {
    this.setState({
      width: window.innerWidth
    })
  }
  componentDidMount() {
    this.update();
  }

  render() {
    const { pageNumber, numPages } = this.state
    const { width } = this.state
    if (!this.props.course.currentPDF) {
      return (<h2>No PDF found</h2>)
    }
    return (
      <div className="document">
        <Row>
          <Col span={24} ref="parentCol">
            <Document
              file={axios.defaults.baseURL + this.props.course.currentPDF.filename}
              onLoadSuccess={this.onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber}
                width={width*0.9} />
            </Document>
            <p>Page {pageNumber} of {numPages}</p>
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  course: state.course,
})


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(CourseActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PDFView);
