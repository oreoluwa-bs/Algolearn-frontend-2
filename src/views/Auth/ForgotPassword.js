import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button, } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import AuthFormWrapper from '../../components/Auth/AuthFormWrapper';
import { EmailRules } from '../../components/Auth/AuthRules';
import { AuthContext } from '../../store/context/auth';

const ForgotPassword = (props) => {
    const { auth, handleForgotPassword } = useContext(AuthContext);

    const onFinish = async (values) => {
        await handleForgotPassword(values);
        props.history.push('/login');
    };

    if (auth) return <Redirect to='/login' />
    return (
        <AuthFormWrapper bgColor='#9254de'>
            <div className='auth-form-container'>
                <p className='auth-form-title'>Forgot Password</p>
                <Form name='auth-login' initialValues={{ remember: true, }}
                    size='large'
                    layout='vertical'
                    onFinish={onFinish}>

                    <Form.Item label='Email Address:' name='email'
                        rules={[...EmailRules]}>
                        <Input type='email'
                            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder='john.d@gmail.com' />
                    </Form.Item>

                    <Form.Item>
                        <Button size='large' block type='primary' htmlType='submit' className='login-form-button'>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </AuthFormWrapper>
    );
}

export default ForgotPassword;