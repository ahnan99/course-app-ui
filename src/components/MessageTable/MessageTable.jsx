import React, { Component } from 'react'
import { Table, Modal } from 'antd'


const columns = [
    {
        title: '消息',
        dataIndex: 'item',
        key: 'item',
        render: (text, record) => <a onClick={() => this.onClick(record)}>{text}</a>,
    },
    {
        title: '日期',
        dataIndex: 'regDate',
        key: 'regDate',
    },
]

export default class MessageTable extends Component {

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
    }

    render() {
        return (
            <div>
                <Modal visible={this.state.visible} onCancel={this.onCancel}>
                    <span>{this.props.message.singleMessage ? this.props.message.singleMessage : "No conetent"}</span>
                </Modal>
                <Table dataSource={this.props.message.messageList} columns={columns} />
            </div>
        )
    }
}
