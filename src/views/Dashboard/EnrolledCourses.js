import React, { lazy, Suspense, useContext, useState } from 'react';
import { Input, Row, Col, BackTop } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from '../../store/context/auth';

const Thumbnails = lazy(() => import('../../components/Catalogue/CoursePreview'));

const { Search } = Input;

const EnrolledCourses = () => {
    const { auth } = useContext(AuthContext);
    const [courses, setCourses] = useState(auth.enrolledCourses);

    const handleSearch = (e) => {
        setCourses(auth.enrolledCourses.filter((course) => {
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
                            {courses.map((course) => (
                                <Suspense key={course.course.slug} fallback={
                                    <Col key={course.course.slug} xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }} xxl={{ span: 6 }} style={{ marginBottom: 40 }}>
                                        <div className='skeleton-card loading' style={{ height: 300 }}></div>
                                    </Col>}>
                                    <Col key={course.course.slug} xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }} xxl={{ span: 6 }} style={{ marginBottom: 40 }}>
                                        <Link to={`/classroom/${course.course.slug}`}>
                                            <Thumbnails course={course.course} />
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
