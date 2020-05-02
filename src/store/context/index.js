import React from 'react';
import { ConfigProvider } from 'antd';
import AuthContextProvider from './auth';
import CourseContextProvider from './course';
import LessonContextProvider from './lesson';
import EnrollmentContextProvider from './enroll';
// import ColorContextProvider from './colors';
// import AdminUserContextProvider from './admin';

function RootContext(props) {
    return (
        <AuthContextProvider>
            {/* <AdminUserContextProvider >*/}
            <CourseContextProvider>
                <LessonContextProvider>
                    <EnrollmentContextProvider>
                        <ConfigProvider>
                            {props.children}
                        </ConfigProvider>
                    </EnrollmentContextProvider>
                </LessonContextProvider>
            </CourseContextProvider>
            {/*</AdminUserContextProvider> */}
        </AuthContextProvider>
    );
}

export default RootContext;
