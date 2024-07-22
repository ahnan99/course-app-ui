import React, { Component } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Row, Col, Button, Spin, message, Breadcrumb } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { actions as UserActions } from "../../modules/user";
import { bindActionCreators } from "redux";
import axios from "axios";
import "../PDFView/PDFView.css";

// pdfjs.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.min.js';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

class InvoicePage extends Component {
  constructor(props) {
    super(props);
    this.divRef = React.createRef();
    this.state = {
      loading: false,
      width: 0,
      numPages: null
    };
    // window.addEventListener("resize", this.update);
  };

  onLoadError = () => {
    message.error("文档载入失败, 请尝试直接下载。");
    this.setState({ loading: false });
  };

  onRenderSuccess = () => {
    this.setState({ width: this.divRef.current.offsetWidth });
  };
  componentDidMount() {
    // this.update();
    this.props.actions.getInvoice({ username: this.props.application.username } )
  }

  backToLesson = () => {
    this.props.history.push("/homepage");
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages, loading: false });
  };

  // update = () => {
  //   this.setState({
  //     width: this.divRef.current.offsetWidth
  //   });
  // };
  render() {
    const { width } = this.state;
    if (!this.props.user.invoiceList.length) {
      return <h2>当前还没有发票</h2>;
    }
    return (
      <Spin spinning={this.state.loading}>
        <div className="document" style={{ width: "100%" }} ref={this.divRef}>
          <div style={{ backgroundColor: "#F0FFFF" }}>
            <h2 style={{ textAlign: "left" }}>我的发票</h2>
          </div>
          {
            this.props.user.invoiceList.map((invoice, index) => (
              <Row>
              <Col flex="auto" style={{ textAlign: "left" }}>
              <iframe src={(invoice.filename.indexOf("https://")===-1 ? axios.defaults.baseURL : "") + invoice.filename + '?times=' + (new Date().getTime()) + '#view=fit'} style={{border:'0px'}}></iframe>
                {/*<Document
                  file={
                    (invoice.filename.indexOf("https://")===-1 ? axios.defaults.baseURL : "") + invoice.filename
                  } options={{
                    cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
                    cMapPacked: true,
                    standardFontDataUrl: 'standard_fonts/'
                    // disableWorker: true
                  }}
                  onLoadError={this.onLoadError}
                  onLoadSuccess={this.onDocumentLoadSuccess}
                >
                <Page pageNumber={1} width={this.state.width} onRenderSuccess={this.onRenderSuccess} />
                </Document> */}
              </Col>
              <Col flex="none">
                <div>
                  <a href={(invoice.filename.indexOf("https://")===-1 ? axios.defaults.baseURL : "") + invoice.filename + '?response-content-type=application/octet-stream'} download target="_blank" style={{fontSize:'1.4em'}}>下载发票</a>
                </div>
              </Col>
            </Row>
            ))
          }
          <Row>
            <Col span={24} style={{ textAlign: "center" }}>
              <Button type="primary" onClick={() => this.backToLesson()}>
                返回
              </Button>
            </Col>
          </Row>
        </div>
      </Spin>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  application: state.application
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(UserActions, dispatch),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InvoicePage)
);
