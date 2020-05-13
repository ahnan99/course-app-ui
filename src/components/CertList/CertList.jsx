import React, { Component } from 'react'
import { List, Skeleton, message } from 'antd';
import { MinusOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'


export default class CertList extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true }
    this.listItems = this.listItems.bind(this)
  }
  componentDidMount() {
    this.props.actions.getSelectedCert({ username: this.props.application.username })
    this.props.actions.getCertCourse({ username: this.props.application.username })
  }

  onRemove = cert => {
    this.setState({ loading: true })
    this.props.actions.postDelCert({ ID: cert.ID })
    this.props.actions.getRestCert({ username: this.props.application.username })
    this.props.actions.getSelectedCert({ username: this.props.application.username })
    this.props.actions.getCertCourse({ username: this.props.application.username })
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.cert.selectedCert) {
      this.setState({ loading: false })
    }
    if (this.props.cert.delCertRes === null && nextProps.cert.delCertRes && nextProps.cert.delCertRes.status === 0) {
      message.success('移除成功')
      this.setState({ loading: false })
      this.props.actions.resetDelCert()
    }
  }

  listItems(item){
    return (
      <ul>
        {this.props.cert.certCourse.filter(course => course.refID === item.ID).map(course => (
          <li style={{ listStyleType: 'none', margin: 0, padding: 0 }} key={course.ID}><p style={{ fontSize: '10px' }}>{course.courseName}&nbsp;&nbsp;课时：{course.hours}小时</p></li>
        ))}
      </ul>
    )
  }

render() {
  return (
    <List
      header={
        <div>
          <b>已选证书</b>
        </div>
      }
      style={{ textAlign: 'left' }}
      itemLayout="horizontal"
      size="large"
      dataSource={this.props.cert.selectedCert}
      renderItem={item => (
        <List.Item
          key={item.ID}
          actions={[
            <a key={item.ID} onClick={() => this.onRemove(item)} style={{color:'orange'}}><MinusOutlined /></a>
          ]}
        >
          <Skeleton active loading={this.state.loading}>
            <List.Item.Meta
              title={<a>{item.certName}</a>}
              description={this.listItems(item)}
            />
          </Skeleton>
        </List.Item>
      )}
    />
  )
}
}
