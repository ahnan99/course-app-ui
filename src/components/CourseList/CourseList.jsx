import React, { Component } from 'react'
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';


const listData = [];
for (let i = 0; i < 8; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}
const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
export default class CourseList extends Component {
    constructor(props){
        super(props)
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
            dataSource={listData}
            renderItem={item => (
              <List.Item
                key={item.title}
                actions={[
                  <IconText icon={StarOutlined} text="移除课程" key="list-vertical-star-o" href='#'/>,
                ]}
              >
                <List.Item.Meta
                  title={<a href={item.href}>{item.title}</a>}
                />
                {item.content}
              </List.Item>
            )}
          />
        )
    }
}
