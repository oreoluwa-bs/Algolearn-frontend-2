import React, { useEffect, useState, useContext } from 'react';
import { useRouteMatch, Redirect, Link } from 'react-router-dom';
import { Layout, } from 'antd';
import { SideBar } from '../../components/Classroom';
import { AuthContext } from '../../store/context/auth';
import { CourseContext } from '../../store/context/course';
import { LessonContext } from '../../store/context/lesson';
import { EnrollmentContext } from '../../store/context/enroll';
import { ClassView } from '.';

const { Content } = Layout;

const Classroom = (props) => {
    const { auth } = useContext(AuthContext);
    const { handleGetCourse } = useContext(CourseContext);
    const { handleGetCourseLessons } = useContext(LessonContext);
    const { handleGetEnrolledInCourse } = useContext(EnrollmentContext);

    const [course, setCourse] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [nextLesson, setNextLesson] = useState({});
    const [lesson, setLesson] = useState({});

    useEffect(() => {
        const getEnrolledCoursess = async () => {
            const resCourse = await handleGetCourse(props.match.params.slug);
            if (resCourse.data) {
                if (auth?.role === 'tutor') {
                    setCourse({ course: resCourse.data, completed: true });
                } else {
                    const res = await handleGetEnrolledInCourse(resCourse.data._id, `/?user=${auth?._id}`);
                    if (res?.status === 'error') {
                        props.history.push(`/dashboard/enrolled-courses`);
                    }
                    setCourse(res.data.doc[0]);
                    const resLesson = await handleGetCourseLessons(res.data.doc[0].course._id, '/?sort=createdAt');
                    setLessons(resLesson.doc);
                    setLesson(resLesson.doc.find((less) => less.slug === props.match.params.lessonSlug));
                }
            }
        }

        if (props.location.state?.course) {
            setCourse(props.location.state.course);
            setLessons(props.location.state.lessons);
            setLesson(props.location.state.lesson);

        } else {
            getEnrolledCoursess();
        }
    }, [auth, handleGetCourse, handleGetCourseLessons, handleGetEnrolledInCourse, props.history, props.location.state, props.match.params]);


    useEffect(() => {
        const next = () => {
            const nextLesson = lessons[lessons.findIndex((les) => les._id === lesson._id) + 1];
            setNextLesson(nextLesson);
        }
        if (lesson.slug) {
            next();
        }
    }, [lesson._id, lesson.slug, lessons]);


    const changeCourse = (value) => {
        setCourse(value);
    }

    let currentMatch = useRouteMatch();
    if (!auth) return <Redirect to='/dashboard' />
    return (
        <Layout className='dash'>
            <SideBar currentMatch={currentMatch} location={props.location} parentData={{ lessons, lesson, course }} changeCourse={changeCourse} />
            <Layout style={{ padding: '48px 48px 0' }}>
                <Content style={{ padding: 24, margin: 0, backgroundColor: 'white', minHeight: 'calc(100vh - 190px)' }}>
                    <ClassView currentMatch={currentMatch} parentData={{ lessons, lesson, course }} />
                    {
                        nextLesson?.slug &&
                        <Link to={{
                            pathname: `/classroom/${currentMatch.params.slug}/lesson/${nextLesson.slug}`,
                            state: {
                                course,
                                lesson: nextLesson,
                                lessons,
                            }
                        }} >next</Link>
                    }
                </Content>
            </Layout>
        </Layout>
    );
}

export default Classroom;