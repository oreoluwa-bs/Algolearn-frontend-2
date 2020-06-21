import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import SignedOutLinks from './SignedOut';
import SignedInLinks from './SignedIn';
import { AuthContext } from '../../store/context/auth';
import '../../styles/navbar.css';

const { Header } = Layout;

const Navbar = () => {
    const { auth } = useContext(AuthContext);
    const [drawerState, setDrawerState] = useState(false);

    const showDrawer = () => setDrawerState(true);
    const onCloseDrawer = () => setDrawerState(false);
    return (
        <Header className='navbar--header'>
            <Link to='/'><div className='logo' /></Link>
            <div style={{ float: 'right' }}>
                <Button className="barsMenu" type="link" onClick={showDrawer}>
                    <MenuOutlined />
                </Button>
            </div>

            {auth && <SignedInLinks closeDrawer={onCloseDrawer} drawerState={drawerState} />}
            {!auth && <SignedOutLinks closeDrawer={onCloseDrawer} drawerState={drawerState} />}
        </Header>
    );
}

export default Navbar;