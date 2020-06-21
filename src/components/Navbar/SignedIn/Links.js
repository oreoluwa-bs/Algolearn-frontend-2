import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Menu, Avatar } from 'antd';
import { BookOutlined, DashboardOutlined } from '@ant-design/icons';
import { AuthContext } from '../../../store/context/auth';
import { utils } from '../../../config';

const { SubMenu } = Menu;


const Inlinks = (props) => {
    const { auth, handleLogout } = useContext(AuthContext);
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
                    <NavLink to='/catalogue' />
                </Menu.Item>
                <Menu.Item key='classroom'>
                    <DashboardOutlined />
                    <span>Dashboard</span>
                    <NavLink to={`${true ? '/dashboard' : '/admin/dashboard'}`} />
                </Menu.Item>
                <span className='ant-divider' style={{ margin: '0 1em' }} />
                <SubMenu title={
                    <span>
                        {
                            !auth.photo &&
                            <Avatar size='large' shape='circle' style={{ color: 'white', backgroundColor: auth.color }}>{auth.firstname[0]}{auth.lastname[0]}</Avatar>
                        }
                        {
                            auth.photo &&
                            <Avatar size='large' shape='circle' src={`${utils.apiHOST}images/users/${auth.photo}`} style={{ color: 'white', border: `1px solid ${auth.color}` }} />
                        }
                    </span>
                }>
                    <Menu.Item key='manageaccount'>Manage my account<NavLink to='/account/' /></Menu.Item>
                    <Menu.Item key='logout'>
                        <Button block type='primary' onClick={() => handleLogout()}>Logout</Button>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    );
}

export default Inlinks;