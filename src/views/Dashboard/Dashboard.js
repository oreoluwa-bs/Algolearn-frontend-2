import React, { useContext } from 'react';
import { Layout } from 'antd';
import { useRouteMatch, Route, Switch, Redirect } from 'react-router-dom';
import { SideBar } from '../../components/Dashboard';
import { AuthContext } from '../../store/context/auth';
import { CreatedCourses, EnrolledCourses, CreateCoursePage, EditCoursePage, ManageCoursePage } from '.';
import '../../styles/dashboard.css'

const { Content } = Layout;

const DashboardV1 = (props) => {
    const { auth } = props;
    let currentMatch = useRouteMatch();
    return (
        <Layout className='dash'>
            <SideBar currentMatch={currentMatch} />
            <Layout style={{ padding: '48px 48px 0' }}>
                {/* <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
                <Content style={{ padding: 24, margin: 0, backgroundColor: 'white', minHeight: 'calc(100vh - 190px)' }}>
                    <Switch>
                        {
                            auth.role === 'student' &&
                            <Route exact path={`${currentMatch.path}/`} component={EnrolledCourses} />

                        }
                        {
                            auth.role === 'tutor' &&
                            <Route exact path={`${currentMatch.path}/`} component={CreatedCourses} />
                        }
                        <Route path={`${currentMatch.path}/enrolled-courses`} component={EnrolledCourses} />
                        <Route path={`${currentMatch.path}/created-courses`} component={CreatedCourses} />
                        <Route path={`${currentMatch.path}/course/create`} component={CreateCoursePage} />

                        <Route path={`${currentMatch.path}/manage/:slug`} component={ManageCoursePage} />
                        <Route path={`${currentMatch.path}/edit/:slug`} component={EditCoursePage} />
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    );
}

// eslint-disable-next-line no-unused-vars
const DashboardV2 = (props) => {
    const { auth } = props;
    let currentMatch = useRouteMatch();
    return (
        <Content style={{ padding: '0 50px' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
            <Layout style={{ padding: '56px 0 0' }} className='dash'>
                <SideBar currentMatch={currentMatch} />
                <Content style={{ padding: 24, margin: 0, backgroundColor: 'white', minHeight: 'calc(100vh - 190px)' }}>
                    <Switch>
                        {
                            auth.role === 'student' &&
                            <Route exact path={`${currentMatch.path}/`} component={EnrolledCourses} />
                        }
                        {
                            auth.role === 'tutor' &&
                            <Route exact path={`${currentMatch.path}/`} component={CreatedCourses} />
                        }
                        <Route path={`${currentMatch.path}/enrolled-courses`} component={EnrolledCourses} />
                        <Route path={`${currentMatch.path}/created-courses`} component={CreatedCourses} />
                        <Route path={`${currentMatch.path}/course/create`} component={CreateCoursePage} />

                        <Route path={`${currentMatch.path}/manage/:slug`} component={ManageCoursePage} />
                        <Route path={`${currentMatch.path}/edit/:slug`} component={EditCoursePage} />
                    </Switch>
                </Content>
            </Layout>
        </Content>
    );
}

const Dashboard = () => {
    // let currentMatch = useRouteMatch();
    const { auth } = useContext(AuthContext);

    if (!auth) return <Redirect to='/login' />

    return (
        <Layout>
            <DashboardV1 auth={auth} />
            {/* <DashboardV2 auth={auth}/> */}
        </Layout >
    );
}

export default Dashboard;