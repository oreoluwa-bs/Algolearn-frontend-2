import React, { useContext, useEffect, useState } from 'react';
import { PageHeader, Button, Table, Tooltip, Divider, Popconfirm } from 'antd';
import { LessonContext } from '../../../store/context/lesson';
import Title from 'antd/lib/typography/Title';

const ManageLessonsPage = (props) => {
    const { course } = props;
    const { handleDeleteLesson, handleGetCourseLessons } = useContext(LessonContext);
    const [lessons, setLessons] = useState([]);

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
    }, [course, handleGetCourseLessons]);

    return (
        <>
            <PageHeader title={<Title level={4} type='secondary'>Lessons</Title>}
                extra={[
                    <Button key='add' onClick={() => (props.history.push({
                        pathname: `/dashboard/${course.slug}/lesson/create`, state: { course, }
                    }))}>Add Lesson</Button>
                ]}>
            </PageHeader>
            <div style={{ padding: 24, }}>
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
            </div>

        </>
    );
}

export default ManageLessonsPage;