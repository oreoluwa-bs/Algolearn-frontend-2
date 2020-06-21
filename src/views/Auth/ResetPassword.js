import React from 'react';
// import { Link } from 'react-router-dom';
import { Form, Input, Button, } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import AuthFormWrapper from '../../components/Auth/AuthFormWrapper';
import { PasswordRules } from '../../components/Auth/AuthRules';

const ResetPassword = (props) => {
    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <AuthFormWrapper bgColor='#89A6FB'>
            <div className='auth-form-container'>
                <p className='auth-form-title'>Reset Password</p>
                <Form name='auth-login' initialValues={{ remember: true, }}
                    size='large'
                    layout='vertical'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}>

                    <Form.Item
                        label='Password:'
                        name='password'
                        rules={[...PasswordRules]}>
                        <Input.Password
                            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        />
                    </Form.Item>
                    {/* <Form.Item>
                        <Link to='/login'>Already a member?</Link>
                    </Form.Item> */}
                    <Form.Item>
                        <Button size='large' block type='primary' htmlType='submit' className='login-form-button'>
                            Reset my password
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </AuthFormWrapper>
    );
}

export default ResetPassword;