import React, { Component } from 'react'
import { Card, Row, Col, Progress } from 'antd'
import { withRouter } from 'react-router-dom'
import { RightOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'

class LessonCard extends Component {

    onClick = (lesson) => {

        this.props.actions.updateCurrentLesson(lesson)
        this.props.history.push("/classpage")
    }

    onClickExam = course => {
        this.props.examActions.getExam({ paperID: course.paperID })
        this.props.examActions.getExamQuestion({ paperID: course.paperID })
        this.props.history.push("/exampage")
    }

    gridStyle = {
        width: '100%',
        textAlign: 'left',
    };

    render() {
        const { course } = this.props
        const { lessons } = this.props

        return (
            <Row key={course.lessonID} gutter={[16, 32]}>
                <Col span={24}>
                    <Card title={course.courseName} style={{ textAlign: 'left' }} extra={<a>{course.statusName}</a>}>{
                        course.status < 2 ?<Card.Grid style={this.gridStyle}>
                        <Progress percent={course.completion} size="small" /><p>时长：{course.hours}</p>
                        <p>开始日期：{course.startDate}</p>
                        <p>结束日期：{course.endDate}</p>
                    </Card.Grid>:null}
                   { course.status < 2 ?<Card.Grid style={this.gridStyle}>
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
                            {course.paperID !== 0 ? <li key={999} style={{ listStyleType: 'none', clear: 'both' }}>
                                <p style={{ float: 'left' }}>
                                    <a onClick={() => this.onClickExam(course)}>*&nbsp;&nbsp;{course.type===0?'模拟考试':'考试'}&nbsp;&nbsp;&nbsp;</a><span style={{ color: 'lightgray' }}>
                                        {course.examScore}分&nbsp;&nbsp;</span>
                                    <span style={{ color: 'lightgray' }}>{course.examTimes}次</span>
                                </p>
                            </li> : null}
                        </ul>

                    </Card.Grid> : null}
                    
                        
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default withRouter(LessonCard)
