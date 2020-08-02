import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import React, {Component} from 'react'
import { connect } from 'react-redux';
import { actions as RegisterActions } from '../../modules/application'
import {bindActionCreators} from 'redux'


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 10;
  if (!isLt2M) {
    message.error('Image must smaller than 10MB!');
  }
  return isJpgOrPng && isLt2M;
}

class Avatar extends Component {
  state = {
    loading: false,
    imageUrl: null,
    imageHash: Date.now()
  };



  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done' && info.file.response && info.file.response.status === 0) {
      // Get this url from response in real world.
      message.success('上传成功已保存')
      this.props.actions.getUserInfo({ username: this.props.application.username })    
      this.setState({imageHash:Date.now()})
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.props;
    const { imageHash } = this.state
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        withCredentials
        showUploadList={false}
        action={this.props.action}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img key={imageHash} src={`${imageUrl}?${imageHash}`} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}


const mapStateToProps = state => ({
  application: state.application,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(RegisterActions, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(Avatar)