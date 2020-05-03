import React, { Component } from 'react'
import { Card, Row, Col } from 'antd'
import {withRouter} from 'react-router-dom'

class LessonCard extends Component {

    onClick = () => {
        this.props.history.push("/classpage")
    }

    render() {
        const { course } = this.props
        return (
            <Row key={course.lessonID} gutter={[16, 32]}>
                <Col span={24}>
                    <Card title={course.lessonName} style={{textAlign:'left'}} extra={<a>{course.lesson_status_name}</a>}>
                        <p>总时长：{course.hours}&nbsp;&nbsp;&nbsp;&nbsp;完成度: {course.lesson_completion}</p>
                        <p>开始日期：{course.startDate}</p>
                        <p>结束日期：{course.endDate}</p>
                        <p>考试成绩：{course.test_score}</p>
                        <Card type="inner" title="课程内容">
                            {course.classList.map(singleClass => (
                                <a onClick={this.onClick} key={singleClass.classID}>{singleClass.classID}. {singleClass.className} {singleClass.class_completion}</a>
                            ))}
                        </Card>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default withRouter(LessonCard)
