import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Button } from 'antd';
import { BookOutlined } from '@ant-design/icons';

const Outlinks = () => {
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
            </Menu>
            <span className='ant-divider' style={{ margin: '0 1em' }} />
            <NavLink to='/login'>
                <Button type='link'>Login</Button>
            </NavLink>
            <NavLink to='/signup?v=student' style={{ marginLeft: '5px' }}>
                <Button type='primary'>Become a learner</Button>
            </NavLink>
        </div>
    );
}

export default Outlinks;