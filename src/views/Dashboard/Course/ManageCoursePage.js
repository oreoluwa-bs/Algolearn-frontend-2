import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { PageHeader, Layout, Tag, Button, Typography, Descriptions, Rate, Collapse, Table, Tooltip, Divider, Popconfirm, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { EditLessonPage, CreateTestPage, EditTestPage } from '..';
import { AuthContext } from '../../../store/context/auth';
import { CourseContext } from '../../../store/context/course';
import { LessonContext } from '../../../store/context/lesson';

const { Paragraph } = Typography;
const { Panel } = Collapse;

const ManageCoursePage = (props) => {
    const { auth } = useContext(AuthContext);
    const { handleGetCourse, handleDeleteCourse } = useContext(CourseContext);
    const { handleDeleteLesson } = useContext(LessonContext);

    const [course, setCourse] = useState({});
    const [lessonEditModalVisible, setLessonEditModal] = useState(false);
    const [testCreateModalVisible, setTestCreateModal] = useState(false);
    const [testEditModalVisible, setTestEditModal] = useState(false);
    const [tagColor, setTagColor] = useState('#2db7f5');
    const [lessonIndex, setLessonIndex] = useState();
    const [testIndex, setTestIndex] = useState();


    const getCourse = async (slug) => {
        const res = await handleGetCourse(slug);
        setCourse(res.data);
        if (res.status === 'error') {
            props.history.push('error-404');
        };
    };

    useEffect(() => {
        const handleInit = async (slug) => {
            const res = await handleGetCourse(slug);
            setCourse(res.data);
            if (res.status === 'error') {
                props.history.push('error-404');
            };
        }

        handleInit(props.match.params.slug);
    }, [props.match.params.slug, props.history, handleGetCourse]);

    useEffect(() => {
        if (course && course.title) {
            if (course.difficulty.toLowerCase() === 'intermediate') {
                setTagColor('#2db7f5');
            } else if (course.difficulty.toLowerCase() === 'advanced') {
                setTagColor('#108ee9');
            } else {
                setTagColor('#87d068')
            }
        }
    }, [course]);

    if (!auth) return <Redirect to='/dashboard' />
    if (auth && auth.role === 'student') return <Redirect to='/dashboard' />
    if (auth && course && course.title && auth._id.toString() !== course.author._id.toString()) return <Redirect to='/dashboard' />

    return (
        <Layout>
            {
                course && course.title &&
                <div>
                    <PageHeader title={course.title} tags={<Tag color={tagColor}>{course.difficulty}</Tag>}
                        extra={[
                            <Popconfirm key='del-pop' title='Are you sure delete this course? This is irreversible'
                                onCancel={null} okText='Yes' cancelText='No'
                                onConfirm={() => { handleDeleteCourse(course._id) }}>
                                <Button type='dashed' icon={<DeleteOutlined />} key='del'>Delete Course</Button>
                            </Popconfirm>,
                            <Button icon={<EyeOutlined />} onClick={() => { props.history.push(`/classroom/${course.slug}`) }} key='preview'>Preview Course</Button>,
                            <Button type='primary' icon={<EditOutlined />} onClick={() => { props.history.push(`/dashboard/edit/${course.slug}`) }} key='edit'>Edit Course</Button>,
                        ]}>
                        <Descriptions size='small' column={8}>
                            <Descriptions.Item label='Creator'>{course.author.firstname} {course.author.lastname}</Descriptions.Item>
                            <Descriptions.Item label='Price'>{course.price >= 0 ? 'Free' : course.price}</Descriptions.Item>
                            <Descriptions.Item label='Lessons'>{course.lessonsQuantity}</Descriptions.Item>
                            <Descriptions.Item label='Reviews'>{course.ratingsQuantity}</Descriptions.Item>
                            <Descriptions.Item label='Rating'><Rate defaultValue={course.ratingsAverage} disabled /></Descriptions.Item>
                        </Descriptions>
                    </PageHeader>
                    <div style={{ backgroundColor: 'white', padding: '20px' }}>
                        <div>
                            <Paragraph>{course.description}</Paragraph>
                        </div>
                    </div>
                    <div>
                        <Collapse accordion className='site-collapse-custom-collapse' bordered={true} defaultActiveKey={['lessons']}>
                            <Panel header='Lessons' key='lessons' className='site-collapse-custom-panel' extra={<Button onClick={() => props.history.push(`/dashboard/${course.slug}/lesson/create`)}>Add Lesson</Button>}>
                                <Table size='small' rowKey={(record) => record._id} tableLayout='fixed' pagination={false} dataSource={course.lessons} columns={[
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
                                                            await getCourse(course.slug);
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
                                                        const tempIndex = course.lessons.findIndex((re) => re._id === lesson._id)
                                                        await setLessonIndex(tempIndex);
                                                        setLessonEditModal(true);
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
                            <Panel header='Reviews' key='reviews' className='site-collapse-custom-panel'>
                                <Table tableLayout='fixed' dataSource={course.reviews} pagination={false} expandable={{
                                    expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.review}</p>,
                                }}
                                    columns={[{ title: 'Review', dataIndex: 'review', key: 'review', }]} />
                            </Panel>
                        </Collapse>

                        {/* Modals Edit */}
                        <Modal title='Edit lesson' visible={lessonEditModalVisible} footer={null} width='75vw'
                            onOk={() => setLessonEditModal(false)} onCancel={() => { setLessonEditModal(false) }}>
                            <EditLessonPage lesson={course.lessons[lessonIndex]} course={course} close={() => { setLessonEditModal(false) }} getCourse={getCourse} />
                        </Modal>

                        <Modal title='Create Test' visible={testCreateModalVisible} footer={null} width='75vw'
                            onOk={() => { setTestCreateModal(false) }} onCancel={() => { setTestCreateModal(false) }}>
                            <CreateTestPage course={course} close={() => { setTestCreateModal(false) }} getCourse={getCourse} />
                        </Modal>

                        <Modal title='Edit Test' visible={testEditModalVisible} footer={null} width='75vw'
                            onOk={() => { setTestEditModal(false) }} onCancel={() => { setTestEditModal(false) }}>
                            <EditTestPage course={course} test={course.test ? course.test[testIndex] : {}} close={() => { setTestEditModal(false) }} getCourse={getCourse} />
                        </Modal>
                    </div>
                </div>
            }
        </Layout >
    );
}

export default ManageCoursePage;