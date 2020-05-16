import React, { Component } from 'react'
import { Table, Modal, Button } from 'antd'



export default class MessageTable extends Component {

    columns = [
        {
            title: '消息',
            dataIndex: 'item',
            key: 'item',
            ellipsis: true,
        render: (text, record) => <a key={record.ID} onClick={() => this.onClick(record)}>{record.status==0?<span style={{color:'red'}}>*</span>:''}{text}</a>,
        },
        {
            title: '日期',
            dataIndex: 'regDate',
            key: 'regDate',
        render: (text,record) => <p key={record.ID}>{text.slice(0,10)}</p>
        },
    ]

    state = {
        visible: false
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.message.singleMessage) {
            this.setState({ visible: true })
        } else {
            this.setState({ visible: false })
        }
    }

    onClick = (record) => {
        this.props.actions.getSingleMessage({ ID: record.ID })
        
    }

    onCancel = () => {
        this.props.actions.updateSingleMessage(null)
        this.props.actions.getMessage({username: this.props.application.userInfo.username})
        this.props.userActions.getUserInfo({username:this.props.application.userInfo.username})
    }

    render() {
        return (
            <div>
                <Modal visible={this.state.visible} onCancel={this.onCancel} onOk={this.onCancel} footer={[<Button onClick={this.onCancel}>确定</Button>]}>
                    <p key={1}>{this.props.message.singleMessage ? this.props.message.singleMessage[0].item : "Loading"}</p>
                </Modal>
                <Table rowKey={record=>record.ID} dataSource={this.props.message.messageList} columns={this.columns} />
            </div>
        )
    }
}
