import React, { useContext, useState, useEffect } from 'react';
import { PageHeader, Layout, Descriptions, Table, Rate, Avatar, Tag, Space, Typography } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from '../../../store/context/auth';
import { CourseContext } from '../../../store/context/course';
import { utils } from '../../../config';

const { Text } = Typography;

const MonitorCourses = () => {
    const { auth } = useContext(AuthContext);
    const { getAllCourses } = useContext(CourseContext);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const handleInit = async () => {
            const res = await getAllCourses('?sort=createdAt');
            setCourses(res.data.doc);
            // const cs = res.data.doc;
            // setNameFilter(Array.from(new Set(cs.map((course) => `${course.author.firstname} ${course.author.lastname}`))).reduce((obj, item) => { return { ...obj, value: item, text: item }; }, {}));
        }
        handleInit();
    }, [getAllCourses, auth]);

    if (!auth) return <Redirect to='/dashboard' />
    if (auth && auth.role !== 'admin') return <Redirect to='/dashboard' />

    return (
        <Layout>
            <div>
                <PageHeader title='All Courses' >
                    <Descriptions size='small' column={8}>
                        <Descriptions.Item label='Number of Courses'>{courses.length}</Descriptions.Item>
                    </Descriptions>
                </PageHeader>
                <div style={{ backgroundColor: 'white', padding: '20px' }}>
                    <div>
                        <Table size='small' rowKey={(record) => record._id} tableLayout='fixed' pagination={false} dataSource={courses} columns={[
                            {
                                width: 70,
                                title: 'S/N',
                                dataIndex: '_id',
                                key: '_id',
                                render: (text, record, index) => (
                                    <span>{index + 1}</span>
                                ),
                            },
                            {
                                title: 'Title',
                                dataIndex: 'title',
                                key: 'title',
                                render: (text, record) => (
                                    <span>
                                        <Link to={`/catalogue/${record.slug}`}>{text}</Link>
                                    </span>
                                ),
                                sorter: (a, b) => {console.log(a);return a.title < b.title},
                                sortDirections: ['descend', 'ascend'],
                            },
                            {
                                title: 'Author',
                                dataIndex: 'author',
                                key: 'author',
                                render: (text) => (
                                    <span>
                                        <Space>
                                            {
                                                text.photo &&
                                                <Avatar size='small' shape='circle' src={`${utils.apiHOST}images/users/${text.photo}`} style={{ color: 'white', border: `1px solid ${text.color}` }} />
                                            }
                                            {
                                                !text.photo &&
                                                <Avatar size='small' style={{ color: 'white', backgroundColor: text.color ?? '#E0A458' }}>{text.firstname[0]} {text.lastname[0]}</Avatar>
                                            }
                                            <Text>{text.firstname} {text.lastname}</Text>
                                        </Space>
                                    </span>
                                ),
                                sorter: (a, b) => a.author.firstname < b.author.firstname,
                                sortDirections: ['descend', 'ascend'],
                            },
                            {
                                title: 'Difficulty',
                                dataIndex: 'difficulty',
                                key: 'difficulty',
                                filters: [
                                    {
                                        text: 'Beginner',
                                        value: 'Beginner',
                                    }, {
                                        text: 'Intermediate',
                                        value: 'Intermediate',
                                    },
                                    {
                                        text: 'Advanced',
                                        value: 'Advanced',
                                    }
                                ],
                                onFilter: (value, record) => record.difficulty.indexOf(value) === 0,
                                render: (text) => {
                                    const tagColor = text.toLowerCase() === 'intermediate' ? '#2db7f5' : text.toLowerCase() === 'advanced' ? '#108ee9' : '#87d068';
                                    return (
                                        <span>
                                            <Tag color={tagColor} >{text}</Tag>
                                        </span>
                                    )
                                },
                            },
                            {
                                title: 'Average Rating',
                                dataIndex: 'ratingsAverage',
                                key: 'ratingsAverage',
                                sorter: (a, b) => a.ratingsAverage - b.ratingsAverage,
                                sortDirections: ['descend', 'ascend'],
                                render: (text) => (
                                    <span>
                                        <Rate value={text} disabled />
                                    </span>
                                ),
                            },
                            {
                                title: 'Reviews',
                                dataIndex: 'ratingsQuantity',
                                key: 'ratingsQuantity',
                                render: (text) => (
                                    <span>
                                        {text}
                                    </span>
                                ),
                                sorter: (a, b) => a.ratingsQuantity - b.ratingsQuantity,
                                sortDirections: ['descend', 'ascend'],
                            },
                            {
                                title: 'Number of enrolled Users',
                                dataIndex: 'enrollmentCount',
                                key: 'enrollmentCount',
                                sorter: (a, b) => a.enrollmentCount - b.enrollmentCount,
                                sortDirections: ['descend', 'ascend'],
                            },
                            // {
                            //     title: 'Action',
                            //     key: 'action',
                            //     render: (lesson) => (
                            //         <span>
                            //             <Tooltip title='Delete this lesson' key='del-button'>
                            //                 <Popconfirm
                            //                     title='Are you sure delete this lesson?'
                            //                     onConfirm={async () => {
                            //                         await handleDeleteLesson({ courseId: course._id, lessonId: lesson._id });
                            //                         await getLessons(course._id);
                            //                     }}
                            //                     onCancel={null}
                            //                     okText='Yes'
                            //                     cancelText='No'
                            //                 >
                            //                     <Button type='dashed'>Delete</Button>
                            //                 </Popconfirm>
                            //             </Tooltip>
                            //             <Divider type='vertical' />
                            //             <Tooltip title='Edit this lesson' key='edit-button'>
                            //                 <Button type='primary' onClick={async () => {
                            //                     const tempIndex = lessons.findIndex((re) => re._id === lesson._id)
                            //                     props.history.push({
                            //                         pathname: `/dashboard/manage/${course.slug}/lesson/edit/${lesson.slug}`,
                            //                         state: {
                            //                             course,
                            //                             lesson: lessons[tempIndex],
                            //                         }
                            //                     })
                            //                 }} >Edit</Button>
                            //             </Tooltip>
                            //         </span>
                            //     ),
                            // },
                        ]} />
                    </div>
                </div>
            </div >
        </Layout >
    );
}

export default MonitorCourses;
