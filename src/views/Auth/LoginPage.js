import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import AuthFormWrapper from '../../components/Auth/AuthFormWrapper';
import { EmailRules, PasswordRules } from '../../components/Auth/AuthRules';

const { Text } = Typography;

const LoginPage = () => {
    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        // console.log('Failed:', errorInfo);
    };
    return (
        <AuthFormWrapper bgColor='#16E0BD'>

            <div className='auth-form-container'>
                <p className='auth-form-title' style={{ textAlign: 'center' }}>Login</p>
                <Form name='auth-login' initialValues={{ remember: true, }} hideRequiredMark
                    size='large'
                    layout='vertical'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}>
                    <Form.Item label='Email Address:' name='email'
                        rules={[...EmailRules]}>
                        <Input type='email'
                            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder='john.d@gmail.com' />
                    </Form.Item>

                    <Form.Item
                        label='Password:'
                        name='password'
                        rules={[PasswordRules[0], PasswordRules[2]]}>
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
                        <Text>Not a member? <Link to='/signup?v="learner"'>Become a learner</Link> or <Link to='/signup?v="tutor"'>Become a tutor</Link></Text>
                    </Form.Item>
                </Form>
            </div>
        </AuthFormWrapper>
    );
}

export { LoginPage };
