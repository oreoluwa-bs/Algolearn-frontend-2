import React from 'react';
import { Typography } from 'antd';

const { Paragraph } = Typography;

const DiscussPreview = (props) => {
    const { courseData } = props;

    return (
        <div className='enroll-course-card'>
            <div className='enroll-course-card-content'>
                <div className='enroll-course-card-side' style={{ backgroundColor: courseData.course.color ?? '#102542' }}></div>
                <div className='enroll-course-card-body'>
                    <div>
                        <h1>{courseData.course.title}</h1>
                        <Paragraph ellipsis={{ rows: 3 }}>{courseData.course.description}</Paragraph>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DiscussPreview;