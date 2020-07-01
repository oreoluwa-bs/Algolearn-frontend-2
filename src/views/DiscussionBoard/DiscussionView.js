import React, { useState, useContext, useEffect, useRef } from 'react';
import { Avatar, List, Comment, Tooltip, Layout, Input, Form, Button, Affix } from 'antd';
import moment from 'moment';
import { AuthContext } from '../../store/context/auth';
import { utils } from '../../config';

const { Content } = Layout;
const { TextArea } = Input;

const DiscussionView = () => {
    const { auth } = useContext(AuthContext);
    const [message, setMessage] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [messages, setMessages] = useState([
        {
            user: auth._id,
            firstname: 'John',
            lastname: 'Doe',
            // photo: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            color: 'seagreen',
            content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            createdAt: '2020-05-10T06:30:00.346+00:00'
        },
        {
            user: auth._id,
            firstname: 'Jane',
            lastname: 'Doe',
            // photo: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            color: 'orange',
            content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            createdAt: '2020-06-10T06:30:00.346+00:00'
        },
        {
            user: auth._id,
            firstname: 'Jane',
            lastname: 'Doe',
            // photo: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            color: 'orange',
            content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            createdAt: '2020-06-10T06:30:00.346+00:00'
        },
        {
            user: auth._id,
            firstname: 'Jane',
            lastname: 'Doe',
            // photo: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            color: 'orange',
            content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            createdAt: '2020-06-10T06:30:00.346+00:00'
        },
        {
            user: auth._id,
            firstname: 'Jane',
            lastname: 'Doe',
            // photo: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            color: 'orange',
            content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            createdAt: '2020-06-10T06:30:00.346+00:00'
        },
        {
            user: auth._id,
            firstname: 'Jane',
            lastname: 'Doe',
            // photo: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            color: 'orange',
            content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            createdAt: '2020-06-10T06:30:00.346+00:00'
        },
        {
            user: auth._id,
            firstname: 'Jane',
            lastname: 'Doe',
            // photo: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            color: 'orange',
            content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            createdAt: '2020-06-10T06:30:00.346+00:00'
        },
        {
            user: auth._id,
            firstname: 'Jane',
            lastname: 'Doe',
            // photo: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            color: 'orange',
            content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            createdAt: '2020-06-10T06:30:00.346+00:00'
        },
        {
            user: auth._id,
            firstname: 'Jane',
            lastname: 'Doe',
            // photo: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            color: 'orange',
            content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            createdAt: '2020-06-10T06:30:00.346+00:00'
        },
        {
            user: auth._id,
            firstname: 'Jane',
            lastname: 'Doe',
            // photo: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            color: 'orange',
            content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            createdAt: '2020-06-10T06:30:00.346+00:00'
        },
        {
            user: auth._id,
            firstname: 'Jane',
            lastname: 'Doe',
            // photo: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            color: 'orange',
            content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            createdAt: '2020-06-10T06:30:00.346+00:00'
        },

        {
            user: auth._id,
            firstname: 'Jane',
            lastname: 'Doe',
            // photo: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            color: 'orange',
            content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            createdAt: '2020-06-10T06:30:00.346+00:00'
        },
        {
            user: auth._id,
            firstname: 'Jane',
            lastname: 'Doe',
            // photo: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            color: 'orange',
            content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            createdAt: '2020-06-10T06:30:00.346+00:00'
        },
    ]);

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        const scrollHeight = messagesEndRef.current.scrollHeight;
        const height = messagesEndRef.current.clientHeight;
        const maxScrollTop = scrollHeight - height;
        messagesEndRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    useEffect(scrollToBottom, [messages]);

    const handleSubmit = () => {
        if (!message) {
            return;
        }

        setSubmitting(true)

        setTimeout(() => {
            setSubmitting(false);
            setMessage(null);
            setMessages([
                ...messages,
                {
                    user: auth._id,
                    firstname: auth.firstname,
                    lastname: auth.lastname,
                    photo: auth.photo,
                    color: auth.color,
                    content: message,
                    createdAt: Date.now()
                },
            ]);
        }, 1000);
    };

    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    return (
        <div style={{ padding: 24, margin: 0, backgroundColor: 'white' }}>
            <Content style={{ maxHeight: 'calc(100vh - 200px)' }}>
                <div className='discussion-list' style={{ height: 'calc(100vh - 200px)', overflowY: 'scroll', scrollBehavior: 'smooth' }} ref={messagesEndRef}>
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={messages}
                        renderItem={(item, index) => (
                            <List.Item key={`${item.title}-${index}`}>
                                <Comment
                                    author={`${item.firstname} ${item.lastname}`}
                                    avatar={
                                        !item.photo ?
                                            <Avatar shape='circle' style={{ color: 'white', backgroundColor: item.color }}>{item.firstname[0]}{item.lastname[0]}</Avatar>
                                            : <Avatar src={`${utils.apiHOST}images/users/${item.photo}`} alt={`${item.firstname}-${item.lastname}-${index}`} />
                                    }
                                    content={
                                        <p>
                                            {item.content}
                                        </p>
                                    }
                                    datetime={
                                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                            <span>{moment(item.createdAt).fromNow()}</span>
                                        </Tooltip>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </Content>
            <Affix offsetBottom={0}>
                <div style={{backgroundColor:'white'}}>
                    <Comment
                        avatar={
                            !auth.photo ?
                                <Avatar shape='circle' style={{ color: 'white', backgroundColor: auth.color }}>{auth.firstname[0]}{auth.lastname[0]}</Avatar>
                                : <Avatar src={`${utils.apiHOST}images/users/${auth.photo}`} alt={`${auth.firstname}-${auth.lastname}`} />
                        }
                        content={
                            <>
                                <Form.Item>
                                    <TextArea rows={4} onChange={handleChange} value={message} />
                                </Form.Item>
                                <Form.Item>
                                    <Button htmlType="submit" loading={submitting} onClick={handleSubmit} type="primary">
                                        Add Comment
                            </Button>
                                </Form.Item>
                            </>
                        } />
                </div>
            </Affix>

        </div>
    )
}

export default DiscussionView;
