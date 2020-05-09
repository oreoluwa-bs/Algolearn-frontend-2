import React, { lazy, Suspense, useContext, useState, useEffect } from 'react';
import { Input, Row, Col, BackTop } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from '../../store/context/auth';
import { EnrollmentContext } from '../../store/context/enroll';

// const Thumbnails = lazy(() => import('../../components/Catalogue/CoursePreview'));
const Thumbnails = lazy(() => import('../../components/Account/EnrolledPreview'));

const { Search } = Input;

const EnrolledCourses = () => {
    const { auth } = useContext(AuthContext);
    const { handleGetMyEnrolled } = useContext(EnrollmentContext);
    const [orgCourses, setOrgCourses] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const handleInit = async () => {
            const res = await handleGetMyEnrolled();
            setOrgCourses(res.doc);
            setCourses(res.doc);
        }
        handleInit();
    }, [handleGetMyEnrolled]);

    const handleSearch = (e) => {
        setCourses(orgCourses.filter((course) => {
            const title_course = course.course.title.toLowerCase();
            const search_params = e.target.value.toLowerCase();
            return title_course.includes(search_params);
        }));
    };

    if (!auth) return <Redirect to='/dashboard' />

    return (
        <div className='catalogue-container'>
            <div style={{ paddingTop: '50px' }}>
                <h1 style={{ textAlign: 'center' }}>My Courses</h1>
                <div style={{ width: '75vw', margin: '0 auto' }}>
                    <Input.Group>
                        <Search
                            placeholder="Search"
                            onSearch={handleSearch}
                            onInput={handleSearch}
                            // style={{ height: 50 }}
                            enterButton
                            size='large'
                            allowClear
                        />
                    </Input.Group>
                    <br />
                    <br />
                    {/* <div className='skeleton-card loading' style={{ height: 300 }}></div> */}
                    <br />
                    <br />
                    <div>
                        <Row gutter={{ xs: 10, md: 28, lg: 36, xl: 48 }}>
                            {courses?.map((course) => (
                                <Suspense key={course.course.slug} fallback={
                                    <Col key={course.course.slug} xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 8 }} xxl={{ span: 8 }} style={{ marginBottom: 40 }}>
                                        <div className='skeleton-card loading' style={{ height: 300 }}></div>
                                    </Col>}>
                                    <Col key={course.course.slug} xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 8 }} xxl={{ span: 8 }} style={{ marginBottom: 40 }}>
                                        <Link
                                            to={{
                                                pathname: `/classroom/${course.course.slug}`,
                                                state: {
                                                    course: course,
                                                }
                                            }}>
                                            {/* <Thumbnails course={course.course} /> */}
                                            <Thumbnails courseData={course} hideDeleteButton />
                                        </Link>
                                    </Col>
                                </Suspense>
                            ))}
                        </Row>
                    </div>
                    <BackTop />
                </div>
            </div>
        </div>
    );
}

export default EnrolledCourses;
