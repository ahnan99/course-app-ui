import React, { Component } from 'react'
import { List, Skeleton, message,Popconfirm } from 'antd';
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
    this.props.actions.postDelCert({ ID: cert.ID, mark:1 })
  }

  onCancel = () =>{

  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.cert.delCertRes === null && nextProps.cert.delCertRes && nextProps.cert.delCertRes.status === 0) {
      this.props.actions.getRestCert({ username: this.props.application.username })
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
            <b>课程</b>
          </div>
        }
        style={{ textAlign: 'left' }}
        itemLayout="horizontal"
        size="large"
        dataSource={this.props.cert.certCourse.filter(course => course.refID === 0)}
        renderItem={item => (
          <List.Item
            key={item.ID}
            actions={item.completion>0?[<Popconfirm
                title="该课程已有的学习记录将被清空，确认要删除吗？"
                onConfirm={() => this.onRemove(item)}
                onCancel={this.onCancel}
                okText="Yes"
                cancelText="No"
              >
                <a key={item.ID} style={{ color: 'darkOrange' }}><MinusOutlined /></a>
              </Popconfirm>
              

            ]:[<a key={item.ID} onClick={() => this.onRemove(item)} style={{ color: 'darkOrange' }}><MinusOutlined /></a>]}
          >
            <Skeleton active loading={loading}>
              <List.Item.Meta
                title={<a>{item.courseName}</a>}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    )
  }
}
