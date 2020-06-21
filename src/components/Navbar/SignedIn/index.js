import React from 'react';
import Inlinks from './Links';
import InDrawer from './Drawer';

const SignedInLinks = (props) => {
    return (
        <div>
            <Inlinks />
            <InDrawer onClose={props.closeDrawer} visible={props.drawerState} />
        </div >
    );
}

export default SignedInLinks;