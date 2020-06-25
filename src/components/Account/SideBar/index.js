import React, { useState, useContext } from 'react';
import { Layout, Menu } from 'antd';
import { BookOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../store/context/auth';

const { Sider } = Layout;

const SideBar = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const { auth } = useContext(AuthContext);
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} breakpoint='lg'>
            <Menu mode="inline" theme='dark' style={{ height: '100%', borderRight: 0 }} defaultSelectedKeys={[props.location.pathname.split(props.currentMatch.path)[1]]}>
                <Menu.Item key='/'>
                    <UserOutlined />
                    <span>Edit Profile</span>
                    <NavLink to={`${props.currentMatch.path}/`} />
                </Menu.Item>
                {
                    auth.role !== 'admin' &&
                    <Menu.Item key='/enrolled-courses'>
                        <BookOutlined />
                        <span>Enrolled Courses</span>
                        <NavLink to={`${props.currentMatch.path}/enrolled-courses`} />
                    </Menu.Item>}
            </Menu>
        </Sider>
    );
}

export default SideBar;