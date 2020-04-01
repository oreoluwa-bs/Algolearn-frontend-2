import React from 'react';
import { Link } from 'react-router-dom';
import { Rate, Typography, Button, Layout, Row, Col, Card, Divider, Space } from 'antd';
import { BookOutlined, FileOutlined, ClockCircleOutlined, ReadOutlined, CheckSquareOutlined, TeamOutlined } from '@ant-design/icons';

const { Paragraph, Text, Title } = Typography;
const { Content } = Layout;


const CourseDetails = (props) => {
    const course = {
        slug: 2,
        title: 'Intro to Artificial Intelligence',
        description: 'Artificial Intelligence (AI) is a field that has a long history but is still constantly and actively growing and changing. In this course, you’ll learn the basics of modern AI as well as some of the representative applications of AI. Along the way, we also hope to excite you about the numerous applications and huge possibilities in the field of AI, which continues to expand human capability beyond our imagination.',
        authorName: 'Jane Doe',
        ratings: [0, 3, 4],
        difficulty: 'Intermediate'
    }
    const contentValue = ['Poor', 'Decent', 'Good', 'Very Good', 'Rich'];
    const rating = course.ratings.reduce((acc, currentOrder) => acc + currentOrder);

    const handleCourseEnrollment = async () => {
        await // handleEnrollInCourse(course._id);
            props.history.push(`/dashboard`);
    };

    return (
        <div>
            <div>
                <div style={{ backgroundColor: 'rgb(194, 140, 174)' }} className='course-header'>
                    <div className='course-header-bg'></div>
                    <div className='course-header-container'>
                        <BookOutlined />
                        <Title level={1} style={{ color: 'white' }}>{course.title}</Title>
                        <Divider />
                        {false &&
                            <div>
                                <div className='enroll-btn'>
                                    <Button type='primary' size='large' disabled={false} onClick={handleCourseEnrollment}>Start Free Course</Button>
                                </div>
                            </div>
                        }
                        <Space>
                            {
                                <div>
                                    <div className='enroll-btn'>
                                        <Link to='/login' className='ant-btn ant-btn-lg ant-btn-primary'>Start free course</Link>
                                    </div>
                                </div>
                            }
                            {
                                <div>
                                    <div>
                                        <Link to={`/${course.slug}/manage`} className='ant-btn ant-btn-lg'>Manage course</Link>
                                    </div>
                                </div>
                            }
                        </Space>
                    </div>
                </div>
                <Content className='course-details-container'>
                    <div className='course-details'>
                        <div>
                            <Row gutter={16}>
                                <Col xs={{ span: 24 }} md={{ span: 16 }}>
                                    <Card>
                                        <Row>
                                            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} xl={{ span: 6 }}>
                                                <Space direction='vertical' className='course-card-meta'>
                                                    <Text type='secondary'>Course Details</Text>
                                                    <Text strong>Free</Text>
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
                                                    <Text strong>{course.authorName}</Text>
                                                </Space>
                                            </Col>
                                            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} xl={{ span: 6 }}>
                                                <Space direction='vertical' className='course-card-meta'>
                                                    <Rate defaultValue={Math.round(rating / course.ratings.length)} disabled />
                                                </Space>
                                            </Col>
                                        </Row>
                                    </Card>
                                    <div className='course-details-body'>
                                        <Paragraph style={{ fontSize: 16 }}>
                                            {course.description}
                                        </Paragraph>
                                    </div>
                                </Col>
                                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                                    <div className='course-additional-data'>
                                        <div className='course-additional-item'>
                                            <Text style={{ fontSize: 16 }}>Included in course</Text>
                                        </div>
                                        <div className='course-additional-item'>
                                            <Space>
                                                <FileOutlined />
                                                <Text level={4}>{course.lessons && course.lessons.length}{!course.lessons && 0} lessons</Text>
                                            </Space>
                                        </div>
                                        <div className='course-additional-item'>
                                            <Space>
                                                <ReadOutlined />
                                                <Text level={4}>{
                                                    Math.round(rating / course.ratings.length) - 1 >= 0 ?
                                                        contentValue[Math.round(rating / course.ratings.length) - 1] : contentValue[0]
                                                } Learning Content</Text>
                                            </Space>
                                        </div>
                                        <div className='course-additional-item'>
                                            <Space>
                                                <TeamOutlined />
                                                <Text level={4}>Student Support Community</Text>
                                            </Space>
                                        </div>
                                        {
                                            course.tests && course.tests.length > 0 &&
                                            <div className='course-additional-item'>
                                                <Space>
                                                    <CheckSquareOutlined />
                                                    <Text level={4}>Interactive Quizes</Text>
                                                </Space>
                                            </div>
                                        }
                                        <div className='course-additional-item'>
                                            <Space>
                                                <ClockCircleOutlined />
                                                <Text level={4}>Self-Paced Learning</Text>
                                            </Space>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Content>
            </div>
        </div>
    );
}

export default CourseDetails;
