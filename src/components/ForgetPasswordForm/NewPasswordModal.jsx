import React, { Component } from 'react'
import { Modal } from 'antd'


export default class NewPasswordModal extends Component {
    render(){
        return (
            <Modal
                title="Basic Modal"
                visible={this.props.visible}
                onOk={this.props.handleOk}
                onCancel={this.props.handleCancel}
            >
                <p>新的密码已经发送到你的邮箱{this.props.email}</p>
            </Modal>
        )
    }
   
}
