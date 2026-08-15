import React, { Component } from 'react'
import { List, Skeleton, message, Modal, Button, Radio, Form, DatePicker, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import 'antd/dist/antd.css'
import moment from 'moment'
import 'moment/locale/zh-cn'
// import locale from 'antd/es/date-picker/locale/zh_CN';
import locale from 'antd/lib/date-picker/locale/zh_CN'
moment.locale('zh-cn')

class RestCertList extends Component {
  constructor(props) {
    super(props)
    this.formRef = React.createRef()
    this.state = {
      visible: false,
      retrain: 0,
      selectedItem: null
    }
  }
  componentDidMount() {
    this.props.actions.getRestCert({ username: this.props.application.username, host: window._host })
  }

  onAdd = cert => {
    this.props.actions.postAddCert({ username: this.props.application.username, certID: cert.certID, mark: 0, reexamine: 0, fromID: window._sales, url:this.getSubdomain() });
    // console.log("_host1:", window._host, window._sales);
    this.setState({ visible: false })
  }

  onAddretrain = cert => {
    this.props.actions.postAddCert({ username: this.props.application.username, certID: cert.certID, mark: 0, reexamine: 1, fromID: window._sales, url:this.getSubdomain() });
    // console.log("_host2:", window._host, window._sales);
    this.setState({ visible: false })

  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.cert.addCertRes === null && nextProps.cert.addCertRes && nextProps.cert.addCertRes.status === 0) {
      message.success('选择成功')
      this.props.actions.getRestCert({ username: this.props.application.username, host: window._host })
      this.props.actions.getSelectedCert({ username: this.props.application.username })
      this.props.actions.getCertCourse({ username: this.props.application.username })
      this.props.actions.resetAddCert()
    } else if (this.props.cert.addCertRes === null && nextProps.cert.addCertRes && nextProps.cert.addCertRes.status !== 0) {
      message.error({
        content: (<div>
          <p>{nextProps.cert.addCertRes.msg}</p>
          {/* <a onClick={() => { this.props.history.push('/userinfo') }}>前往个人信息</a> */}
        </div>)
      })
      this.props.actions.resetAddCert()
    }
  }


  getSubdomain = () => {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    if (parts.length > 2) {
      return parts[0]; // 这里返回的是二级域名
    } else {
      return ''; // 或者抛出错误，取决于你的需求
    }
  }

  handleCancel = () => {
    this.formRef.current && this.formRef.current.resetFields()
    this.setState({ visible: false, selectedItem: null })
  }
  handleOK = async () => {
    const { selectedItem } = this.state
    if (!selectedItem || !this.formRef.current) return

    const values = await this.formRef.current.validateFields()
    this.props.actions.postAddCert({ ...values, username: this.props.application.username, certID: selectedItem.certID, mark: 0, fromID: window._sales, url:this.getSubdomain() });
    console.log("_host3:", window._host, window._sales);
    this.formRef.current.resetFields()
    this.setState({ visible: false, selectedItem: null })
  }

  handleOpen = item => {
    this.setState({ visible: true, selectedItem: item, retrain: 0 }, () => {
      this.formRef.current && this.formRef.current.resetFields()
    })
  }

  getSelectOptions = item => {
    if (!item || !item.memo) return []

    try {
      const memo = JSON.parse(item.memo)
      return Array.isArray(memo)
        ? memo.map(option => ({ value: option.ID, label: option.title }))
        : []
    } catch (error) {
      console.error('Invalid certificate memo:', error)
      return []
    }
  }


  onChange1 = e => {
    this.setState({
      retrain: e.target.value,
    });
  };

  render() {
    const { loading } = this.props
    const { visible, selectedItem } = this.state
    return (
      <List
        header={
          <div>
            <b>可选证书</b>
          </div>
        }
        style={{ textAlign: 'left' }}
        itemLayout="horizontal"
        size="large"
        dataSource={this.props.cert.restCert.filter(restCert => restCert.mark === 0)}
        renderItem={item => (
          <List.Item
            key={item.certID}
            actions={item.reexamine !== 1 ? [<a key="list-loadmore-edit" onClick={() => this.onAdd(item)} style={{ color: 'darkOrange' }}><PlusOutlined /></a>] :
              [
                <div>{selectedItem && selectedItem.certID === item.certID ? <Modal
                  visible={visible}
                  title=""
                  onOk={this.handleOK}
                  onCancel={this.handleCancel}
                  footer={[
                    <Button key="first" onClick={this.handleOK} type="primary">
                      确定
                    </Button>,
                    <Button
                      key="link"
                      loading={loading}
                      onClick={this.handleCancel}
                    >
                      取消
                    </Button>,
                  ]}
                >
                  <Form
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{
                      reexamine: 0,
                    }}
                    ref={this.formRef}
                  >
                  {
                    this.state.selectedItem && this.state.selectedItem.certID === 'C14' ? <Form.Item
                      name="SEID"
                      label="复审项目"
                      rules={[{ required: true, message: '请选择复审项目' }]}  // 只需非空校验
                    >
                      <Select
                        showSearch                    // 启用搜索
                        placeholder="选择项目"
                        optionFilterProp="label"
                        options={this.getSelectOptions(selectedItem)}
                        filterOption={(input, option) =>
                          String(option && option.label || '').toLowerCase().includes(input.toLowerCase())
                        }
                      />
                      </Form.Item> : 
                      <Form.Item name="reexamine" className="collection-create-form_last-form-item">
                        <Radio.Group onChange={this.onChange1}>
                          <Radio value={0}>初训</Radio>
                          <Radio value={1}>换证</Radio>
                        </Radio.Group>
                      </Form.Item>
                    }
                    {this.state.retrain === 1 || this.state.selectedItem.certID === 'C14' ? <Form.Item name="currDiplomaDate" label="应换证/复审日期">
                      <DatePicker locale={locale} />
                    </Form.Item> : null}

                  </Form>
                </Modal> : null}
                  <a key="list-loadmore-edit" onClick={() => this.handleOpen(item)} style={{ color: 'darkOrange' }}><PlusOutlined /></a>
                </ div>]}
          >
            <Skeleton active loading={loading}>
              <List.Item.Meta
                title={<a>{item.certName}</a>}
              />
            </Skeleton>
          </List.Item>
        )
        }
      />
    )
  }
}

export default withRouter(RestCertList)
