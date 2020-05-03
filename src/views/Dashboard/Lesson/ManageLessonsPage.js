import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { PageHeader, Layout, Button, Collapse, Table, Tooltip, Divider, Popconfirm, Modal } from 'antd';
import { CreateTestPage, EditTestPage } from '..';
import { AuthContext } from '../../../store/context/auth';
import { LessonContext } from '../../../store/context/lesson';

const { Panel } = Collapse;

const ManageLessonsPage = (props) => {
    const { auth } = useContext(AuthContext);
    const { handleDeleteLesson, handleGetCourseLessons } = useContext(LessonContext);
    const { course } = props.location.state;
    const [lessons, setLessons] = useState([]);

    const [testCreateModalVisible, setTestCreateModal] = useState(false);
    const [testEditModalVisible, setTestEditModal] = useState(false);
    const [testIndex, setTestIndex] = useState();

    const getLessons = async (courseId) => {
        const res = await handleGetCourseLessons(courseId, '?sort=createdAt');
        setLessons(res.doc);
    }

    useEffect(() => {
        const handleInit = async (courseId) => {
            const res = await handleGetCourseLessons(courseId, '?sort=createdAt');
            setLessons(res.doc);
        }

        if (course?.id) {
            handleInit(course._id);
        }
    }, [course, course._id, handleGetCourseLessons]);

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
                        <Collapse accordion className='site-collapse-custom-collapse' bordered={true} defaultActiveKey={['lessons']}>
                            <Panel header='Lessons' key='lessons' className='site-collapse-custom-panel' extra={<Button onClick={() =>
                                (props.history.push({
                                    pathname: `/dashboard/${course.slug}/lesson/create`,
                                    state: { course, }
                                }))
                            }>Add Lesson</Button>}>
                                <Table size='small' rowKey={(record) => record._id} tableLayout='fixed' pagination={false} dataSource={lessons} columns={[
                                    {
                                        title: 'Title',
                                        dataIndex: 'title',
                                        key: 'title',
                                    },
                                    {
                                        title: 'Action',
                                        key: 'action',
                                        render: (lesson) => (
                                            <span>
                                                <Tooltip title='Delete this lesson' key='del-button'>
                                                    <Popconfirm
                                                        title='Are you sure delete this lesson?'
                                                        onConfirm={async () => {
                                                            await handleDeleteLesson({ courseId: course._id, lessonId: lesson._id });
                                                            await getLessons(course._id);
                                                        }}
                                                        onCancel={null}
                                                        okText='Yes'
                                                        cancelText='No'
                                                    >
                                                        <Button type='dashed'>Delete</Button>
                                                    </Popconfirm>
                                                </Tooltip>
                                                <Divider type='vertical' />
                                                <Tooltip title='Edit this lesson' key='edit-button'>
                                                    <Button type='primary' onClick={async () => {
                                                        const tempIndex = lessons.findIndex((re) => re._id === lesson._id)
                                                        props.history.push({
                                                            pathname: `/dashboard/manage/${course.slug}/lesson/edit/${lesson.slug}`,
                                                            state: {
                                                                course,
                                                                lesson: lessons[tempIndex],
                                                            }
                                                        })
                                                    }} >Edit</Button>
                                                </Tooltip>
                                            </span>
                                        ),
                                    },
                                ]} />
                            </Panel>
                            <Panel header='Final test' key='test' className='site-collapse-custom-panel' extra={<Button onClick={event => { event.stopPropagation(); setTestCreateModal(true); }}>Add Question</Button>}>
                                <Table tableLayout='fixed' dataSource={course.test} pagination={false} columns={[
                                    {
                                        title: 'Question',
                                        dataIndex: 'question',
                                        key: 'question',
                                    },
                                    {
                                        title: 'Action',
                                        key: 'action',
                                        render: (question) => (
                                            <span>
                                                <Tooltip title='Delete this question' key='del-button'>
                                                    <Popconfirm
                                                        title='Are you sure delete this question?'
                                                        onConfirm={() => {
                                                            // handleDeleteLesson(course._id, lesson.key);
                                                        }}
                                                        onCancel={null}
                                                        okText='Yes'
                                                        cancelText='No'
                                                    >
                                                        <Button type='dashed'>Delete</Button>
                                                    </Popconfirm>
                                                </Tooltip>
                                                <Divider type='vertical' />
                                                <Tooltip title='Edit this question' key='edit-button'>
                                                    <Button type='primary' onClick={() => {
                                                        const tempIndex = course.test.findIndex((re) => re._id === question._id)
                                                        setTestIndex(tempIndex);
                                                        setTestEditModal(true);
                                                    }} >Edit</Button>
                                                </Tooltip>
                                            </span>
                                        ),
                                    },
                                ]} />
                            </Panel>
                        </Collapse>

                        <Modal title='Create Test' visible={testCreateModalVisible} footer={null} width='75vw'
                            onOk={() => { setTestCreateModal(false) }} onCancel={() => { setTestCreateModal(false) }}>
                            <CreateTestPage course={course} close={() => { setTestCreateModal(false) }} getCourse={null} />
                        </Modal>

                        <Modal title='Edit Test' visible={testEditModalVisible} footer={null} width='75vw'
                            onOk={() => { setTestEditModal(false) }} onCancel={() => { setTestEditModal(false) }}>
                            <EditTestPage course={course} test={course.test ? course.test[testIndex] : {}} close={() => { setTestEditModal(false) }} getCourse={null} />
                        </Modal>
                    </div>
                </div>
            }
        </Layout >
    );
}

export default ManageLessonsPage;