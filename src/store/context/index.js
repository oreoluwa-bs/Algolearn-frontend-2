import React from 'react';
import { ConfigProvider } from 'antd';
import AuthContextProvider from './auth';
import CourseContextProvider from './course';
import LessonContextProvider from './lesson';
// import ColorContextProvider from './colors';
// import AdminUserContextProvider from './admin';

function RootContext(props) {
    return (
        <AuthContextProvider>
            {/* <AdminUserContextProvider >*/}
            <CourseContextProvider>
                <LessonContextProvider>
                    {/* <ColorContextProvider> */}
                    <ConfigProvider>
                        {props.children}
                    </ConfigProvider>
                    {/* </ColorContextProvider>*/}
                </LessonContextProvider>
            </CourseContextProvider>
            {/*</AdminUserContextProvider> */}
        </AuthContextProvider>
    );
}

export default RootContext;
