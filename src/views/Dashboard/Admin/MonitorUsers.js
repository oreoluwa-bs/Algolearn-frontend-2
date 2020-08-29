import React, { useContext, useState, useEffect } from 'react';
import { PageHeader, Layout, Descriptions, Table, Avatar, Space, Typography } from 'antd';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../../store/context/auth';
import { utils } from '../../../config';

const { Text } = Typography;

const MonitorUsers = () => {
    const { auth, handleGetAllUsers } = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const handleInit = async () => {
            const res = await handleGetAllUsers();
            setUsers(res.data.doc);
        }
        handleInit();
    }, [handleGetAllUsers, auth]);

    if (!auth) return <Redirect to='/dashboard' />
    if (auth && auth.role !== 'admin') return <Redirect to='/dashboard' />

    return (
        <Layout>
            <div>
                <PageHeader title='All Users' >
                    <Descriptions size='small' column={8}>
                        <Descriptions.Item label='Number of Users'>{users.length}</Descriptions.Item>
                    </Descriptions>
                </PageHeader>
                <div style={{ backgroundColor: 'white', padding: '20px' }}>
                    <div>
                        <Table size='small' rowKey={(record) => record._id} tableLayout='fixed' pagination={false} dataSource={users} columns={[
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
                                title: 'Full Name',
                                dataIndex: 'fullname',
                                key: 'fullname',
                                render: (text, record) => (
                                    <span>
                                        <Space>
                                            {
                                                record.photo &&
                                                <Avatar alt='user-profile-photo' size='small' shape='circle' src={`${utils.apiHOST}images/users/${record.photo}`} style={{ color: 'white', border: `1px solid ${record.color}` }} />
                                            }
                                            {
                                                !record.photo &&
                                                <Avatar alt='user-profile-photo' size='small' style={{ color: 'white', backgroundColor: record.color ?? '#E0A458' }}>{record.firstname[0]} {record.lastname[0]}</Avatar>
                                            }
                                            <Text>{record.firstname} {record.lastname}</Text>
                                        </Space>
                                    </span>
                                ),
                                sorter: (a, b) => a.firstname < b.firstname,
                                sortDirections: ['descend', 'ascend'],
                            },
                            {
                                title: 'Number of enrolled courses',
                                dataIndex: 'enrollmentCount',
                                key: 'enrollmentCount',
                                sorter: (a, b) => a.enrollmentCount - b.enrollmentCount,
                                sortDirections: ['descend', 'ascend'],
                            },
                            {
                                title: 'Number of created courses',
                                dataIndex: 'createdCoursesCount',
                                key: 'createdCoursesCount',
                                sorter: (a, b) => a.createdCoursesCount - b.createdCoursesCount,
                                sortDirections: ['descend', 'ascend'],
                            },
                            {
                                title: 'Role',
                                dataIndex: 'role',
                                key: 'role',
                                filters: [
                                    {
                                        text: 'Student',
                                        value: 'student',
                                    }, {
                                        text: 'Tutor',
                                        value: 'tutor',
                                    },
                                    {
                                        text: 'Administrator',
                                        value: 'admin',
                                    }
                                ],
                                onFilter: (value, record) => record.role.indexOf(value) === 0,
                                render: (role) => (
                                    <span>
                                        {role.toUpperCase()}
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

export default MonitorUsers;
