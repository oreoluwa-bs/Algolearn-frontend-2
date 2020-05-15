import React from 'react';
import { Progress, Popconfirm, message, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Paragraph } = Typography;

const EnrolledPreview = (props) => {
    const { courseData, hideDeleteButton, link } = props;

    const progressPercent = Math.floor((courseData.completed.length / courseData.course.lessonsQuantity) * 100);
    return (
        <div className='enroll-course-card'>
            <div className='enroll-course-card-content'>
                <div className='enroll-course-card-side' style={{ backgroundColor: courseData.course.color ?? '#102542' }}></div>
                <div className='enroll-course-card-body'>
                    {
                        !hideDeleteButton &&
                        <div className='del-button-container'>
                            <Popconfirm
                                title='Are you sure you want unenroll for this course? All progress would be lost!'
                                onConfirm={() => { message.success('Done') }}
                                okText='Yes'
                                cancelText='No'
                            >
                                <span className='del-button'><DeleteOutlined /></span>
                            </Popconfirm>
                        </div>
                    }
                    {
                        link &&
                        <Link to={link}>
                            <div>
                                <h1>{courseData.course.title}</h1>
                                <Paragraph ellipsis={{ rows: 3 }}>{courseData.course.description}</Paragraph>
                                <div>
                                    <Progress percent={progressPercent} status='active' strokeColor={courseData.course.color} />
                                </div>
                            </div>
                        </Link>
                    }
                    {
                        !link &&
                        <div>
                            <h1>{courseData.course.title}</h1>
                            <Paragraph ellipsis={{ rows: 3 }}>{courseData.course.description}</Paragraph>

                            <div>
                                <Progress percent={progressPercent} status='active' strokeColor={courseData.course.color} />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default EnrolledPreview;