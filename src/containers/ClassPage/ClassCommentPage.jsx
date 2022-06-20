import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Layout, Button, Breadcrumb, Spin, Form, Input } from 'antd'
import { Comment, List, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import { withRouter } from 'react-router-dom'
import { actions as MessageActions } from '../../modules/message'
import { bindActionCreators } from 'redux'
import qs from 'qs'
import 'antd/dist/antd.css';

const { TextArea } = Input;
class ClassCommentPage extends Component {
    constructor(props) {
        super(props)
        moment.locale('zh-cn')
        this.state = { value: '', submitting: false }
        this.commentEditorRef = React.createRef()


    }


    componentWillMount() {
        if (qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).classID && this.props.application.username) {
            this.props.actions.getClassComment({
                classID: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).classID,
                username: this.props.application.username
            })

            this.interval = setInterval(() => {
                this.props.actions.getClassComment({
                    classID: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).classID,
                    username: this.props.application.username
                })
            }, 30000)
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }


    componentDidUpdate = prevProps => {
        if (this.props.message.postClassComment && !prevProps.message.postClassComment) {
            this.props.actions.getClassComment({
                classID: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).classID,
                username: this.props.application.username
            })
            this.setState({ value: '' })
            this.props.actions.updatePostClassComment(null);
        }
        if (this.props.message.deleteClassComment && !prevProps.message.deleteClassComment) {
            this.props.actions.getClassComment({
                classID: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).classID,
                username: this.props.application.username
            })
            this.props.actions.updateDeleteClassComment(null);
        }
    }

    handleChange = e => {
        this.setState({ value: e.target.value })
    }

    handleSubmit = () => {
        this.props.actions.postClassComment({ item: this.state.value, classID: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).classID, username: this.props.application.username });
    }

    onClickDeleteComment = commentID => {
        this.props.actions.deleteClassComment({ ID: commentID })
    }

    onClickBack = () => {
        this.props.history.push('/homepage')
    }

    render() {
        const { value, submitting } = this.state;
        const { classComment } = this.props.message;
        if (!this.props.message.classComment) {
            return (

                <Row className="form-row">
                    <Col xs={2} sm={4} md={6} lg={8} xl={8}>
                    </Col>
                    <Col xs={20} sm={16} md={12} lg={8} xl={8} className="form-container">
                        <Spin spinning={true} />
                    </Col>
                    <Col xs={2} sm={4} md={6} lg={8} xl={8}>
                    </Col>
                </Row>
            )
        }
        return (
            <div>
                <Row>
                    <Col span={24} style={{ textAlign: 'left' }}>
                        <Breadcrumb>
                            <Breadcrumb.Item>课程答疑</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'left' }} ref={this.commentEditorRef}>
                        <Comment
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/jai" alt="Han Solo"
                                style={{ "width": "100%" }}
                            />}
                            content={
                                <div>
                                    <Form.Item>
                                        <TextArea rows={4} onChange={e => this.handleChange(e)} value={value} />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button htmlType="submit" loading={submitting} onClick={() => this.handleSubmit()} type="primary" style={{ marginLeft: '30px' }}>
                                            发表评论
                                        </Button>
                                        <Button type='primary' onClick={() => this.onClickBack()} style={{ marginLeft: '30px' }}>返回</Button>
                                    </Form.Item>
                                </div>
                            }
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'left' }}>
                        <List
                            className="comment-list"
                            header={`${classComment.length} 个回复`}
                            itemLayout="horizontal"
                            dataSource={classComment}
                            renderItem={item => (
                                <li>
                                    <Comment
                                        actions={item.cancelAllow === 0 ? null : [<span key="comment-list-reply-to-0" onClick={() => this.onClickDeleteComment(item.ID)}>删除评论</span>]}
                                        author={item.title}
                                        avatar={item.username === this.props.application.username ? 'https://joeschmoe.io/api/v1/jai' : 'https://joeschmoe.io/api/v1/jacques'}
                                        content={<p>{item.item}</p>}
                                        datetime={<Tooltip title={moment(item.regDate).format('YYYY-MM-DD HH:mm:ss')}>
                                            <span>{moment(item.regDate).fromNow()}</span>
                                        </Tooltip>}
                                    />
                                </li>
                            )}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'left' }}>
                        <Comment
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/jai" alt="Han Solo"
                                style={{ "width": "100%" }} />}
                            content={
                                <div>
                                    <Form.Item>
                                        <TextArea rows={4} onChange={e => this.handleChange(e)} value={value} />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button htmlType="submit" loading={submitting} onClick={() => this.handleSubmit()} type="primary" style={{marginLeft:'30px'}}>
                                            发送
                                        </Button>
                                        <Button type='primary' onClick={() => this.onClickBack()} style={{marginLeft:'30px'}}>返回</Button>
                                    </Form.Item>
                                </div>
                            }
                        />
                    </Col>
                </Row>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    message: state.message,
    application: state.application
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(MessageActions, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(ClassCommentPage))
