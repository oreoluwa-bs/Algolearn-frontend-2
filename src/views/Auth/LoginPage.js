import React, { useContext } from 'react';
import { Form, Input, Button, Typography, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';
import AuthFormWrapper from '../../components/Auth/AuthFormWrapper';
import { EmailRules, PasswordRules } from '../../components/Auth/AuthRules';
import { AuthContext } from '../../store/context/auth';

const { Text } = Typography;

const LoginPage = () => {
    const { auth, handleLogin } = useContext(AuthContext);
    
    const onFinish = async (values) => {
        await handleLogin(values);
    };

    if (auth) {
        return <Redirect to='/dashboard' />
    }
    return (
        <AuthFormWrapper bgColor='#16E0BD'>

            <div className='auth-form-container'>
                <p className='auth-form-title' style={{ textAlign: 'center' }}>Login</p>
                <Form name='auth-login' initialValues={{ remember: true, }} hideRequiredMark
                    size='large'
                    layout='vertical'
                    onFinish={onFinish}>
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
                        <Divider>OR</Divider>
                        <Text>Not a member? <Link to='/signup?v=student'>Become a learner</Link> or <Link to='/signup?v=tutor'>Become a tutor</Link></Text>
                    </Form.Item>
                </Form>
            </div>
        </AuthFormWrapper>
    );
}

export default LoginPage;
