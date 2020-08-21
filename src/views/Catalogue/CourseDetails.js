import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Layout, Row, Col, Divider, Space } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { AuthContext } from '../../store/context/auth';
import { CourseContext } from '../../store/context/course';
import { EnrollmentContext } from '../../store/context/enroll';
import { CourseAdditionalData, CourseDetailFooter, CourseMetaData } from '../../components/Catalogue/CourseDetails';

const { Paragraph, Title } = Typography;
const { Content } = Layout;


const CourseDetails = (props) => {
    const { auth, handleGetMe } = useContext(AuthContext);
    const { handleGetCourse } = useContext(CourseContext);
    const { handleEnrollInCourse, handleGetEnrolledInCourse } = useContext(EnrollmentContext);
    const [course, setCourse] = useState({});
    const [isEnrolled, setIsEnrolled] = useState(false);

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
                                        <CourseMetaData course={course} />
                                        <div className='course-details-body'>
                                            <Paragraph style={{ fontSize: 16 }}>
                                                {course.description}
                                            </Paragraph>
                                        </div>
                                    </Col>
                                    <Col xs={{ span: 24 }} md={{ span: 8 }}>
                                        <CourseAdditionalData course={course} />
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Content>
                    <CourseDetailFooter course={course} />
                </div>
            }
        </div >
    );
}

export default CourseDetails;