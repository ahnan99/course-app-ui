import React, { Component } from 'react'
import { Card, Row, Col } from 'antd'

import 'antd/dist/antd.css'

const { Meta } = Card;
export default class LessonCard extends Component {
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
                                <p key={singleClass.classID}>{singleClass.classID}. {singleClass.className} {singleClass.class_completion}</p>
                            ))}
                        </Card>
                    </Card>
                </Col>
            </Row>
        )
    }
}
