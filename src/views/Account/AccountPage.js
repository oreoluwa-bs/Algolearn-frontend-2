import React, { useContext, useEffect } from 'react';
import { Layout } from 'antd';
import { useRouteMatch, Route, Switch, Redirect } from 'react-router-dom';
import { SideBar } from '../../components/Account';
import { AuthContext } from '../../store/context/auth';
import { EditProfilePage, EnrolledCourses } from '.';
import '../../styles/account.css'
import { PageNotfoundDashboard } from '../../components/Dashboard';

const { Content } = Layout;

const DashboardV1 = (props) => {
    let currentMatch = useRouteMatch();
    return (
        <Layout className='dash'>
            <SideBar currentMatch={currentMatch} location={props.allProps.location} />
            <Layout style={{ padding: '48px 48px 0' }}>
                <Content style={{ padding: 24, margin: 0, backgroundColor: 'white', minHeight: 'calc(100vh - 190px)' }}>
                    <Switch>

                        <Route exact path={`${currentMatch.path}/`} component={EditProfilePage} />
                        <Route path={`${currentMatch.path}/enrolled-courses`} component={EnrolledCourses} />
                        {/* <Route path={`${currentMatch.path}/created-courses`} component={CreatedCourses} />

                        <Route path={`${currentMatch.path}/manage/:slug`} component={ManageCoursePage} />
                        <Route path={`${currentMatch.path}/edit/:slug`} component={EditCoursePage} /> */}
                        <Route component={PageNotfoundDashboard} />
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    );
}

const AccountPage = (props) => {
    const { auth, handleGetMe } = useContext(AuthContext);

    useEffect(() => {
        const init = async () => {
            await handleGetMe();
        }
        init();
    }, [handleGetMe]);

    if (!auth) return <Redirect to='/login' />
    return (
        <Layout>
            <DashboardV1 auth={auth} allProps={props} />
        </Layout >
    );
}

export default AccountPage;