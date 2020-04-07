import React, { useState, useContext } from 'react';
import { Layout, Menu } from 'antd';
import { BookOutlined, FolderAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../store/context/auth';

const { Sider } = Layout;

const SideBar = ({ currentMatch }) => {
    const { auth } = useContext(AuthContext);
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
            <Menu mode="inline" theme='dark' style={{ height: '100%', borderRight: 0 }} defaultSelectedKeys={[auth.role === 'student' ? 'enrolled-courses' : null, auth.role === 'tutor' ? 'created-courses' : null]}>
                {
                    auth.role === 'student' &&
                    <Menu.Item key='enrolled-courses'>
                        <BookOutlined />
                        <span>Enrolled Courses</span>
                        <Link to={`${currentMatch.path}/`} />
                    </Menu.Item>
                }
                {
                    auth.role === 'tutor' &&
                    <Menu.Item key="created-courses">
                        <FolderAddOutlined />
                        <span>Created Courses</span>
                        <Link to={`${currentMatch.path}/`} />
                    </Menu.Item>
                }
                {
                    auth.role === 'tutor' &&
                    <Menu.Item key='enrolled-courses'>
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