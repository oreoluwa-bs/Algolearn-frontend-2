import React from 'react';
import { Link } from 'react-router-dom';
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
                    <Link to='/catalogue' />
                </Menu.Item>
            </Menu>
            <span className='ant-divider' style={{ margin: '0 1em' }} />
            <Link to='/login'>
                <Button type='link'>Login</Button>
            </Link>
            <Link to='/signup?v="learner"' style={{ marginLeft: '5px' }}>
                <Button type='primary'>Become a learner</Button>
            </Link>
        </div>
    );
}

export default Outlinks;