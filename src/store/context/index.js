import React from 'react';
import { ConfigProvider } from 'antd';
import AuthContextProvider from './auth';
import CourseContextProvider from './course';
import LessonContextProvider from './lesson';
import EnrollmentContextProvider from './enroll';
import QuestionsContextProvider from './questions';
import ReviewContextProvider from './review';
import ReportContextProvider from './report';

function RootContext(props) {
    return (
        <AuthContextProvider>
            <CourseContextProvider>
                <LessonContextProvider>
                    <EnrollmentContextProvider>
                        <QuestionsContextProvider>
                            <ReviewContextProvider>
                                <ReportContextProvider>
                                    <ConfigProvider>
                                        {props.children}
                                    </ConfigProvider>
                                </ReportContextProvider>
                            </ReviewContextProvider>
                        </QuestionsContextProvider>
                    </EnrollmentContextProvider>
                </LessonContextProvider>
            </CourseContextProvider>
        </AuthContextProvider>
    );
}

export default RootContext;
