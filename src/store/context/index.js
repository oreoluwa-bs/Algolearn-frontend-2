import React from 'react';
import AuthContextProvider from './auth';
import CourseContextProvider from './course';
import LessonContextProvider from './lesson';
// import ColorContextProvider from './colors';
// import { config } from '../../config';
// import AdminUserContextProvider from './admin';

function RootContext(props) {
    // const apiUrl = config.apiUrl;
    // const apiUrl = 'http://localhost:5000/api/v1'
    return (
        <AuthContextProvider>
            {/* <AdminUserContextProvider >*/}
            <CourseContextProvider>
                <LessonContextProvider>
                    {/* <ColorContextProvider> */}
                    {props.children}
                    {/* </ColorContextProvider>*/}
                </LessonContextProvider>
            </CourseContextProvider>
            {/*</AdminUserContextProvider> */}
        </AuthContextProvider>
    );
}

export default RootContext;
