import React, { Component } from 'react'
import { List, Skeleton, message, Popconfirm } from 'antd';
import { MinusOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'


export default class CertList extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.actions.getSelectedCert({ username: this.props.application.username })
    this.props.actions.getCertCourse({ username: this.props.application.username })
  }

  onRemove = cert => {
    if (cert.cancelAllow === 0) {
      this.props.actions.postDelCert({ ID: cert.ID, mark: 1 })
    } else {
      message.error('無法刪除')
    }
  }

  onCancel = () => {

  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.cert.delCertRes === null && nextProps.cert.delCertRes && nextProps.cert.delCertRes.status === 0) {
      this.props.actions.getRestCert({ username: this.props.application.username, host: window._host })
      this.props.actions.getSelectedCert({ username: this.props.application.username })
      this.props.actions.getCertCourse({ username: this.props.application.username })
      this.props.actions.resetDelCert()
    }
  }



  render() {
    const { loading } = this.props
    return (
      <List
        header={
          <div>
            <b>已选课程</b>
          </div>
        }
        style={{ textAlign: 'left' }}
        itemLayout="horizontal"
        size="large"
        dataSource={this.props.cert.certCourse.filter(course => course.refID === 0)}
        renderItem={item => (
          <List.Item
            key={item.ID}
            actions={item.completion > 0 && item.cancelAllow === 0 ? [<Popconfirm
              title="该课程已有的学习记录将被清空，确认要删除吗？"
              onConfirm={() => this.onRemove(item)}
              onCancel={this.onCancel}
              okText="Yes"
              cancelText="No"
            >
              <a key={item.ID} style={{ color: 'darkOrange' }}><MinusOutlined /></a>
            </Popconfirm>


            ] : [<a key={item.ID} onClick={() => this.onRemove(item)} style={{ color: 'darkOrange' }}><MinusOutlined /></a>]}
          >
            <Skeleton active loading={loading}>
              <List.Item.Meta
                title={<a>{item.courseName + [item.re !== 0 ? '(' + item.reexamineName + ')' : null]}</a>}
                description={<p style={{ fontSize: '10px' }}>课时：{item.hours}小时</p>}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    )
  }
}
