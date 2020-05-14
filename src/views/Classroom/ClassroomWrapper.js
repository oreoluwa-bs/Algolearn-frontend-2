import React, { useEffect, useContext, useState } from 'react';
import { Layout } from 'antd';
import { useRouteMatch, Route, Switch, Redirect, } from 'react-router-dom';
import { SideBar } from '../../components/Classroom';
import { EnrollmentContext } from '../../store/context/enroll';
import { AuthContext } from '../../store/context/auth';
import { CourseContext } from '../../store/context/course';
import { ClassView } from '.';

const { Content } = Layout;

const Main = ({ allProps, course }) => {

    return (<div>Click lesson to contiue</div>)
}

// const MainMain = ({ allProps, course }) => {
//     console.log(course);
//     if (course) {
//         return <Redirect to={`/classroom/${course.course.slug}/lesson`} />
//     }
//     return <div></div>
// }

const ClassroomWrapper = (props) => {
    const { auth } = useContext(AuthContext);
    const { handleGetCourse } = useContext(CourseContext);
    const { handleGetEnrolledInCourse } = useContext(EnrollmentContext);

    const [course, setCourse] = useState(null);
    let currentMatch = useRouteMatch();

    useEffect(() => {
        if (props.location.state?.course) {
            setCourse(props.location.state.course);
        } else {
            if (!course) {
                const alt = async () => {
                    const resCourse = await handleGetCourse(props.match.params.slug);
                    if (resCourse.data) {
                        if (auth?.role === 'tutor') {
                            setCourse({ course: resCourse.data });
                        } else {
                            const res = await handleGetEnrolledInCourse(resCourse.data._id, `?user=${auth?._id}`);
                            setCourse(res.data.doc[0]);
                            if (res?.status === 'error') {
                                props.history.push(`/dashboard/enrolled-courses`);
                            }
                        }
                    }
                }
                alt();
            }
        }
    }, [auth, handleGetCourse, handleGetEnrolledInCourse, props.match, props.history, props.location.state, course]);
    if (!auth) return <Redirect to='/dashboard' />
    return (
        <Layout className='dash'>
            <SideBar currentMatch={currentMatch} location={props.location} course={course} />
            <Layout style={{ padding: '48px 48px 0' }}>
                <Content style={{ padding: 24, margin: 0, backgroundColor: 'white', minHeight: 'calc(100vh - 190px)' }}>
                    <Switch>
                        <Route exact path={`${currentMatch.path}/`} component={() => <Redirect to={`/classroom/${props.match.params.slug}/lesson/`} />} />
                        <Route exact path={`${currentMatch.path}/lesson/`} component={() => <Main course={course} allProps={props} />} />
                        <Route exact path={`${currentMatch.path}/lesson/:lessonSlug`} component={ClassView} />
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    );
}

export default ClassroomWrapper;
