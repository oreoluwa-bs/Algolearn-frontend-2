import React, { useEffect, useContext, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Layout, Typography } from 'antd';
import { Redirect, } from 'react-router-dom';
import { AuthContext } from '../../store/context/auth';
import { CourseContext } from '../../store/context/course';
import { LessonContext } from '../../store/context/lesson';

// const { Content } = Layout;
const { Title } = Typography;

const ClassView = (props) => {
    const { auth } = useContext(AuthContext);
    const { handleGetCourse } = useContext(CourseContext);
    const { handleGetCourseLessons } = useContext(LessonContext);
    const [lesson, setLesson] = useState({});
    
    useEffect(() => {
        if (props?.location?.state) {
            setLesson(props.location.state.lesson);
        } else {
            const alt = async () => {
                const resCourse = await handleGetCourse(props.match.params.slug);
                if (resCourse.data) {
                    const res = await handleGetCourseLessons(resCourse.data._id, `?slug=${props.match.params.lessonSlug}`);
                    setLesson(res.doc[0]);
                    if (res?.status === 'error') {
                        props.history.push(`/dashboard/enrolled-courses`);
                    }
                }
            }
            alt();
        }
    }, [handleGetCourse, handleGetCourseLessons, props]);

    if (!auth) return <Redirect to='/dashboard' />
    return (
        <div>
            <div>
                <div style={{}}>
                    <Title level={4} style={{ float: 'left' }}>{lesson.title}</Title>
                    {/* <Link to={`/discuss/?userId=${auth._id}&room=${course._id}`}>
                        <Button type='primary' icon='message' style={{ float: 'right', marginLeft: 10 }} onClick={() => null} disabled={auth.role === 'admin'} />
                    </Link> */}
                    {/* <Button icon='flag' style={{ float: 'right' }} onClick={() => setFlagModal(true)} disabled={auth.role === 'admin'} /> */}

                    {/* <Modal
                        title='Report'
                        visible={modalFlagVisible}
                        onOk={() => setFlagModal(false)}
                        onCancel={() => setFlagModal(false)}
                        footer={null}
                        className='flag-modal'

                    >
                        <List
                            size="large"
                            bordered
                            dataSource={['Using someone elses content', 'It\'s inappropriate', 'Inaccurate Content', 'Spam', 'Offensive', 'Fails to teach its aim']}
                            renderItem={item => <List.Item className='flag-modal-list-item' onClick={() => { handleFlag(item) }}>{item}</List.Item>}
                        />
                    </Modal> */}
                    <div className='class-texct'>
                        <br />
                        <br />
                        <div>{lesson.text} </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClassView;
