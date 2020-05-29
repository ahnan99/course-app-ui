import React, { Component } from 'react'
import { List, Skeleton, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'

export default class RestCertList extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.actions.getRestCert({ username: this.props.application.username })
  }

  onAdd = cert => {
    this.props.actions.postAddCert({ username: this.props.application.username, certID: cert.certID, mark: 0 })
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.cert.addCertRes === null && nextProps.cert.addCertRes && nextProps.cert.addCertRes.status === 0) {
      message.success('选择成功')
      this.props.actions.getRestCert({ username: this.props.application.username })
      this.props.actions.getSelectedCert({ username: this.props.application.username })
      this.props.actions.getCertCourse({ username: this.props.application.username })
      this.props.actions.resetAddCert()
    } else if (this.props.cert.addCertRes === null && nextProps.cert.addCertRes && nextProps.cert.addCertRes.status !== 0) {
      message.error(nextProps.cert.addCertRes.msg)
    }
  }

  render() {
    const { loading } = this.props
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
            actions={[<a key="list-loadmore-edit" onClick={() => this.onAdd(item)} style={{ color: 'darkOrange' }}><PlusOutlined /></a>]}
          >
            <Skeleton active loading={loading}>
              <List.Item.Meta
                title={<a>{item.certName}</a>}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    )
  }
}
