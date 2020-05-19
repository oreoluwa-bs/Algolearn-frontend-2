import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Layout, Typography, Button } from 'antd';

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
                    <Title level={4} style={{ float: 'left' }}>{lesson.title}</Title>
                    {/* <Link to={`/discuss/?userId=${auth._id}&room=${course._id}`}>
                        <Button type='primary' icon='message' style={{ float: 'right', marginLeft: 10 }} onClick={() => null} disabled={auth.role === 'admin'} />
                    </Link> */}
                    {/* <Button icon='flag' style={{ float: 'right' }} onClick={() => setFlagModal(true)} disabled={auth.role === 'admin'} /> */}

                    {/* <Modal
                        title='Report'
                        visible={modalFlagVisible}
                        onOk={() => setFlagModal(false)}
                        onCancel={() => setFlagModal(false)}
                        footer={null}
                        className='flag-modal'

                    >
                        <List
                            size="large"
                            bordered
                            dataSource={['Using someone elses content', 'It\'s inappropriate', 'Inaccurate Content', 'Spam', 'Offensive', 'Fails to teach its aim']}
                            renderItem={item => <List.Item className='flag-modal-list-item' onClick={() => { handleFlag(item) }}>{item}</List.Item>}
                        />
                    </Modal> */}
                    <div className='class-texct'>
                        <br />
                        <br />
                        <div>{lesson.text} </div>
                    </div>

                </div>
            </div>
        </div >
    );
}

export default ClassView;
