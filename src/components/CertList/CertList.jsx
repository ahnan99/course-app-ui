import React, { Component } from 'react'
import { List, Avatar, Space, message } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

export default class CertList extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.actions.getSelectedCert({ username: this.props.application.username })
    this.props.actions.getCertCourse({ username: this.props.application.username })
  }

  onRemove = cert => {
    this.props.actions.postDelCert({ ID: cert.ID })
    this.props.actions.getSelectedCert({ username: this.props.application.username })
    this.props.actions.getCertCourse({ username: this.props.application.username })
  }

  componentWillReceiveProps = (nextProps) =>{
    if(nextProps.cert.delCertRes && nextProps.cert.delCertRes.status ===0){
      message.success('移除成功')
    }
  }

  render() {
    return (
      <List
        header={
          <div>
            <b>已选证书</b>
          </div>
        }
        itemLayout="horizontal"
        size="large"
        dataSource={this.props.cert.selectedCert}
        renderItem={item => (
          <List.Item
            key={item.ID}
            actions={[
              <a key={item.ID} onClick={() => this.onRemove(item)}>移除证书</a>
            ]}
          >
            <List.Item.Meta
              title={<a>{item.certName}</a>}
            />
            <ul style={{ textAlign: 'left' }}>
              {this.props.cert.certCourse.filter(course => course.refID === item.ID).map(course => (
                <li key={course.ID}><a>{course.courseName}</a>&nbsp;&nbsp;<a>课程时长：{course.hours}小时</a></li>
              ))}
            </ul>
          </List.Item>
        )}
      />
    )
  }
}
