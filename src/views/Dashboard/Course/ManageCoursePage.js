import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { PageHeader, Layout, Tag, Button, Typography, Descriptions, Rate, Collapse, Table, Tooltip, Divider, Popconfirm, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { AuthContext } from '../../../store/context/auth';
import { CourseContext } from '../../../store/context/course';

const { Paragraph } = Typography;
const { Panel } = Collapse;

const ManageCoursePage = (props) => {
    const { auth, handleGetMe } = useContext(AuthContext);
    const { handleGetCourse } = useContext(CourseContext);

    const [course, setCourse] = useState({});
    const [lessonModalVisible, setLessonModal] = useState(false);
    const [testModalVisible, setTestModal] = useState(false);
    const [tagColor, setTagColor] = useState('#2db7f5');


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

    return (
        <Layout>
            {
                course && course.title &&
                <div>
                    <PageHeader title={course.title} tags={<Tag color={tagColor}>{course.difficulty}</Tag>}
                        extra={[
                            <Popconfirm key='del-pop' title='Are you sure delete this course? This is irreversible'
                                onCancel={null} okText='Yes' cancelText='No'
                                onConfirm={() => {
                                    // handleDeleteLesson(course._id, lesson.key);
                                }}
                            >
                                <Button type='danger' icon={<DeleteOutlined />} key='del'>Delete Course</Button>
                            </Popconfirm>,
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
                            <Panel header='Lessons' key='lessons' className='site-collapse-custom-panel' extra={<Button onClick={event => { event.stopPropagation(); setLessonModal(true) }}>Add Lesson</Button>}>
                                <Table size='small' rowKey={(record) => record._id} tableLayout='fixed' dataSource={course.lessons} columns={[
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
                                                        onConfirm={() => {
                                                            // handleDeleteLesson(course._id, lesson.key);
                                                        }}
                                                        onCancel={null}
                                                        okText='Yes'
                                                        cancelText='No'
                                                    >
                                                        <Button type='danger' icon='delete' />
                                                    </Popconfirm>
                                                </Tooltip>
                                                <Divider type='vertical' />
                                                <Tooltip title='Edit this lesson' key='edit-button'>
                                                    <Button type='primary' icon='edit' onClick={() => {
                                                        // props.history.push(`/${course._id}/${lesson.key}/lesson/edit`);
                                                    }} />
                                                </Tooltip>
                                            </span>
                                        ),
                                    },
                                ]} />
                            </Panel>
                            <Panel header='Final test' key='test' className='site-collapse-custom-panel' extra={<Button onClick={event => { event.stopPropagation(); setTestModal(true); }}>Add Question</Button>}>
                                <Table tableLayout='fixed' dataSource={course.test} columns={[
                                    {
                                        title: 'Question',
                                        dataIndex: 'question',
                                        key: 'question',
                                    },
                                    {
                                        title: 'Action',
                                        key: 'action',
                                        render: (lesson) => (
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
                                                        <Button type='danger' icon='delete' />
                                                    </Popconfirm>
                                                </Tooltip>
                                                <Divider type='vertical' />
                                                <Tooltip title='Edit this lesson' key='edit-button'>
                                                    <Button type='primary' icon='edit' onClick={() => {
                                                        // props.history.push(`/${course._id}/${lesson.key}/lesson/edit`);
                                                    }} />
                                                </Tooltip>
                                            </span>
                                        ),
                                    },
                                ]} />
                            </Panel>
                            <Panel header='Reviews' key='reviews' className='site-collapse-custom-panel'>
                                <Table tableLayout='fixed' dataSource={course.reviews} expandable={{
                                    expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.review}</p>,
                                }}
                                    columns={[{ title: 'Review', dataIndex: 'review', key: 'review', }]} />
                            </Panel>
                        </Collapse>

                        {/* Modals */}
                        <Modal title='Create lesson' visible={lessonModalVisible} footer={null}
                            onOk={() => setLessonModal(false)} onCancel={() => { setLessonModal(false) }}>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                        </Modal>

                        <Modal title='Create Test' visible={testModalVisible} footer={null}
                            onOk={() => { setTestModal(false) }} onCancel={() => { setTestModal(false) }}>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                        </Modal>
                    </div>
                </div>
            }
        </Layout >
    );
}

export default ManageCoursePage;