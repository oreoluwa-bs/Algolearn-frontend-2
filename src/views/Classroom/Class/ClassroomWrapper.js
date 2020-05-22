import React, { useEffect, useContext, useState, Suspense, lazy } from 'react';
import { Layout, Col, Row } from 'antd';
import { Redirect, Link, } from 'react-router-dom';
import { EnrollmentContext } from '../../../store/context/enroll';
import { AuthContext } from '../../../store/context/auth';
import { CourseContext } from '../../../store/context/course';
import { LessonContext } from '../../../store/context/lesson';
import '../../../styles/classroom.css';
import { EmptyState } from '../../../components/Dashboard';

const Thumbnails = lazy(() => import('../../../components/Classroom/LessonPreview'));

const { Content } = Layout;

const ClassroomWrapper = (props) => {
    const { auth } = useContext(AuthContext);
    const { handleGetCourse } = useContext(CourseContext);
    const { handleGetCourseLessons } = useContext(LessonContext);
    const { handleGetEnrolledInCourse } = useContext(EnrollmentContext);

    const [course, setCourse] = useState(null);
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        const getLessons = async (id) => {
            const res = await handleGetCourseLessons(id, '/?sort=createdAt');
            setLessons(res.doc);
        }

        const getEnrolledCoursess = async () => {
            const resCourse = await handleGetCourse(props.match.params.slug);
            if (resCourse.data) {
                if (auth?.role === 'tutor' && auth?._id === resCourse.data.author._id) {
                    setCourse({ course: resCourse.data, completed: true });
                    getLessons(resCourse.data._id);
                } else {
                    const res = await handleGetEnrolledInCourse(resCourse.data._id, `/?user=${auth?._id}`);
                    setCourse(res.data.doc[0]);
                    getLessons(res.data.doc[0].course._id);
                    if (res?.status === 'error') {
                        props.history.push(`/dashboard/enrolled-courses`);
                    }
                }
            }
        }

        if (props.location.state?.course) {
            setCourse(props.location.state.course);
            getLessons(props.location.state.course.course._id);
        } else {
            if (!course) {
                getEnrolledCoursess();
            }
        }
    }, [auth, handleGetCourse, handleGetEnrolledInCourse, props.match, props.history, props.location.state, course, handleGetCourseLessons]);
    if (!auth) return <Redirect to='/dashboard' />
    console.log(course);
    return (
        <Layout className='dash'>
            <Layout style={{ padding: '48px 48px 0' }}>
                <Content style={{ padding: '24px 48px', margin: 0, backgroundColor: 'white', minHeight: 'calc(100vh - 190px)' }}>
                    <h1 style={{ textAlign: 'center' }}>Lessons</h1>
                    <br />
                    <br />
                    {
                        lessons?.length > 0 &&
                        <Row gutter={{ xs: 10, md: 28, lg: 36, xl: 48 }}>
                            {
                                lessons?.map((lesson) => (
                                    <Suspense key={lesson.slug} fallback={
                                        <Col key={lesson.slug} xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }} xxl={{ span: 6 }} style={{ marginBottom: 40 }}>
                                            <div className='skeleton-card loading' style={{ height: 150 }}></div>
                                        </Col>}>
                                        <Col key={lesson.slug} xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }} xxl={{ span: 6 }} style={{ marginBottom: 40 }}>
                                            <Link
                                                to={{
                                                    pathname: `/classroom/${course.course.slug}/lesson/${lesson.slug}`,
                                                    state: {
                                                        course,
                                                        lesson,
                                                        lessons,
                                                    }
                                                }}>
                                                <Thumbnails lessonData={{ course, lesson }} />
                                            </Link>
                                        </Col>
                                    </Suspense>
                                ))}
                        </Row>
                    }
                    {
                        !lessons?.length > 0 && auth?.role === 'tutor' && auth.role === 'tutor' && auth?._id === course?.course.author._id &&
                        <EmptyState description="No lessons found"
                            extra={[<Link key='addlesson' to={{
                                pathname: `/dashboard/${props.match.params.slug}/lesson/create`,
                                state: { course, }
                            }} className='ant-btn ant-btn-primary ant-btn-lg'>Create a lesson</Link>]}
                        />
                    }
                    {
                        !lessons?.length > 0 && auth?.role === 'tutor' && auth?._id !== course?.course.author._id &&
                        <EmptyState description="No lessons found" />
                    }
                </Content>
            </Layout>
        </Layout>
    );
}

export default ClassroomWrapper;

// const DAS = () => {
//     return (
//         <Layout className='dash'>
//             <SideBar currentMatch={currentMatch} location={props.location} course={course} />
//             <Layout style={{ padding: '48px 48px 0' }}>
//                 <Content style={{ padding: 24, margin: 0, backgroundColor: 'white', minHeight: 'calc(100vh - 190px)' }}>
//                     <Switch>
//                         <Route exact path={`${currentMatch.path}/`} component={() => <Redirect to={`/classroom/${props.match.params.slug}/lesson/`} />} />
//                         <Route exact path={`${currentMatch.path}/lesson/`} component={() => <Main course={course} allProps={props} />} />
//                         <Route exact path={`${currentMatch.path}/lesson/:lessonSlug`} component={ClassView} />
//                     </Switch>
//                 </Content>
//             </Layout>
//         </Layout>
//     );
// }
