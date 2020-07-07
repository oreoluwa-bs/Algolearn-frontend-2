import React, { useEffect, useState, useContext, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Rate, Typography, Button, Layout, Row, Col, Card, Divider, Space, Avatar } from 'antd';
import { BookOutlined, FileOutlined, ClockCircleOutlined, ReadOutlined, CheckSquareOutlined, TeamOutlined } from '@ant-design/icons';
import { AuthContext } from '../../store/context/auth';
import { CourseContext } from '../../store/context/course';
import { EnrollmentContext } from '../../store/context/enroll';
import { utils } from '../../config';

const Thumbnails = lazy(() => import('../../components/Catalogue/ReviewPreview'));

const { Paragraph, Text, Title } = Typography;
const { Content } = Layout;


const CourseDetails = (props) => {
    const { auth, handleGetMe } = useContext(AuthContext);
    const { handleGetCourse } = useContext(CourseContext);
    const { handleEnrollInCourse, handleGetEnrolledInCourse } = useContext(EnrollmentContext);
    const [course, setCourse] = useState({});
    const [isEnrolled, setIsEnrolled] = useState(false);

    const contentValue = ['Poor', 'Decent', 'Good', 'Very Good', 'Rich'];

    const handleCourseEnrollment = async () => {
        const res = await handleEnrollInCourse(course._id);
        // console.log(res);
        if (res?.status === 'success') {
            props.history.push(`/dashboard`);
            await handleGetMe();
        }
    };

    useEffect(() => {
        const handleInit = async (slug) => {
            const res = await handleGetCourse(slug);
            // console.log(res);
            setCourse(res.data);
            if (res.status === 'error') {
                props.history.push('/page-not-found');
            };
        }

        handleInit(props.match.params.slug);
    }, [props.match.params.slug, props.history, handleGetCourse]);

    useEffect(() => {
        const checkIfEnrolled = async () => {
            const res = await handleGetEnrolledInCourse(course._id, `/?user=${auth?._id}`);
            res.results > 0 ? setIsEnrolled(true) : setIsEnrolled(false);
        }
        if (auth?._id && course?._id) {
            checkIfEnrolled();
        }

    }, [auth, course, handleGetEnrolledInCourse])

    return (
        <div>
            {
                course?.slug &&
                <div>
                    <div style={{ backgroundColor: course.color ?? 'rgb(194, 140, 174)' }} className='course-header'>
                        <div className='course-header-bg'></div>
                        <div className='course-header-container'>
                            <BookOutlined />
                            <Title level={1} style={{ color: 'white' }}>{course.title}</Title>
                            <Divider />
                            {
                                auth?.role !== 'admin' &&
                                < Space >
                                    {
                                        auth && course.author && auth._id !== course.author._id && !isEnrolled &&
                                        <div>
                                            <div className='enroll-btn'>
                                                <Button type='primary' size='large' onClick={handleCourseEnrollment}>Start Free Course</Button>
                                            </div>
                                        </div>
                                    }
                                    {
                                        auth && course.author && auth._id !== course.author._id && isEnrolled &&
                                        <div>
                                            <div className='enroll-btn'>
                                                <Link to={`/classroom/${course.slug}/`} className='ant-btn ant-btn-lg ant-btn-primary'>Classroom</Link>
                                            </div>
                                        </div>
                                    }
                                    {
                                        !auth &&
                                        <div>
                                            <div className='enroll-btn'>
                                                <Link to='/login' className='ant-btn ant-btn-lg ant-btn-primary'>Start free course</Link>
                                            </div>
                                        </div>
                                    }
                                </Space>
                            }
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
                                                                <Avatar size='large' style={{ color: 'white', backgroundColor: course.author.color ?? '#E0A458' }}>{course.author.firstname[0]}{course.author.lastname[0]}</Avatar>
                                                            }
                                                            {
                                                                course.author.photo &&
                                                                <Avatar size='large' shape='circle' src={`${utils.apiHOST}images/users/${course.author.photo}`} style={{ color: 'white', border: `1px solid ${course.author.color}` }} />
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
                                                    <Text level={4}>{course.lessonsQuantity} lessons</Text>
                                                </Space>
                                            </div>
                                            <div className='course-additional-item'>
                                                <Space>
                                                    <ReadOutlined />
                                                    <Text level={4}>{
                                                        course.ratingsAverage - 1 >= 0 ?
                                                            contentValue[course.ratingsAverage - 1] : contentValue[0]
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
                                                course.testQuestionCount > 0 &&
                                                <div className='course-additional-item'>
                                                    <Space>
                                                        <CheckSquareOutlined />
                                                        <Text level={4}>Interactive Quizzes</Text>
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
                    {
                        course.reviews && course.reviews.length > -1 &&
                        <div style={{ backgroundColor: '#FAFBFC' }}>
                            <Content className='course-details-container' style={{ backgroundColor: 'inherit' }}>
                                <div style={{ paddingTop: 64, paddingBottom: 40 }}>
                                    <Row gutter={16}>
                                        {
                                            course.reviews.map((review) => (
                                                <Suspense key={course.course.slug} fallback={
                                                    <Col key={review._id} xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 6 }}>
                                                        <div className='skeleton-card loading' style={{ height: 200 }}></div>
                                                    </Col>}>
                                                    <Col key={review._id} xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 6 }}>
                                                        <Thumbnails review={review} />
                                                    </Col>
                                                    <Col key={review._id} xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 6 }}>
                                                    </Col>
                                                </Suspense>
                                            ))
                                        }
                                    </Row>
                                </div>
                            </Content>
                        </div>
                    }
                </div>
            }
        </div >
    );
}

export default CourseDetails;