import React from 'react';
import { Progress, Space, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

// const { } = Typography;

const EnrolledPreview = (props) => {
    const { courseData } = props;
    return (
        <div className='enroll-course-card'>
            <Space>
                <div className='enroll-course-card-side' style={{ backgroundColor: '#102542' }}></div>
                <div className='enroll-course-card-body'>
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
                    <Link to={`/catalogue/${courseData.course.slug}`}>
                        <div>
                            <h1>{courseData.course.title}</h1>
                            <div>
                                <Progress percent={50} status='active' />
                            </div>
                        </div>
                    </Link>
                </div>
            </Space>
        </div>
    );
}

export default EnrolledPreview;