import React, { Component } from 'react'
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';


const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
export default class CourseList extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.actions.getSelectedCert({ username: this.props.application.username })
    this.props.actions.getCertCourse({ username: this.props.application.username })
  }

  render() {
    return (
      <List
        header={
          <div>
            <b>已选课程</b>
          </div>
        }
        itemLayout="vertical"
        size="large"
        dataSource={this.props.cert.selectedCert}
        renderItem={item => (
          <List.Item
            key={item.ID}
            actions={[
              <IconText icon={StarOutlined} text="移除课程" key="list-vertical-star-o" onClick={()=>console.log('g')}/>,
            ]}
          >
            <List.Item.Meta
              title={<a>{item.certName}</a>}
            />
            <ul>
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
