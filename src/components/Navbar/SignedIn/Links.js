import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu, Avatar } from 'antd';
import { BookOutlined, DashboardOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;


const Inlinks = (props) => {
    return (
        <div className='nav-links-right'>
            <Menu
                mode='horizontal'
                theme='dark'
                // style={{ lineHeight: '64px', float: 'left' }}
                style={{ float: 'left' }}
            >
                <Menu.Item key='catalogue'>
                    <BookOutlined />
                    <span>Catalogue</span>
                    <Link to='/catalogue' />
                </Menu.Item>
                {
                    // props.auth.role !== 'admin' &&
                    <Menu.Item key='classroom'>
                        <DashboardOutlined />
                        <span>Dashboard</span>
                        <Link to={`${true ? '/dashboard' : '/admin/dashboard'}`} />
                    </Menu.Item>
                }
                <span className='ant-divider' style={{ margin: '0 1em' }} />
                <SubMenu title={
                    <span className='submenu-title-wrapper'>
                        {/* <Avatar size='large' shape='circle' style={{ color: 'white', backgroundColor: localStorage.getItem('avatarColor') }}>{auth.firstname[0]}{auth.lastname[0]}</Avatar> */}
                        <Avatar size='large' shape='circle' style={{ color: 'white', backgroundColor: localStorage.getItem('avatarColor') }}>LK</Avatar>
                    </span>
                }>
                    <Menu.Item key='manageaccount'>Manage your account<Link to='/account' /></Menu.Item>
                    <Menu.Item key='logout'>
                        <Button block type='primary' onClick={() => { }}>Logout</Button>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    );
}

export default Inlinks;