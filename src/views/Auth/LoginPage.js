import React from 'react';
import { Layout, Form, Input, Button, Row, Col, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const LoginPage = () => {
    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Layout>
            <div style={{ marginTop: '100px', minHeight: 'calc(100vh - 233px)' }}>
                <div className='auth-form-wrapper'>
                    <Row>
                        <Col xs={{ span: 24, order: 2 }} xl={{ span: 10, order: 1 }}>
                            <div className='auth-form-img' style={{ backgroundColor: '#16E0BD' }}>

                            </div>
                        </Col>
                        <Col xs={{ span: 24, order: 1 }} xl={{ span: 14, order: 2 }}>
                            <div className='auth-form-container'>
                                <Title className='large-text bold' style={{ textAlign: 'center' }}>Login</Title>
                                <Form name='auth-login' initialValues={{ remember: true, }} hideRequiredMark
                                    size='large'
                                    layout='vertical'
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}>
                                    <Form.Item label='Email Address:' name='email'
                                        rules={[{
                                            required: true,
                                            message: 'Please input your email address!',
                                        },
                                        ]}>
                                        <Input type='email'
                                            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder='john.d@gmail.com' />
                                    </Form.Item>

                                    <Form.Item
                                        label='Password:'
                                        name='password'
                                        rules={[{
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                        ]}>
                                        <Input.Password
                                            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <div style={{ float: 'left' }}>
                                            <Link to='/forgot-password'>Forgot password?</Link>
                                        </div>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button size='large' type='primary' block htmlType='submit' className='login-form-button'>
                                            Log in
                                        </Button>
                                    </Form.Item>
                                    <Form.Item style={{ textAlign: 'center' }}>
                                        <Text type='secondary'>OR</Text>
                                        <br />
                                        <Text>Not a member? <Link to='/signup/student'>Become a learner</Link> or <Link to='/signup/tutor'>Become a tutor</Link></Text>
                                    </Form.Item>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </Layout>
    );
}

export { LoginPage };
