import React, { useContext, useState, useEffect } from 'react';
import { PageHeader, Layout, Descriptions, Table, Avatar, Tooltip, Popconfirm, Button } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from '../../../store/context/auth';
import { ReportContext } from '../../../store/context/report';

const MonitorReportedCourses = () => {
    const { auth } = useContext(AuthContext);
    const { handleGetReportedCourses, handleDeleteReportedCourse } = useContext(ReportContext);
    const [courses, setCourses] = useState([]);

    const getCourses = async () => {
        const res = await handleGetReportedCourses('?sort=createdAt');
        setCourses(res.doc);
    }

    useEffect(() => {
        const handleInit = async () => {
            const res = await handleGetReportedCourses('?sort=createdAt');
            setCourses(res.doc);
        }
        handleInit();
    }, [handleGetReportedCourses, auth]);

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
                                title: 'Course - Lesson',
                                dataIndex: 'title',
                                key: 'title',
                                render: (text, record) => (
                                    <span>
                                        <Link to={`/classroom/${record.course.slug}/lesson/${record.lesson?.slug}`}>{record.course.title} - {record.lesson.title}</Link>
                                    </span>
                                ),
                            },
                            {
                                title: 'Report',
                                dataIndex: 'report',
                                key: 'report',
                                // render: (text) => (
                                //     <span>
                                //         {text}
                                //     </span>
                                // ),
                            },
                            {
                                title: 'Author',
                                dataIndex: 'user',
                                key: 'user',
                                render: (text) => (
                                    <span>
                                        {
                                            text.photo &&
                                            <Avatar size='small' style={{ color: 'white', backgroundColor: text.color ?? '#E0A458', marginRight: 10 }}> {text.firstname[0]} {text.lastname[0]}</Avatar>
                                        }
                                        {
                                            !text.photo &&
                                            <Avatar size='small' style={{ color: 'white', backgroundColor: text.color ?? '#E0A458', marginRight: 10 }}> {text.firstname[0]} {text.lastname[0]}</Avatar>
                                        }
                                        {text.firstname} {text.lastname}
                                    </span>
                                ),
                            },
                            {
                                title: 'Action',
                                key: 'action',
                                render: (report) => (
                                    <span>
                                        <Tooltip title='Delete this report' key='del-button'>
                                            <Popconfirm
                                                title='Are you sure delete this report?'
                                                onConfirm={async () => {
                                                    await handleDeleteReportedCourse(report._id);
                                                    await getCourses();
                                                }}
                                                onCancel={null}
                                                okText='Yes'
                                                cancelText='No'
                                            >
                                                <Button type='dashed'>Delete</Button>
                                            </Popconfirm>
                                        </Tooltip>
                                    </span>
                                ),
                            },
                        ]} />
                    </div>
                </div>
            </div >
        </Layout >
    );
}

export default MonitorReportedCourses;
