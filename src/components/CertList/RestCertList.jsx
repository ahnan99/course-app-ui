import React, { Component } from 'react'
import { List, Avatar, Space, message } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

export default class RestCertList extends Component {
    constructor(props) {
        super(props)
      }
      componentDidMount() {
        this.props.actions.getRestCert({ username: this.props.application.username })
      }
    
      onAdd = cert => {
        this.props.actions.postAddCert({ username:this.props.application.username,certID: cert.certID })
        this.props.actions.getRestCert({ username: this.props.application.username })
      }
    
      componentWillReceiveProps = (nextProps) =>{
        if(nextProps.cert.addCertRes && nextProps.cert.addCertRes.status ===0){
          message.success('选择成功')
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
            dataSource={this.props.cert.restCert}
            renderItem={item => (
              <List.Item
              actions={[<a key="list-loadmore-edit" onClick={()=>this.onAdd(item)}>添加</a>]}
            >
              <Skeleton active>
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
