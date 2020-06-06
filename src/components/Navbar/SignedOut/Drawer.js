import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Menu, Drawer } from 'antd';
import { BookOutlined } from '@ant-design/icons';


const OutDrawer = (props) => {
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
                    <Menu.Item key='coursess'>
                        <BookOutlined />
                        <span>Catalogue</span>
                    </Menu.Item>
                    <Menu.Divider />
                </Menu>
                <div className=''>
                    <NavLink to='/login'>
                        <Button type='link' block>Login</Button>
                    </NavLink>

                    <NavLink to='/signup?v=student'>
                        <Button type='primary' block>Become a learner</Button>
                    </NavLink>
                </div>
            </div>
        </Drawer>
    );
}

export default OutDrawer;