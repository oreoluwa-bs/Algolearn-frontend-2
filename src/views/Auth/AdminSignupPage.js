import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { volcano } from '@ant-design/colors'
import AuthFormWrapper from '../../components/Auth/AuthFormWrapper';
import { PasswordRules, EmailRules, NameRules } from '../../components/Auth/AuthRules';
import { AuthContext } from '../../store/context/auth';

const SignupPage = (props) => {
    const { auth, handleSignUp } = useContext(AuthContext);

    const onFinish = values => {
        values.role = 'admin';
        handleSignUp(values);
    };

    if (!auth) return <Redirect to='/page-not-found' />
    if (auth?.role !== 'admin') return <Redirect to='/page-not-found' />

    return (
        <AuthFormWrapper bgColor={volcano[5]}>
            <div className='auth-form-container'>
                <p className='auth-form-title'>Create an account</p>
                <Form name='auth-login' initialValues={{ remember: true, }}
                    size='large'
                    layout='vertical'
                    onFinish={onFinish}>

                    <Row gutter={{ md: 24 }}>
                        <Col xs={24} md={12}>
                            <Form.Item label='First Name:' name='firstname'
                                rules={[...NameRules('First name')]}>
                                <Input placeholder='John' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item label='Last Name:' name='lastname'
                                rules={[...NameRules('Last name')]}>
                                <Input placeholder='Doe' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label='Email Address:' name='email'
                        rules={[...EmailRules]}>
                        <Input type='email'
                            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder='john.d@gmail.com' />
                    </Form.Item>

                    <Form.Item
                        label='Password:'
                        name='password'
                        rules={[...PasswordRules]}>
                        <Input.Password
                            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button size='large' block type='primary' htmlType='submit' className='login-form-button'>
                            Create an admin account
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </AuthFormWrapper>
    );
}

export default SignupPage;