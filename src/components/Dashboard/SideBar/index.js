import React, { useState, useContext } from 'react';
import { Layout, Menu } from 'antd';
import { BookOutlined, FolderAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../store/context/auth';

const { Sider } = Layout;

const SideBar = ({ currentMatch, location }) => {
    const { auth } = useContext(AuthContext);
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
            <Menu mode='inline' theme='dark' style={{ height: '100%', borderRight: 0 }} defaultSelectedKeys={[
                location.pathname.split(currentMatch.path)[1],
                location.pathname.split(currentMatch.path)[1] === '' && auth.role === 'tutor' ? '/created-courses' : null,
                location.pathname.split(currentMatch.path)[1] === '/' && auth.role === 'tutor' ? '/created-courses' : null,
                location.pathname.split(currentMatch.path)[1] === '' && auth.role === 'student' ? '/enrolled-courses' : null,
                location.pathname.split(currentMatch.path)[1] === '/' && auth.role === 'student' ? '/enrolled-courses' : null,
            ]}>
                {
                    auth.role === 'tutor' &&
                    <Menu.Item key='/created-courses'>
                        <FolderAddOutlined />
                        <span>Created Courses</span>
                        <Link to={`${currentMatch.path}/created-courses`} />
                    </Menu.Item>
                }
                {
                    auth.role !== 'admin' &&
                    <Menu.Item key='/enrolled-courses'>
                        <BookOutlined />
                        <span>Enrolled Courses</span>
                        <Link to={`${currentMatch.path}/enrolled-courses`} />
                    </Menu.Item>
                }
            </Menu>
        </Sider>
    );
}

export default SideBar;