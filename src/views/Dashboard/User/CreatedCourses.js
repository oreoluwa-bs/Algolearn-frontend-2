import React, { lazy, Suspense, useContext, useState, useEffect } from 'react';
import { Input, Row, Col, BackTop } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from '../../../store/context/auth';
import { CourseContext } from '../../../store/context/course';
import { EmptyState } from '../../../components/Dashboard';

const Thumbnails = lazy(() => import('../../../components/Catalogue/CoursePreview'));

const { Search } = Input;

const CreatedCourses = () => {
    const { auth } = useContext(AuthContext);
    const { getAllCourses } = useContext(CourseContext);
    const [orgCourses, setOrgCourses] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const handleInit = async () => {
            const res = await getAllCourses(`?author=${auth._id}`);
            setOrgCourses(res.data.doc);
            setCourses(res.data.doc);
        }
        handleInit();
    }, [getAllCourses, auth]);

    const handleSearch = (e) => {
        setCourses(orgCourses.filter((course) => {
            const title_course = course.title.toLowerCase();
            const search_params = e.target.value.toLowerCase();
            return title_course.includes(search_params);
        }));
    };

    if (!auth) return <Redirect to='/dashboard' />
    if (auth && auth.role === 'student') return <Redirect to='/dashboard' />
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
                            addonAfter={<Link to='/dashboard/course/create' style={{ marginLeft: 20 }} className='ant-btn ant-btn-primary ant-btn-lg'>Create a course</Link>}
                        />
                    </Input.Group>
                    <br />
                    <br />
                    {/* <div className='skeleton-card loading' style={{ height: 300 }}></div> */}
                    <br />
                    <br />
                    <div>
                        {
                            orgCourses.length > 0 &&
                            <Row gutter={{ xs: 10, md: 28, lg: 36, xl: 48 }}>
                                {
                                    courses.map((course) => (
                                        <Suspense key={course.slug} fallback={
                                            <Col key={course.slug} xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 8 }} xxl={{ span: 6 }} style={{ marginBottom: 40 }}>
                                                <div className='skeleton-card loading' style={{ height: 300 }}></div>
                                            </Col>}>
                                            <Col key={course.slug} xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 8 }} xxl={{ span: 6 }} style={{ marginBottom: 40 }}>
                                                <Link to={`/dashboard/manage/${course.slug}`}>
                                                    <Thumbnails course={course} />
                                                </Link>
                                            </Col>
                                        </Suspense>
                                    ))}
                            </Row>
                        }
                        {
                            !orgCourses?.length > 0 &&
                            <EmptyState description="You have not created in any course yet"
                                extra={[<Link key='ad' to='/dashboard/course/create' className='ant-btn ant-btn-primary ant-btn-lg'>Create a course</Link>]}
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

export default CreatedCourses;
