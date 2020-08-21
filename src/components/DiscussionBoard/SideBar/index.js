import React, { useState, useContext, } from 'react';
import { Layout, Menu, Space } from 'antd';
import { BookOutlined, UserOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../../store/context/auth';

const { Sider } = Layout;
const { SubMenu } = Menu;


const SideBar = ({ currentMatch, location, courseData, users }) => {
    const { auth } = useContext(AuthContext);
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} breakpoint='lg'>

            <Menu mode='inline' theme='dark' style={{ height: '100%', borderRight: 0 }} selectable={false} openKeys={[users.filter((item) => item.dbID !== auth._id).length > 0 && 'sub2']}>
                <Menu.Item key={`title`}>
                    <BookOutlined />
                    <span>{courseData.course.title}</span>
                </Menu.Item>
                <SubMenu key="sub2" icon={<UserOutlined />} title="Active Users">
                    {/* <Menu.ItemGroup> */}
                    {
                        users && users.filter((item) => item.dbID !== auth._id).map((item, index) => {
                            if (index > 5) return null
                            return (
                                <Menu.Item key={`/{item.id}`}>
                                    <Space>
                                        <FontAwesomeIcon icon={faCircle} color='#39ff14' size='1x' transform='shrink-4' />
                                        <span>{item.firstname}</span>
                                    </Space>
                                </Menu.Item>
                            );
                        })
                    }
                    {/* </Menu.ItemGroup> */}
                </SubMenu>
            </Menu>
        </Sider>
    );
}

export default SideBar;
// title={<span><Space><UserOutlined />Active Users</Space></span>}