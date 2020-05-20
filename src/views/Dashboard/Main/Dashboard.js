import React, { useContext } from 'react';
import { Layout } from 'antd';
import { useRouteMatch, Route, Switch, Redirect } from 'react-router-dom';
import { SideBar, PageNotfoundDashboard } from '../../../components/Dashboard';
import { AuthContext } from '../../../store/context/auth';
import {
    CreatedCourses, EnrolledCourses, CreateCoursePage, EditCoursePage,
    ManageCoursePage, CreateLessonPage, EditLessonPage,
    CourseStatsPage, ManageCourseContent
} from '..';
import '../../../styles/dashboard.css'

const { Content } = Layout;

const DashboardV1 = (props) => {
    const { auth, allProps } = props;
    let currentMatch = useRouteMatch();
    return (
        <Layout className='dash'>
            <SideBar currentMatch={currentMatch} location={allProps.location} />
            <Layout style={{ padding: '48px 48px 0' }}>
                <Content style={{ padding: 24, margin: 0, backgroundColor: 'white', minHeight: 'calc(100vh - 190px)' }}>
                    <Switch>
                        <Route exact path={`${currentMatch.path}/`} component={() => {
                            if (auth.role === 'student') return <Redirect to={`${currentMatch.path}/enrolled-courses`} />
                            if (auth.role === 'tutor') return <Redirect to={`${currentMatch.path}/created-courses`} />
                            return
                        }} />
                        <Route path={`${currentMatch.path}/enrolled-courses`} component={EnrolledCourses} />
                        <Route path={`${currentMatch.path}/created-courses`} component={CreatedCourses} />
                        <Route path={`${currentMatch.path}/course/create`} component={CreateCoursePage} />

                        <Route exact path={`${currentMatch.path}/manage/:slug`} component={ManageCoursePage} />
                        <Route exact path={`${currentMatch.path}/manage/edit/:slug`} component={EditCoursePage} />
                        <Route exact path={`${currentMatch.path}/manage/:slug/content/`} component={ManageCourseContent} />
                        <Route exact path={`${currentMatch.path}/manage/:slug/lesson/edit/:lessonSlug`} component={EditLessonPage} />
                        <Route exact path={`${currentMatch.path}/manage/:slug/stats`} component={CourseStatsPage} />

                        <Route path={`${currentMatch.path}/:slug/lesson/create`} component={CreateLessonPage} />

                        <Route component={PageNotfoundDashboard} />
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    );
}

// eslint-disable-next-line no-unused-vars
const DashboardV2 = (props) => {
    const { auth, allProps } = props;
    let currentMatch = useRouteMatch();
    return (
        <Content style={{ padding: '0 50px' }}>
            <Layout style={{ padding: '56px 0 0' }} className='dash'>
                <SideBar currentMatch={currentMatch} location={allProps.location} />
                <Content style={{ padding: 24, margin: 0, backgroundColor: 'white', minHeight: 'calc(100vh - 190px)' }}>
                    <Switch>
                        {/* {
                            auth.role === 'student' &&
                            <Route exact path={`${currentMatch.path}/`} component={EnrolledCourses} />
                        }
                        {
                            auth.role === 'tutor' &&
                            <Route exact path={`${currentMatch.path}/`} component={CreatedCourses} />
                        } */}
                        <Route exact path={`${currentMatch.path}/`} component={() => {
                            if (auth.role === 'student') return <Redirect to={`${currentMatch.path}/enrolled-courses`} />
                            if (auth.role === 'tutor') return <Redirect to={`${currentMatch.path}/created-courses`} />
                        }} />
                        <Route path={`${currentMatch.path}/enrolled-courses`} component={EnrolledCourses} />
                        <Route path={`${currentMatch.path}/created-courses`} component={CreatedCourses} />
                        <Route path={`${currentMatch.path}/course/create`} component={CreateCoursePage} />

                        <Route exact path={`${currentMatch.path}/manage/:slug`} component={ManageCoursePage} />
                        <Route exact path={`${currentMatch.path}/manage/edit/:slug`} component={EditCoursePage} />
                        <Route exact path={`${currentMatch.path}/manage/:slug/content/`} component={ManageCourseContent} />
                        <Route exact path={`${currentMatch.path}/manage/:slug/lesson/edit/:lessonSlug`} component={EditLessonPage} />
                        <Route exact path={`${currentMatch.path}/manage/:slug/stats`} component={ManageCoursePage} />

                        <Route path={`${currentMatch.path}/:slug/lesson/create`} component={CreateLessonPage} />

                        <Route component={PageNotfoundDashboard} />
                    </Switch>
                </Content>
            </Layout>
        </Content>
    );
}

const Dashboard = (props) => {
    const { auth } = useContext(AuthContext);

    if (!auth) return <Redirect to='/login' />
    return (
        <Layout>
            <DashboardV1 auth={auth} allProps={props} />
            {/* <DashboardV2 auth={auth}/> */}
        </Layout >
    );
}

export default Dashboard;