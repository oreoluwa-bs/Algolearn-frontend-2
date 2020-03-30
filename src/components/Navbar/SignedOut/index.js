import React, { useState } from 'react';
import Outlinks from './Links';
import OutDrawer from './Drawer';

const SignedOutLinks = (props) => {
    return (
        <div>
            <Outlinks />
            <OutDrawer onClose={props.closeDrawer} visible={props.drawerState} />
        </div>
    );
}

export default SignedOutLinks;