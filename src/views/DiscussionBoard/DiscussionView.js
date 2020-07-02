import React, { useState, useContext, useEffect, useRef } from 'react';
import { Avatar, List, Comment, Tooltip, Layout, Input, Form, Button, Affix, Row, Col } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import moment from 'moment';
import io from 'socket.io-client';
import { AuthContext } from '../../store/context/auth';
import { utils } from '../../config';
import { DiscussionContext } from '../../store/context/discuss';

const { Content } = Layout;
const { TextArea } = Input;

const ENDPOINT = 'localhost:5000';
let socket;

const DiscussionView = (props) => {
    const { auth } = useContext(AuthContext);
    const { handleGetCourseDiscussions } = useContext(DiscussionContext);

    const [room, setRoom] = useState('');

    const [message, setMessage] = useState(null);
    const [messages, setMessages] = useState([]);

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        const scrollHeight = messagesEndRef.current.scrollHeight;
        const height = messagesEndRef.current.clientHeight;
        const maxScrollTop = scrollHeight - height;
        messagesEndRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    useEffect(scrollToBottom, [messages]);
    useEffect(() => {
        const handleInit = async () => {
            setRoom(props.courseData?._id);
            const res = await handleGetCourseDiscussions(props.courseData?._id, '/?sort=createdAt');
            setMessages(res.doc);
        }
        if (props.courseData) {
            handleInit();
        }
    }, [handleGetCourseDiscussions, props.courseData]);

    useEffect(() => {
        if (auth && room) {

            socket = io(ENDPOINT);

            const userId = auth._id;
            socket.emit('join', { userId, room }, (error) => {
                if (error) {
                    alert(error);
                }
            });
        }
    }, [auth, room]);


    useEffect(() => {
        if (auth && room) {
            socket.on('message', (message) => {
                setMessages([...messages, message]);
            });

            socket.on('roomData', ({ users }) => {
                props.setUsers(users);
            })

            return () => {
                socket.emit('disconnect');

                socket.off();
            }
        }
    }, [auth, messages, props, room]);

    const handleSubmit = () => {
        if (!message || message.trim() === '') {
            return;
        }
        // setSubmitting(true);
        socket.emit('sendMessage', message, () => setMessage(null));
        // setTimeout(() => {
        //     setSubmitting(false);
        //     socket.emit('sendMessage', message, () => setMessage(null));
        // }, 1000);
    };

    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    return (
        <div style={{ padding: 24, margin: 0, backgroundColor: 'white' }}>
            <Content style={{ maxHeight: 'calc(100vh - 200px)' }}>
                <div className='discussion-list' style={{ height: 'calc(100vh - 250px)', overflowY: 'scroll', scrollBehavior: 'smooth' }} ref={messagesEndRef}>
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={messages}
                        renderItem={(item, index) => (
                            <List.Item key={`${item.title}-${index}`}>
                                <Comment
                                    author={`${item.user.firstname} ${item.user.lastname}`}
                                    avatar={
                                        !item.user.photo ?
                                            <Avatar shape='circle' style={{ color: 'white', backgroundColor: item.user.color }}>{item.user.firstname[0]}{item.user.lastname[0]}</Avatar>
                                            : <Avatar src={`${utils.apiHOST}images/users/${item.user.photo}`} alt={`${item.user.firstname}-${item.user.lastname}-${index}`} />
                                    }
                                    content={
                                        <p>
                                            {item.content}
                                        </p>
                                    }
                                    datetime={
                                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                            {/* <span>{moment(item.createdAt).fromNow()}</span> */}
                                            <span>{moment(item.createdAt).format('lll')}</span>
                                        </Tooltip>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </Content>
            <Affix offsetBottom={0}>
                <div style={{ backgroundColor: 'white', maxWidth: '100%' }}>
                    <Comment
                        avatar={
                            !auth.photo ?
                                <Avatar shape='circle' style={{ color: 'white', backgroundColor: auth.color }}>{auth.firstname[0]}{auth.lastname[0]}</Avatar>
                                : <Avatar src={`${utils.apiHOST}images/users/${auth.photo}`} alt={`${auth.firstname}-${auth.lastname}`} />
                        }
                        content={
                            <div>
                                <Row gutter={10} align='bottom'>
                                    <Col flex={1}>
                                        <Form.Item>
                                            <TextArea autoSize onChange={handleChange} value={message} onPressEnter={handleSubmit} />
                                        </Form.Item>
                                    </Col>
                                    <Col>
                                        <Form.Item>
                                            <Button htmlType='submit' icon={<SendOutlined />} onClick={handleSubmit} type="primary">Comment</Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div>
                        } />
                </div>
            </Affix>

        </div>
    )
}

export default DiscussionView;
