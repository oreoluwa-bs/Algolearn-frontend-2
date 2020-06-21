import React from 'react';
import { CheckOutlined, Loading3QuartersOutlined } from '@ant-design/icons';

const LessonPreview = (props) => {
    const { lessonData } = props;
    const isCompleted = lessonData.course.completed !== true ? lessonData.course.completed.findIndex((item) => item._id === lessonData.lesson._id) === -1 : false;

    return (
        <div className='lesson-card-container'>
            <div className='completed-badge-container'>
                {
                    !isCompleted &&
                    <span className='completed-badge'><CheckOutlined style={{ color: 'white' }} /></span>
                }
                {
                    isCompleted &&
                    <span className='completed-badge'><Loading3QuartersOutlined style={{ color: 'white' }} /></span>
                }
            </div>
            <div className='lesson-card' style={{ borderColor: lessonData.course.course.color ?? '#102542' }}>
                {/* <div><Text type='secondary'>{review.user && review.user.firstname} {review.user && review.user.lastname}</Text></div> */}
                <div className='lesson-card-body' style={{ opacity: !isCompleted ? 0.5 : 1 }}>
                    <div>
                        <h1>{lessonData.lesson.title}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LessonPreview;
