import React from 'react';
import { Typography, Space } from 'antd';
import { FileOutlined, ClockCircleOutlined, ReadOutlined, CheckSquareOutlined, TeamOutlined } from '@ant-design/icons';

const { Text } = Typography;

const CourseAdditionalData = (props) => {
    const contentValue = ['Poor', 'Decent', 'Good', 'Very Good', 'Rich'];
    const { course } = props;
    return (
        <div className='course-additional-data'>
            <div className='course-additional-item'>
                <Text style={{ fontSize: 16 }}>Included in course</Text>
            </div>
            <div className='course-additional-item'>
                <Space>
                    <FileOutlined />
                    <Text level={4}>{course.lessonsQuantity} lessons</Text>
                </Space>
            </div>
            <div className='course-additional-item'>
                <Space>
                    <ReadOutlined />
                    <Text level={4}>{
                        course.ratingsAverage - 1 >= 0 ?
                            contentValue[course.ratingsAverage - 1] : contentValue[0]
                    } Learning Content</Text>
                </Space>
            </div>
            <div className='course-additional-item'>
                <Space>
                    <TeamOutlined />
                    <Text level={4}>Student Support Community</Text>
                </Space>
            </div>
            {
                course.testQuestionCount > 0 &&
                <div className='course-additional-item'>
                    <Space>
                        <CheckSquareOutlined />
                        <Text level={4}>Interactive Quizzes</Text>
                    </Space>
                </div>
            }
            <div className='course-additional-item'>
                <Space>
                    <ClockCircleOutlined />
                    <Text level={4}>Self-Paced Learning</Text>
                </Space>
            </div>
        </div>
    )
}

export default CourseAdditionalData
