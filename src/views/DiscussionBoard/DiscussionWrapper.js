import React, { useEffect, useContext, useState } from 'react';
import { Layout, PageHeader, Typography } from 'antd';
// import { red } from '@ant-design/colors';
import { Redirect, } from 'react-router-dom';
import { EnrollmentContext } from '../../store/context/enroll';
import { AuthContext } from '../../store/context/auth';
import { CourseContext } from '../../store/context/course';
import { SideBar } from '../../components/DiscussionBoard';
import DiscussionView from './DiscussionView';


const { Content } = Layout;
const { Text } = Typography;

const DiscussionWrapper = (props) => {
    const { auth } = useContext(AuthContext);
    const { handleGetCourse } = useContext(CourseContext);
    const { handleGetEnrolledInCourse } = useContext(EnrollmentContext);

    const [course, setCourse] = useState(null);

    useEffect(() => {
        const getEnrolledCoursess = async () => {
            const resCourse = await handleGetCourse(props.match.params.slug);
            if (resCourse.data) {
                if (auth?.role === 'tutor' && auth?._id === resCourse.data.author._id) {
                    setCourse({ course: resCourse.data, completed: true });
                } else {
                    const res = await handleGetEnrolledInCourse(resCourse.data._id, `/?user=${auth?._id}`);
                    setCourse(res.data.doc[0]);
                    if (res?.status === 'error') {
                        props.history.push(`/dashboard/enrolled-courses`);
                    }
                }
            }
        }

        if (props.location.state?.course) {
            setCourse(props.location.state.course);
        } else {
            if (!course) {
                getEnrolledCoursess();
            }
        }
    }, [auth, course, handleGetCourse, handleGetEnrolledInCourse, props.history, props.location.state, props.match.params.slug]);
    if (!auth) return <Redirect to='/dashboard' />

    return (
        <Layout className='dash'>
            {
                course?.course && <SideBar courseData={course}/>
            }
            <Layout style={{ padding: '48px 48px 0' }}>
                {/* <PageHeader
                    onBack={() => { props.history.push(`/dashboard/enrolled-courses/`) }}
                    title='Lessons' /> */}
                <Content>
                    <DiscussionView />
                </Content>
            </Layout>
        </Layout>
    );
}

export default DiscussionWrapper;