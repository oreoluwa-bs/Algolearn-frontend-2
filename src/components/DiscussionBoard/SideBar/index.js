import React, { useState, useContext } from 'react';
import { Layout, Menu, PageHeader } from 'antd';
// import { BookOutlined, FolderAddOutlined, UserOutlined, ExclamationCircleOutlined, HomeOutlined, CommentOutlined } from '@ant-design/icons';
// import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../store/context/auth';

const { Sider } = Layout;

const SideBar = ({ currentMatch, location, courseData }) => {
    const { auth } = useContext(AuthContext);
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} breakpoint='lg'>
            <h1>{}</h1>
            <PageHeader
            style={{backgroundColor:'white'}}
                onBack={() => {  }}
                title='Lessons' />
            {/* <Menu mode="inline" theme='dark' style={{ height: '100%', borderRight: 0 }}>

                <Menu.Item key={`/slug}`}>
                    <span>{courseData.course.title}</span>
                    <NavLink to={{
                                    pathname: `/classroom/${props.currentMatch.params.slug}/lesson/${lessonItem.slug}`,
                                    state: {
                                        course,
                                        lesson: lessonItem,
                                        lessons,
                                    }
                                }} />
                </Menu.Item>
            </Menu> */}
        </Sider>
    );
}

export default SideBar;