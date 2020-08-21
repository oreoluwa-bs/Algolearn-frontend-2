import React from 'react';
import { Form, Input, Button, } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import AuthFormWrapper from '../../components/Auth/AuthFormWrapper';
import { EmailRules } from '../../components/Auth/AuthRules';

const ForgotPassword = (props) => {
    const onFinish = values => {
        console.log('Success:', values);
    };

    return (
        <AuthFormWrapper bgColor='#16E0BD'>
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