import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { PageHeader, Layout, Collapse, Table, Tabs } from 'antd';
// eslint-disable-next-line no-unused-vars
import { LineChartOutlined, BarChartOutlined, CommentOutlined } from '@ant-design/icons';
import { AuthContext } from '../../../store/context/auth';
import { CourseContext } from '../../../store/context/course';
import { EnrollmentStats } from '../../../components/Dashboard';

const { TabPane } = Tabs;

const { Panel } = Collapse;

const CourseStatsPage = (props) => {
    const { auth } = useContext(AuthContext);
    const { handleGetCourse } = useContext(CourseContext);
    const [course, setCourse] = useState({});

    useEffect(() => {
        if (props?.location?.state) {
            setCourse(props.location.state.course);
        } else {
            const alt = async () => {
                const res = await handleGetCourse(props.match.params.slug);
                setCourse(res.data);
                if (res?.status === 'error') {
                    props.history.push(`/dashboard/manage/${props.match.params.slug}`)
                }
            }
            alt();
        }
    }, [handleGetCourse, props]);

    if (!auth) return <Redirect to='/dashboard' />
    if (auth && auth.role === 'student') return <Redirect to='/dashboard' />
    if (auth && course && course.title && auth._id.toString() !== course.author._id.toString()) return <Redirect to='/dashboard' />

    return (
        <Layout>
            {
                course?.title &&
                <div>
                    <PageHeader onBack={() => { props.history.push(`/dashboard/manage/${props.match.params.slug}`) }} title={course.title} extra={[]}></PageHeader>
                    <div style={{ backgroundColor: 'white', padding: '20px 0' }}>
                        <Tabs defaultActiveKey='all-reviews' tabPosition="left">
                            <TabPane tab={<span><CommentOutlined />Reviews</span>} key='all-reviews'>
                                <div>
                                    <Collapse accordion className='site-collapse-custom-collapse' bordered={false} defaultActiveKey={['reviews']}>
                                        <Panel header='Reviews' key='reviews' className='site-collapse-custom-panel'>
                                            <Table tableLayout='fixed' dataSource={course.reviews} pagination={false} expandable={{
                                                expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.review}</p>,
                                            }}
                                                columns={[{ title: 'Review', dataIndex: 'review', key: 'review', }]} />
                                        </Panel>
                                    </Collapse>
                                </div>
                            </TabPane>
                            <TabPane tab={<span><LineChartOutlined />Enrollment Stats</span>} key='enrollment-stats'>
                                <EnrollmentStats course={course} />
                            </TabPane>
                            {/* <TabPane tab={<span><BarChartOutlined />Test Stats</span>} key='test-stats'>Tab 2</TabPane> */}
                        </Tabs>
                    </div>
                </div>
            }
        </Layout >
    );
}

export default CourseStatsPage;