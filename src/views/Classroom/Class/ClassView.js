import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Layout, Typography, Button } from 'antd';
import ReactMarkdown from 'react-markdown';
import { draftToMarkdown } from 'markdown-draft-js';
import { AddedFeatures } from '../../../components/Classroom';
import { utils } from '../../../config';

// const { Content } = Layout;
const { Title } = Typography;

const ClassView = (props) => {
    const [course, setCourse] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [lesson, setLesson] = useState({});


    useEffect(() => {
        if (props.parentData) {
            setCourse(props.parentData.course);
            setLessons(props.parentData.lessons);
            setLesson(props.parentData.lesson);
        }
    }, [props.parentData]);

    if (lessons && course) {
    }
    return (
        <div>
            <div>
                <div style={{}}>
                    <div style={{}}>
                        <Title level={4} style={{ float: 'left' }}>{lesson.title}</Title>
                        <AddedFeatures course={course?.course} lesson={lesson} />
                    </div>
                    <div className='class-text'>
                        {
                            lesson.video &&
                            <div>
                                <br />
                                <br />
                                <div>
                                    <video controls style={{ maxHeight: '600px', minHeight: '500px' }} controlsList='nodownload'
                                        src={`${utils.apiHOST}videos/courses/${lesson.video}`} />
                                </div>
                            </div>
                        }
                        <br />
                        <br />
                        {/* <div>{lesson.text} </div> */}
                        <div> <ReactMarkdown source={lesson.text ? draftToMarkdown(JSON.parse(lesson.text)) : null} /></div>
                    </div>

                </div>
            </div>
        </div >
    );
}

export default ClassView;
