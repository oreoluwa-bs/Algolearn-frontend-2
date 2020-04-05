import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu, Drawer } from 'antd';
import { BookOutlined } from '@ant-design/icons';


const OutDrawer = (props) => {
    return (
        <Drawer
            title="Navigation"
            placement="right"
            closable={false}
            onClose={props.onClose}
            visible={props.visible}
        >
            <div>
                <Menu theme="light" mode="vertical" style={{ border: 0 }}>
                    <Menu.Item key="coursess">
                        <BookOutlined />
                        <span>Catalogue</span>
                    </Menu.Item>
                    <Menu.Divider />
                </Menu>
                <div className=''>
                    <Link to='/login'>
                        <Button type="link" block>Login</Button>
                    </Link>

                    <Link to='/signup?v=student'>
                        <Button type="primary" block>Become a learner</Button>
                    </Link>
                </div>
            </div>
        </Drawer>
    );
}

export default OutDrawer;