import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { PageHeader, Layout, Divider } from 'antd';
import { ManageTestPage, ManageLessonsPage } from '..';
import { AuthContext } from '../../../store/context/auth';
import { CourseContext } from '../../../store/context/course';

const ManageCourseContent = (props) => {
    const { auth } = useContext(AuthContext);
    const { handleGetCourse } = useContext(CourseContext);
    const [course, setCourse] = useState({});

    useEffect(() => {
        if (props?.location?.state) {
            setCourse(props.location.state.course);
        } else {
            const alt = async () => {
                const res = await handleGetCourse(props.match.params.slug);
                setCourse(res.data);
                if (res?.status === 'error') {
                    props.history.push(`/dashboard/manage/${props.match.params.slug}`)
                }
            }
            alt();
        }
    }, [handleGetCourse, props]);

    if (!auth) return <Redirect to='/dashboard' />
    if (auth && auth.role === 'student') return <Redirect to='/dashboard' />
    if (auth && course && course.title && auth._id.toString() !== course.author._id.toString()) return <Redirect to='/dashboard' />

    return (
        <Layout>
            {
                course?.title &&
                <div>
                    <PageHeader
                        onBack={() => { props.history.goBack() }}
                        title={`${course.title}`}
                        extra={[]}>
                    </PageHeader>
                    <div style={{ padding: 24, backgroundColor: 'white' }}>
                        <ManageLessonsPage course={course} history={props.history} />
                        <Divider></Divider>
                        <ManageTestPage course={course} history={props.history} />
                    </div>
                </div>
            }
        </Layout >
    );
}

export default ManageCourseContent;