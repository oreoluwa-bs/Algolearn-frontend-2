import React, { useContext, useEffect, useState } from 'react';
import { Layout, Statistic, Col, Row, Divider, Select, Typography, Space } from 'antd';
import { Line } from 'react-chartjs-2';
import { Redirect, Link } from 'react-router-dom';
import { AuthContext } from '../../../store/context/auth';
import { utils } from '../../../config';

const { Option } = Select;
const { Text } = Typography;

const AdminHome = (props) => {
    const { auth, handleUsersStats } = useContext(AuthContext);
    const [userStats, setUserStats] = useState([...Array(12).fill(0)]);
    const [usersCount, setUsersCount] = useState(0);

    const handleChangeYear = async (year) => {
        const res = await handleUsersStats(year);

        const statts = res.data.stats;
        let userStatsData = new Array(12);
        statts.forEach(element => {
            userStatsData[element.month - 1] = element.numUsers;
        });
        userStatsData = Array.from(userStatsData, item => item || 0);

        setUserStats(userStatsData);
        setUsersCount(res.data.userCount);
    }

    const onChange = (value) => {
        handleChangeYear(value);
    }

    useEffect(() => {
        const handleInit = async () => {
            const res = await handleUsersStats(new Date().getFullYear());

            const statts = res.data.stats;
            let userStatsData = new Array(12);
            statts.forEach(element => {
                userStatsData[element.month - 1] = element.numUsers;
            });
            userStatsData = Array.from(userStatsData, item => item || 0);

            setUserStats(userStatsData);
            setUsersCount(res.data.userCount);
        }
        handleInit();
    }, [handleUsersStats]);

    if (!auth) return <Redirect to='/dashboard' />
    if (auth && auth.role !== 'admin') return <Redirect to='/dashboard' />

    return (
        <Layout>
            <div>
                <div style={{ backgroundColor: 'white', padding: '20px' }}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Statistic title='Total Users' value={usersCount} />
                        </Col>
                        <Col span={12}>
                            {/* <Statistic title='Account Balance' value={112893} precision={2} /> */}
                            <Space size='small' direction='vertical'>
                                <Text type='secondary'>Action</Text>
                                <Link to={`/admin-signup`} className='ant-btn ant-btn-dashed ant-btn-sm'>Create Administrator Account</Link>
                            </Space>
                        </Col>
                    </Row>
                    <Divider />
                    <div>
                        <Select showSearch style={{ width: 100, float: 'right' }} placeholder="Select a year" defaultValue={new Date().getFullYear()} onChange={onChange}
                            optionFilterProp="children" filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                            {
                                utils.getYearRange().map((yearValue) => <Option key={yearValue} value={yearValue}>{yearValue}</Option>)
                            }
                        </Select>
                    </div>
                    <Line
                        data={
                            {
                                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                                datasets: [
                                    {
                                        label: 'Number Users / month',
                                        borderWidth: 1,
                                        pointBorderColor: 'rgba(75,192,192,1)',
                                        pointBackgroundColor: '#fff',
                                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                                        pointHitRadius: 10,
                                        backgroundColor: 'rgba(75,192,192,0.4)',
                                        borderColor: 'rgba(75,192,192,1)',
                                        borderCapStyle: 'butt',
                                        // borderDash: [5],

                                        data: userStats
                                    }
                                ]
                            }
                        }
                        // width={100}
                        height={100}
                    // options={{ maintainAspectRatio: false }}
                    />
                </div>
            </div>
        </Layout>
    );
}

export default AdminHome;
