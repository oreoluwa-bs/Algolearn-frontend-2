import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { PageHeader, Layout, Tag, Button, Typography, Descriptions, Rate, Tooltip, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, LineChartOutlined, FolderOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { AuthContext } from '../../../store/context/auth';
import { CourseContext } from '../../../store/context/course';

const { Paragraph } = Typography;
const { confirm } = Modal;

const ManageCoursePage = (props) => {
    const { auth } = useContext(AuthContext);
    const { handleGetCourse, handleDeleteCourse } = useContext(CourseContext);
    const [course, setCourse] = useState({});
    const [tagColor, setTagColor] = useState('#2db7f5');

    useEffect(() => {
        const handleInit = async (slug) => {
            const res = await handleGetCourse(slug);
            setCourse(res.data);
            if (res.status === 'error') {
                props.history.push('/dashboard/pageNotFound');
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

    const showDeleteConfirm = () => {
        confirm({
            title: 'Are you sure delete this course?',
            icon: <ExclamationCircleOutlined />,
            content: 'This is action irreversible',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleDeleteCourse(course._id);
            },
            onCancel() { },
        });
    }

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
                            <Tooltip key='del' title='Delete Course'>
                                {/* <Popconfirm key='del-pop' title='Are you sure delete this course? This is irreversible'
                                    onCancel={null} okText='Yes' cancelText='No'
                                    onConfirm={() => { handleDeleteCourse(course._id) }}>
                                    <Button type='dashed' icon={<DeleteOutlined />} key='del' />
                                </Popconfirm> */}
                                <Button onClick={showDeleteConfirm} type='dashed' icon={<DeleteOutlined />} key='del' />

                            </Tooltip>,
                            <Tooltip key='preview' title='Preview Course'>
                                <Button icon={<EyeOutlined />} onClick={() => {
                                    props.history.push({
                                        pathname: `/classroom/${course.slug}`,
                                        state: {
                                            course: { course },
                                        }
                                    })
                                }} />
                            </Tooltip>,
                            <Tooltip key='stats ' title='Course Stats'>
                                <Button icon={<LineChartOutlined />} onClick={() => {
                                    props.history.push({
                                        pathname: `/dashboard/manage/${course.slug}/stats/`,
                                        state: {
                                            course,
                                        }
                                    })
                                }} key='stats' />,
                                                 </Tooltip>,
                            <Tooltip key='manage' title='Manage Course Content'>
                                <Button icon={<FolderOutlined />} onClick={() => {
                                    props.history.push({
                                        pathname: `/dashboard/manage/${course.slug}/content/`,
                                        state: {
                                            course,
                                        }
                                    })
                                }} key='lessons' />
                            </Tooltip>,
                            <Tooltip key='edit' title='Edit Course'>
                                <Button type='primary' icon={<EditOutlined />} onClick={() => { props.history.push(`/dashboard/manage/edit/${course.slug}`) }} />
                            </Tooltip>,
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
                </div>
            }
        </Layout >
    );
}

export default ManageCoursePage;