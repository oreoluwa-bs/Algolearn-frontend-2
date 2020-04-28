import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { BookOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const SideBar = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
            <Menu mode="inline" theme='dark' style={{ height: '100%', borderRight: 0 }} defaultSelectedKeys={[props.location.pathname.split('/account')[1]]}>
                <Menu.Item key='/'>
                    <UserOutlined />
                    <span>Edit Profile</span>
                    <Link to={`${props.currentMatch.path}/`} />
                </Menu.Item>
                <Menu.Item key='/enrolled-courses'>
                    <BookOutlined />
                    <span>Enrolled Courses</span>
                    <Link to={`${props.currentMatch.path}/enrolled-courses`} />
                </Menu.Item>
            </Menu>
        </Sider>
    );
}

export default SideBar;