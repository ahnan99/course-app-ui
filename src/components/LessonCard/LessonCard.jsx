import React, { Component } from 'react'
import { Card, Row, Col, Progress } from 'antd'
import { withRouter } from 'react-router-dom'
import { RightOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'

class LessonCard extends Component {

    onClick= (lesson) => {

        this.props.actions.updateCurrentLesson(lesson)
        this.props.history.push("/classpage")
    }

    render() {
        const { course } = this.props
        const { lessons } = this.props
        return (
            <Row key={course.lessonID} gutter={[16, 32]}>
                <Col span={24}>
                    <Card title={course.courseName} style={{ textAlign: 'left' }} extra={<a>{course.statusName}</a>}>
                        <Progress percent={course.completion} size="small" /><p>时长：{course.hours}</p>
                        <p>开始日期：{course.startDate}</p>
                        <p>结束日期：{course.endDate}</p>
                        <Card type="inner" title="课程内容">
                            <ul style={{textAlign:'left',margin: 0, padding:0}}>
                            {lessons.filter(lesson => lesson.refID === course.ID).map((lesson,index) => (
                                <li style={{listStyleType:'none', clear:'both'}} key={lesson.ID}><p style={{float:'left'}}><span>{index+1}. {lesson.lessonName}&nbsp;&nbsp;</span><span style={{color:'lightgray'}}>{lesson.completion}%</span></p><span style={{float:'right',color:'#1E90FF'}} key={lesson.ID} onClick={()=>this.onClick(lesson)}><RightOutlined /></span></li>
                            ))}
                            <li key={999} style={{listStyleType:'none', clear:'both'}}><p style={{float:'left'}}>*&nbsp;&nbsp;模拟考试&nbsp;&nbsp;&nbsp;<span style={{color:'lightgray'}}>{course.examScore}分&nbsp;&nbsp;</span><span style={{color:'lightgray'}}>{course.examTimes}次</span></p><span style={{float:'right',color:'#1E90FF'}}><RightOutlined /></span></li>
                            </ul>
                        </Card>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default withRouter(LessonCard)
