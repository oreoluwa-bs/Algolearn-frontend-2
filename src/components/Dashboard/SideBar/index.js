import React, { useState, useContext } from 'react';
import { Layout, Menu } from 'antd';
import { BookOutlined, FolderAddOutlined, UserOutlined, ExclamationCircleOutlined, HomeOutlined, CommentOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../store/context/auth';

const { Sider } = Layout;

const SideBar = ({ currentMatch, location }) => {
    const { auth } = useContext(AuthContext);
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} breakpoint='lg'>
            <Menu mode='inline' theme='dark' style={{ height: '100%', borderRight: 0 }} defaultSelectedKeys={[
                location.pathname.split(currentMatch.path)[1],
                location.pathname.split(currentMatch.path)[1] === '' && auth.role === 'tutor' ? '/created-courses' : null,
                location.pathname.split(currentMatch.path)[1] === '/' && auth.role === 'tutor' ? '/created-courses' : null,

                location.pathname.split(currentMatch.path)[1] === '' && auth.role === 'student' ? '/enrolled-courses' : null,
                location.pathname.split(currentMatch.path)[1] === '/' && auth.role === 'student' ? '/enrolled-courses' : null,

                location.pathname.split(currentMatch.path)[1] === '' && auth.role === 'admin' ? '/home' : null,
                location.pathname.split(currentMatch.path)[1] === '/' && auth.role === 'admin' ? '/home' : null,
            ]}>
                {
                    auth.role === 'tutor' &&
                    <Menu.Item key='/created-courses'>
                        <FolderAddOutlined />
                        <span>Created Courses</span>
                        <NavLink to={`${currentMatch.path}/created-courses`} />
                    </Menu.Item>
                }
                {
                    auth.role !== 'admin' &&
                    <Menu.Item key='/enrolled-courses'>
                        <BookOutlined />
                        <span>Enrolled Courses</span>
                        <NavLink to={`${currentMatch.path}/enrolled-courses`} />
                    </Menu.Item>
                }
                {
                    auth.role !== 'admin' &&
                    <Menu.Item key='/discussion-board'>
                        <CommentOutlined />
                        <span>Discussion Board</span>
                        <NavLink to={`${currentMatch.path}/discussion-board`} />
                    </Menu.Item>
                }
                {
                    auth.role === 'admin' &&
                    <Menu.Item key='/home'>
                        <HomeOutlined />
                        <span>Home</span>
                        <NavLink to={`${currentMatch.path}/home`} />
                    </Menu.Item>
                }
                {
                    auth.role === 'admin' &&
                    <Menu.Item key='/courses'>
                        <BookOutlined />
                        <span>All Courses</span>
                        <NavLink to={`${currentMatch.path}/courses`} />
                    </Menu.Item>
                }
                {
                    auth.role === 'admin' &&
                    <Menu.Item key='/users'>
                        <UserOutlined />
                        <span>All Users</span>
                        <NavLink to={`${currentMatch.path}/users`} />
                    </Menu.Item>
                }
                {
                    auth.role === 'admin' &&
                    <Menu.Item key='/reported-courses'>
                        <ExclamationCircleOutlined />
                        <span>Reported Courses</span>
                        <NavLink to={`${currentMatch.path}/reported-courses`} />
                    </Menu.Item>
                }
            </Menu>
        </Sider>
    );
}

export default SideBar;