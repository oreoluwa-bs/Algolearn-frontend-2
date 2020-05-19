import React, { useState, useEffect, useContext } from 'react';
import { Layout, Menu } from 'antd';
import { CheckOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import { green } from '@ant-design/colors';
import { Link } from 'react-router-dom';
import { EnrollmentContext } from '../../../store/context/enroll';

const { Sider } = Layout;

const SideBar = (props) => {
    const { handleEditUserCourseEnrollment } = useContext(EnrollmentContext);

    const [collapsed, setCollapsed] = useState(false);

    const [course, setCourse] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [lesson, setLesson] = useState({});

    const [defKey, setDefKey] = useState(null);
    const [completedLessons, setCompletedLessons] = useState([]);

    useEffect(() => {
        if (props.parentData) {
            setCourse(props.parentData.course);
            setLessons(props.parentData.lessons);
            setLesson(props.parentData.lesson);
            setCompletedLessons(props.parentData.course?.completed);
        }
    }, [props.parentData]);

    useEffect(() => {
        const handleUpdateCompleted = async () => {
            const isCompleted = completedLessons !== true ? completedLessons?.findIndex((les) => `/${les.slug}` === defKey) !== -1 : true;
            if (!isCompleted && props.parentData.course) {
                const currLesson = lessons.find((item) => `/${item.slug}` === defKey)
                if (!currLesson) return

                const completeed = [...props.parentData.course?.completed, { _id: currLesson?._id, slug: currLesson.slug }];
                const values = {
                    lastViewed: Date.now(),
                    completed: [...new Set(completeed.map(item => item._id))],
                    course: props.parentData.course.course._id
                }
                const res = await handleEditUserCourseEnrollment(props.parentData.course?._id, values);
                props.changeCourse(res.data.data);
            }
        }
        if (props.parentData.course && lessons && defKey && lessons.length > 0) {
            handleUpdateCompleted();
        }
    }, [completedLessons, defKey, handleEditUserCourseEnrollment, lessons, props, props.parentData.course]);

    useEffect(() => {
        setDefKey('/' + props.currentMatch.params.lessonSlug);
    }, [props.currentMatch]);

    if (lesson) {

    }

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
            {
                defKey &&
                <Menu mode="inline" theme='dark' style={{ height: '100%', borderRight: 0 }} defaultSelectedKeys={[defKey]}>
                    {
                        lessons && lessons.map((lessonItem) => {
                            const isEnrolled = completedLessons !== true ? completedLessons.findIndex((les) => les._id === lessonItem._id) !== -1 : true;
                            return (
                                <Menu.Item key={`/${lessonItem.slug}`}>
                                    {isEnrolled && <CheckOutlined style={{ color: green[5] }} />}
                                    {!isEnrolled && <Loading3QuartersOutlined />}
                                    <span>{lessonItem.title}</span>
                                    <Link to={{
                                        pathname: `/classroom/${props.currentMatch.params.slug}/lesson/${lessonItem.slug}`,
                                        state: {
                                            course,
                                            lesson: lessonItem,
                                            lessons,
                                        }
                                    }} />
                                </Menu.Item>
                            );
                        })
                    }
                </Menu>
            }
        </Sider>
    );
}

export default SideBar;

// const SideBar = (props) => {
//     const { handleGetCourseLessons } = useContext(LessonContext);
//     const { handleEditUserCourseEnrollment } = useContext(EnrollmentContext);
//     const [collapsed, setCollapsed] = useState(false);
//     const [lessons, setLessons] = useState([]);
//     const [defKey, setDefKey] = useState(null);
//     const [completedLessons, setCompletedLessons] = useState([]);

//     useEffect(() => {
//         const handleInit = async (courseId) => {
//             const res = await handleGetCourseLessons(courseId, '?sort=createdAt');
//             setLessons(res.doc);
//         }
//         if (props.course?.course?._id) {
//             handleInit(props.course.course._id);
//             setCompletedLessons(props.course.completed);
//         }
//     }, [handleGetCourseLessons, props.course]);

//     useEffect(() => {
//         setDefKey(props.location.pathname.split(`${props.currentMatch.url}/lesson`)[1]);
//     }, [props.location.pathname, props.currentMatch.url]);

//     useEffect(() => {
//         const handleUpdateCompleted = async () => {
//             const isCompleted = completedLessons?.findIndex((les) => `/${les.slug}` === defKey) !== -1;
//             if (!isCompleted && props.course) {
//                 const currLesson = lessons.find((item) => `/${item.slug}` === defKey)
//                 if (!currLesson) return

//                 const completeed = [...props.course?.completed, { _id: currLesson?._id, slug: currLesson.slug }];
//                 const values = {
//                     lastViewed: Date.now(),
//                     completed: [...new Set(completeed.map(item => item._id))],
//                     course: props.course.course._id
//                 }
//                 const res = await handleEditUserCourseEnrollment(props.course?._id, values);
//                 setCompletedLessons(res.data.data.completed);
//             }
//         }
//         if (props.course && lessons && defKey && lessons.length > 0) {
//             handleUpdateCompleted();
//         }
//     }, [completedLessons, defKey, handleEditUserCourseEnrollment, lessons, props.course]);
//     return (
//         <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
//             {defKey && <Menu mode="inline" theme='dark' style={{ height: '100%', borderRight: 0 }} defaultSelectedKeys={[defKey]}>
//                 {
//                     lessons &&
//                     lessons.map((lesson) => {
//                         const isEnrolled = completedLessons.findIndex((les) => les._id === lesson._id) !== -1;
//                         return (
//                             <Menu.Item key={`/${lesson.slug}`}>
//                                 {isEnrolled && <CheckOutlined style={{ color: green[5] }} />}
//                                 {!isEnrolled && <MinusOutlined />}
//                                 <span>{lesson.title}</span>
//                                 <Link to={
//                                     {
//                                         pathname: `${props.currentMatch.url}/lesson/${lesson.slug}`,
//                                         state: {
//                                             lesson,
//                                             lessons,
//                                         }
//                                     }} />
//                             </Menu.Item>
//                         );
//                     })
//                 }
//             </Menu>}
//         </Sider>
//     );
// }

// export default SideBar;