import React, { Component } from 'react'
import { List, Skeleton, message,Popconfirm } from 'antd';
import { MinusOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'


export default class CertList extends Component {
  constructor(props) {
    super(props)
    this.listItems = this.listItems.bind(this)
  }
  componentDidMount() {
    this.props.actions.getSelectedCert({ username: this.props.application.username })
    this.props.actions.getCertCourse({ username: this.props.application.username })
  }

  onRemove = cert => {
    this.props.actions.postDelCert({ ID: cert.ID, mark: 0 })
  }

  onCancel = () =>{

  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.cert.delCertRes === null && nextProps.cert.delCertRes && nextProps.cert.delCertRes.status === 0) {
      message.success('移除成功')
      this.props.actions.getRestCert({ username: this.props.application.username })
      this.props.actions.getSelectedCert({ username: this.props.application.username })
      this.props.actions.getCertCourse({ username: this.props.application.username })
      this.props.actions.resetDelCert()
    }
  }

  listItems(item) {
    return (
      <ul style={{textAlign: 'left', padding: 0}}>
        {this.props.cert.certCourse.filter(course => course.refID === item.ID).map(course => (
          <li style={{ listStyleType: 'none', margin: 0, padding: 0 }} key={course.ID}><p style={{ fontSize: '10px',textAlign: 'left' }}>{course.courseName}&nbsp;&nbsp;课时：{course.hours}小时</p></li>
        ))}
      </ul>
    )
  }

  render() {
    const { loading } = this.props
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
