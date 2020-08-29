import React from 'react'
import { Rate, Typography, Row, Col, Card, Space, Avatar } from 'antd';
import { utils } from '../../../config';

const { Text } = Typography;

const CourseMetaData = ({ course }) => {
    return (
        <Card>
            <Row>
                <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} xl={{ span: 6 }}>
                    <Space direction='vertical' className='course-card-meta'>
                        <Text type='secondary'>Course Details</Text>
                        <Text strong>{course.price > 0 ? course.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 'Free'}</Text>
                    </Space>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} xl={{ span: 6 }}>
                    <Space direction='vertical' className='course-card-meta'>
                        <Text type='secondary'>Skill level</Text>
                        <Text strong>{course.difficulty}</Text>
                    </Space>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} xl={{ span: 6 }}>
                    <Space direction='vertical' className='course-card-meta'>
                        <Text type='secondary'>Course Creator</Text>
                        <Space>
                            {
                                !course.author.photo &&
                                <Avatar alt='user-profile-photo' size='large' style={{ color: 'white', backgroundColor: course.author.color ?? '#E0A458' }}>{course.author.firstname[0]}{course.author.lastname[0]}</Avatar>
                            }
                            {
                                course.author.photo &&
                                <Avatar alt='user-profile-photo' size='large' shape='circle' src={`${utils.apiHOST}images/users/${course.author.photo}`} style={{ color: 'white', border: `1px solid ${course.author.color}` }} />
                            }
                            <Text strong>{course.author.firstname} {course.author.lastname}</Text>
                        </Space>
                    </Space>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} xl={{ span: 6 }}>
                    <Space direction='vertical' className='course-card-meta'>
                        <Rate value={course.ratingsAverage} defaultValue={course.ratingsAverage} disabled />
                    </Space>
                </Col>
            </Row>
        </Card>
    )
}

export default CourseMetaData
