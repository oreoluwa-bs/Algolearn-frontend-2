import React from 'react';
import { ConfigProvider } from 'antd';
import AuthContextProvider from './auth';
import CourseContextProvider from './course';
import LessonContextProvider from './lesson';
import EnrollmentContextProvider from './enroll';
import QuestionsContextProvider from './questions';
import ReportContextProvider from './report';
// import AdminUserContextProvider from './admin';

function RootContext(props) {
    return (
        <AuthContextProvider>
            {/* <AdminUserContextProvider >*/}
            <CourseContextProvider>
                <LessonContextProvider>
                    <EnrollmentContextProvider>
                        <QuestionsContextProvider>
                            <ReportContextProvider>
                                <ConfigProvider>
                                    {props.children}
                                </ConfigProvider>
                            </ReportContextProvider>
                        </QuestionsContextProvider>
                    </EnrollmentContextProvider>
                </LessonContextProvider>
            </CourseContextProvider>
            {/*</AdminUserContextProvider> */}
        </AuthContextProvider>
    );
}

export default RootContext;
