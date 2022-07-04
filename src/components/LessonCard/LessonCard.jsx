import React, { Component } from 'react'
import { Card, Row, Col, Progress, message, Button } from 'antd'
import { withRouter } from 'react-router-dom'
import { RightOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'

class LessonCard extends Component {

    onClick = (lesson) => {

        this.props.actions.updateCurrentLesson(lesson)
        this.props.history.push("/classpage")
    }

    onClickExam = paperID => {
        this.props.examActions.updateLeave(true)
        this.props.examActions.getExam({ paperID })
    }

    componentDidUpdate = prevProps => {
        if (this.props.exam.exam && prevProps.exam.exam !== this.props.exam.exam) {
            if (this.props.exam.exam[0].missingItems) {
                message.info({
                    content: '请填写' + this.props.exam.exam[0].missingItems,
                    style: {
                        marginTop: '50%',
                        color: 'red',
                        textAlign: 'left'
                    },
                    duration: 10,
                })
                this.props.history.push("/userinfo")
            } else if (this.props.exam.exam[0].startExamMsg !== "") {
                message.info(this.props.exam.exam[0].startExamMsg)
            } else {
                this.props.history.push("/exampage")
                this.props.examActions.getExamQuestion({ paperID: this.props.exam.exam[0].paperID })
            }
        }
    }

    gridStyle = {
        width: '100%',
        textAlign: 'left',
    };



    onClickCommentPage = () => {
        this.props.history.push(`/classcommentpage?classID=${this.props.course.classID}`);
    };

    render() {
        const { course } = this.props
        const { lessons } = this.props

        return (
            <Row key={course.lessonID} gutter={[16, 32]}>
                <Col span={24}>
                    <Card title={course.courseName + [course.re !== 0 ? '(' + course.reexamineName + ')' : null]} style={{ textAlign: 'left' }} extra={<div>{[course.type === 0 ? <span style={{ color: 'red' }}>{course.checkName}&nbsp;</span> : null]} <a>{course.statusName}</a></div>}>{
                        course.status < 2 ? <Card.Grid style={this.gridStyle}>
                            {course.completion ? <Progress percent={course.completion} size="small" /> : null}<p>时长：{course.hours}</p>
                            <p>开始日期：{course.startDate}</p>
                            <p>结束日期：{course.endDate}</p>
                            <p>完成条件：{course.pass_condition}</p>
                            {!this.props.application.teacher?<Button type='primary' onClick={() => this.onClickCommentPage()} >课程答疑</Button>:null}
                        </Card.Grid> : null}
                        {course.status < 2 ? <Card.Grid style={this.gridStyle}>
                            <b>课程内容</b>
                            <p> </p>
                            <ul style={{ textAlign: 'left', margin: 0, padding: 0 }}>
                                {lessons.filter(lesson => lesson.refID === course.ID).map((lesson, index) => (
                                    <li style={{ listStyleType: 'none', clear: 'both' }} key={lesson.ID}>
                                        <p style={{ float: 'left' }}>
                                            <a onClick={() => this.onClick(lesson)}>{index + 1}. {lesson.lessonName}&nbsp;&nbsp;</a>
                                            <span style={{ color: 'lightgray' }}>{lesson.completion}%</span>
                                        </p>

                                    </li>
                                ))}
                                <li key={999} style={{ listStyleType: 'none', clear: 'both' }}>
                                    <span style={{ color: 'lightgray' }}>{course.examTimes}次</span>
                                    <span>{course.type === 0 ? '模拟考试' : '考试'}</span>
                                    <ul style={{ textAlign: 'left', margin: 0, padding: 0 }}>
                                        {
                                            course.paperID !== null && course.paperID !== '' ? JSON.parse(course.paperID)
                                                .map(singlePaperID => (
                                                    <li key={singlePaperID.paperID} style={{ listStyleType: 'none', clear: 'both' }}>
                                                        <p style={{ float: 'left' }}>
                                                            <a onClick={() => this.onClickExam(singlePaperID.paperID)}>*&nbsp;&nbsp;{singlePaperID.item}&nbsp;&nbsp;&nbsp;</a><span style={{ color: 'lightgray' }}>
                                                                {singlePaperID.examScore}分&nbsp;&nbsp;</span>
                                                        </p>
                                                    </li>
                                                ))
                                                : null}
                                    </ul>
                                </li>
                                {/* {course.paperID !== null && course.paperID !== '' ? <li key={999} style={{ listStyleType: 'none', clear: 'both' }}>
                                    <p style={{ float: 'left' }}>
                                        <a onClick={() => this.onClickExam(course)}>*&nbsp;&nbsp;{course.type === 0 ? '模拟考试' : '考试'}&nbsp;&nbsp;&nbsp;</a><span style={{ color: 'lightgray' }}>
                                            {course.examScore}分&nbsp;&nbsp;</span>
                                        <span style={{ color: 'lightgray' }}>{course.examTimes}次</span>
                                    </p>
                                </li> : null} */}
                            </ul>

                        </Card.Grid> : null}


                    </Card>
                </Col>
            </Row>
        )
    }
}

export default withRouter(LessonCard)
