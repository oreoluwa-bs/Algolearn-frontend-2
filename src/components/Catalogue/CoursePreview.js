import React, { useEffect, useState } from 'react';
import { Rate, Typography, Avatar, Badge, Tag, Space } from 'antd';
import { utils } from '../../config';

const { Paragraph, Text } = Typography;

const CoursePreview = (props) => {
    const [tagColor, setTagColor] = useState('#2db7f5');
    const { course } = props;

    useEffect(() => {
        if (course.difficulty.toLowerCase() === 'intermediate') {
            setTagColor('#2db7f5');
        } else if (course.difficulty.toLowerCase() === 'advanced') {
            setTagColor('#108ee9');
        } else {
            setTagColor('#87d068')
        }
    }, [course.difficulty]);

    return (
        <Badge count={<Tag color={tagColor}>{course.difficulty}</Tag>} status='success' className='course-badge'>
            {/* offset={[-40, 20]}> */}

            <div className='course-card'>

                <div className='course-card-top' style={{ backgroundColor: course.color ?? '#102542' }}></div>
                <div className='course-card-body'>
                    <h2>{course.title}</h2>
                    <Paragraph ellipsis={{ rows: 3 }}>{course.description}</Paragraph>
                    <div>
                        <div>
                            <Space>
                                {
                                    !course.author.photo &&
                                    <Avatar size='small' style={{ color: 'white', backgroundColor: course.author.color ?? '#E0A458' }}>{course.author.firstname[0]}{course.author.lastname[0]}</Avatar>
                                }
                                {
                                    course.author.photo &&
                                    <Avatar size='small' shape='circle' src={`${utils.apiHOST}images/users/${course.author.photo}`} style={{ color: 'white', border: `1px solid ${course.author.color}` }} />
                                }
                                <Text type='secondary'>{course.author.firstname} {course.author.lastname}</Text>
                            </Space>
                        </div>
                    </div>
                    <Rate defaultValue={course.ratingsAverage} disabled />
                </div>
            </div>
        </Badge>

    );
}

export default CoursePreview;