import React, { Component } from 'react'
import { List, Skeleton, message } from 'antd';
import {PlusOutlined} from '@ant-design/icons'
import 'antd/dist/antd.css'

export default class RestCertList extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true }
  }
  componentDidMount() {
    this.props.actions.getRestCert({ username: this.props.application.username })
  }

  onAdd = cert => {
    this.setState({ loading: true })
    this.props.actions.postAddCert({ username: this.props.application.username, certID: cert.certID })
    this.props.actions.getRestCert({ username: this.props.application.username })
    this.props.actions.getSelectedCert({ username: this.props.application.username })
    this.props.actions.getCertCourse({ username: this.props.application.username })

  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.cert.restCert) {
      this.setState({ loading: false })
    }
    if (this.props.cert.addCertRes === null && nextProps.cert.addCertRes && nextProps.cert.addCertRes.status === 0) {
      message.success('选择成功')
      this.props.actions.resetAddCert()
      this.setState({ loading: false })
    }
  }

  render() {
    return (
      <List
        header={
          <div>
            <b>可选证书</b>
          </div>
        }
        style={{textAlign: 'left'}}
        itemLayout="horizontal"
        size="large"
        dataSource={this.props.cert.restCert}
        renderItem={item => (
          <List.Item
            actions={[<a key="list-loadmore-edit" onClick={() => this.onAdd(item)}><PlusOutlined /></a>]}
          >
            <Skeleton active loading={this.state.loading}>
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
