import React, { lazy, Suspense, useContext } from 'react';
import { Input, Row, Col, BackTop } from 'antd';
import { Link } from 'react-router-dom';
// import { CourseContext } from '../../store/context/course';
import { AuthContext } from '../../store/context/auth';

const Thumbnails = lazy(() => import('../../components/Catalogue/CoursePreview'));

const { Search } = Input;

const EnrolledCourses = () => {
    const { auth } = useContext(AuthContext);
    const courses = auth.enrolledCourses;
    const handleSearch = (e) => {

    };
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
                                <Suspense key={course.slug} fallback={
                                    <Col key={course.slug} xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }} xxl={{ span: 6 }} style={{ marginBottom: 40 }}>
                                        <div className='skeleton-card loading' style={{ height: 300 }}></div>
                                    </Col>}>
                                    <Col key={course.slug} xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }} xxl={{ span: 6 }} style={{ marginBottom: 40 }}>
                                        <Link to={`/classroom/${course.slug}`}>
                                            <Thumbnails course={course} />
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
