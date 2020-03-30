import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu, Drawer } from 'antd';
import { BookOutlined, DashboardOutlined, UserOutlined } from '@ant-design/icons';

const InDrawer = (props) => {
    return (
        <Drawer
            title='Navigation'
            placement='right'
            closable={false}
            onClose={props.onClose}
            visible={props.visible}
        >
            <div>
                <Menu theme='light' mode='vertical' style={{ border: 0 }}>
                    <Menu.Item key='catalogue'>
                        <BookOutlined />
                        <span>Catalogue</span>
                        <Link to='/catalogue' />
                    </Menu.Item>
                    <Menu.Item key='classroom'>
                        <DashboardOutlined />
                        <span>Dashboard</span>
                        <Link to={`${true ? '/dashboard' : '/admin/dashboard'}`} />
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item key='manageaccount'>
                        <UserOutlined />
                        <span>Manage my account</span>
                        <Link to='/account' />
                    </Menu.Item>
                    <Menu.Item key='logout'>
                        <Button block>Logout</Button>
                    </Menu.Item>
                </Menu>
            </div>
        </Drawer>
    );
}

export default InDrawer;