import React, { useEffect, useState } from 'react';
import { Rate, Typography, Avatar, Badge, Tag } from 'antd';

const { Paragraph, Text } = Typography;

const CoursePreview = (props) => {
    const [tagColor, setTagColor] = useState('#2db7f5');
    const rating = props.course.ratings.reduce((acc, currentOrder) => acc + currentOrder);

    useEffect(() => {
        if (props.course.difficulty.toLowerCase() === 'intermediate') {
            setTagColor('#2db7f5');
        } else if (props.course.difficulty.toLowerCase() === 'advanced') {
            setTagColor('#108ee9');
        } else {
            setTagColor('#87d068')
        }
    }, [props.course.difficulty]);

    return (
        <Badge count={<Tag color={tagColor}>{props.course.difficulty}</Tag>} status='success' className='course-badge'
        // offset={[-40, 20]}
        >

            <div className='course-card'>

                <div className='course-card-top' style={{ backgroundColor: '#102542' }}></div>
                <div className='course-card-body'>
                    <h1>{props.course.title}</h1>
                    <Paragraph ellipsis={{ rows: 3 }}>{props.course.description}</Paragraph>
                    <div>
                        <div>
                            <Avatar size='small' style={{ color: 'white', backgroundColor: '#E0A458', marginRight: 10 }}>{props.course.authorName.split(' ')[0][0]}{props.course.authorName.split(' ')[1][0]}</Avatar>
                            <Text type='secondary'>{props.course.authorName}</Text>
                        </div>
                    </div>
                    <Rate defaultValue={Math.round(rating / props.course.ratings.length)} disabled />
                </div>
            </div>
        </Badge>

    );
}

export default CoursePreview;