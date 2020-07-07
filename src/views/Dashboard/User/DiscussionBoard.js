import React, { lazy, Suspense, useContext, useState, useEffect } from 'react';
import { Input, Row, Col, BackTop } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from '../../../store/context/auth';
import { EnrollmentContext } from '../../../store/context/enroll';
import { EmptyState } from '../../../components/Dashboard';
import { CourseContext } from '../../../store/context/course';

const Thumbnails = lazy(() => import('../../../components/DiscussionBoard/DiscussPreview'));

const { Search } = Input;

const DiscussionBoard = () => {
    const { auth } = useContext(AuthContext);
    const { handleGetMyEnrolled } = useContext(EnrollmentContext);
    const { getAllCourses } = useContext(CourseContext);
    const [orgCourses, setOrgCourses] = useState([]);
    const [courses, setCourses] = useState([]);
    const [userEnrolled, setUserEnrolled] = useState([]);
    const [tutorCreated, setTutorCreated] = useState([]);

    useEffect(() => {
        const handleInit = async () => {
            const res = await handleGetMyEnrolled('/?sort=-lastViewed');
            setUserEnrolled(res.doc);
        }
        const handleInitS = async () => {
            if (auth?.role === 'tutor') {
                const res = await getAllCourses(`?author=${auth._id}`);
                const newRes = res.data.doc.map((course) => ({ course, completed: true }));
                setTutorCreated(newRes);
            }
        }
        handleInit();
        handleInitS();
    }, [handleGetMyEnrolled, auth, getAllCourses]);

    useEffect(() => {
        if (userEnrolled && tutorCreated) {
            setOrgCourses([...userEnrolled, ...tutorCreated]);
            setCourses([...userEnrolled, ...tutorCreated]);
        }
    }, [tutorCreated, userEnrolled]);

    const handleSearch = (e) => {
        setCourses(orgCourses.filter((course) => {
            const title_course = course.course.title.toLowerCase();
            const search_params = e.target.value.toLowerCase();
            return title_course.includes(search_params);
        }));
    };

    if (!auth) return <Redirect to='/dashboard' />
    if (auth?.role === 'admin') return <Redirect to='/dashboard' />

    return (
        <div className='catalogue-container'>
            <div style={{ padding: '50px' }}>
                <h1 style={{ textAlign: 'center' }}>My Courses</h1>
                <div style={{ maxWidth: '75vw', margin: '0 auto' }}>
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
                        {
                            orgCourses?.length > 0 &&
                            <Row gutter={{ xs: 10, md: 28, lg: 36, xl: 48 }}>
                                {
                                    courses?.map((course) => (
                                        <Suspense key={course.course.slug} fallback={
                                            <Col key={course.course.slug} xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 8 }} xxl={{ span: 8 }} style={{ marginBottom: 40 }}>
                                                <div className='skeleton-card loading' style={{ height: 200 }}></div>
                                            </Col>}>
                                            <Col key={course.course.slug} xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 8 }} xxl={{ span: 8 }} style={{ marginBottom: 40 }}>
                                                <Link
                                                    to={{
                                                        pathname: `/discuss/${course.course.slug}`,
                                                        state: {
                                                            course: course,
                                                        }
                                                    }}>
                                                    <Thumbnails courseData={course} />
                                                </Link>
                                            </Col>
                                        </Suspense>
                                    ))}
                            </Row>
                        }
                        {
                            !orgCourses?.length > 0 &&
                            <EmptyState description="You currently aren't enrolled in any course"
                                extra={[<Link to='/catalogue' key='check' className='ant-btn ant-btn-primary ant-btn-lg'>Check out Courses Catalogue</Link>]}
                            />
                        }
                        {
                            !courses?.length > 0 && orgCourses?.length > 0 &&
                            <EmptyState description="No matching courses found" />
                        }
                    </div>
                    <BackTop />
                </div>
            </div>
        </div>
    );
}

export default DiscussionBoard;
