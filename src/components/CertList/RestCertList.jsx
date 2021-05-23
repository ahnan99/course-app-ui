import React, { Component } from 'react'
import { List, Skeleton, message, Modal, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import 'antd/dist/antd.css'

class RestCertList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }
  componentDidMount() {
    this.props.actions.getRestCert({ username: this.props.application.username })
  }

  onAdd = cert => {
    this.props.actions.postAddCert({ username: this.props.application.username, certID: cert.certID, mark: 0, reexamine: 0 })
    this.setState({ visible: false })
  }

  onAddretrain = cert => {
    this.props.actions.postAddCert({ username: this.props.application.username, certID: cert.certID, mark: 0, reexamine: 1 })
    this.setState({ visible: false })

  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.cert.addCertRes === null && nextProps.cert.addCertRes && nextProps.cert.addCertRes.status === 0) {
      message.success('选择成功')
      this.props.actions.getRestCert({ username: this.props.application.username })
      this.props.actions.getSelectedCert({ username: this.props.application.username })
      this.props.actions.getCertCourse({ username: this.props.application.username })
      this.props.actions.resetAddCert()
    } else if (this.props.cert.addCertRes === null && nextProps.cert.addCertRes && nextProps.cert.addCertRes.status !== 0) {
      message.error({
        content: (<div>
          <p>{nextProps.cert.addCertRes.msg}</p>
          <a onClick={() => { this.props.history.push('/userinfo') }}>前往个人信息</a>
        </div>)
      })
      this.props.actions.resetAddCert()
    }
  }


  handleCancel = () => {
    this.setState({ visible: false })
  }

  render() {
    const { loading } = this.props
    const { visible } = this.state
    return (
      <List
        header={
          <div>
            <b>可选证书</b>
          </div>
        }
        style={{ textAlign: 'left' }}
        itemLayout="horizontal"
        size="large"
        dataSource={this.props.cert.restCert.filter(restCert => restCert.mark === 0)}
        renderItem={item => (
          <List.Item
            actions={item.reexamine !== 1 ? [<a key="list-loadmore-edit" onClick={() => this.onAdd(item)} style={{ color: 'darkOrange' }}><PlusOutlined /></a>] :
              [
                <div><Modal
                  visible={visible}
                  title=""
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  footer={[
                    <Button key="first" onClick={() => this.onAdd(item)} type="primary">
                      初训
                    </Button>,
                    <Button key="retrain" type="primary" onClick={() => this.onAddretrain(item)}>
                      复训
                    </Button>,
                    <Button
                      key="link"
                      loading={loading}
                      onClick={this.handleCancel}
                    >
                      取消
                  </Button>,
                  ]}
                ></Modal>
                  <a key="list-loadmore-edit" onClick={() => { this.setState({ visible: true }) }} style={{ color: 'darkOrange' }}><PlusOutlined /></a>
                </ div>]}
          >
            <Skeleton active loading={loading}>
              <List.Item.Meta
                title={<a>{item.certName}</a>}
              />
            </Skeleton>
          </List.Item>
        )
        }
      />
    )
  }
}

export default withRouter(RestCertList)