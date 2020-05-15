import React, { Component } from 'react'
import { Table, Modal } from 'antd'



export default class MessageTable extends Component {

    columns = [
        {
            title: '消息',
            dataIndex: 'item',
            key: 'item',
            render: (text, record) => <a key={record.ID} onClick={() => this.onClick(record)}>{text}</a>,
        },
        {
            title: '日期',
            dataIndex: 'regDate',
            key: 'regDate',
        render: (text,record) => <p key={record.ID}>{text.slice(0,9)}</p>
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
    }

    render() {
        return (
            <div>
                <Modal visible={this.state.visible} onCancel={this.onCancel}>
                    <p>{this.props.message.singleMessage ? this.props.message.singleMessage : "No conetent"}</p>
                </Modal>
                <Table dataSource={this.props.message.messageList} columns={this.columns} />
            </div>
        )
    }
}
