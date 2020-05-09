import React, { Component } from 'react'
import { Card, Row, Col } from 'antd'
import { withRouter } from 'react-router-dom'

class LessonCard extends Component {

    onClick = () => {
        this.props.history.push("/classpage")
    }

    render() {
        const { course } = this.props
        const { lessons } = this.props
        return (
            <Row key={course.lessonID} gutter={[16, 32]}>
                <Col span={24}>
                    <Card title={course.courseName} style={{ textAlign: 'left' }} extra={<a>{course.statusName}</a>}>
                        <p>总时长：{course.hours}&nbsp;&nbsp;&nbsp;&nbsp;完成度: {course.completion}</p>
                        <p>开始日期：{course.startDate}</p>
                        <p>结束日期：{course.endDate}</p>
                        <p>考试成绩：{}</p>
                        <Card type="inner" title="课程内容">
                            {lessons.filter(lesson => lesson.refID === course.ID).map(lesson => (
                                <div><a onClick={this.onClick} key={lesson.ID}>{lesson.lessonID}. {lesson.lessonName} {lesson.completion}</a><br /></div>
                            ))}
                        </Card>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default withRouter(LessonCard)
