import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button, } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import AuthFormWrapper from '../../components/Auth/AuthFormWrapper';
import { PasswordRules } from '../../components/Auth/AuthRules';
import { AuthContext } from '../../store/context/auth';

const ResetPassword = (props) => {
    const { auth, handleResetPassword } = useContext(AuthContext);

    const onFinish = async (values) => {
        values.token = props.match.params.token;
        await handleResetPassword(values);
        props.history.push('/login');
    };

    if (auth) return <Redirect to='/login' />
    return (
        <AuthFormWrapper bgColor='#89A6FB'>
            <div className='auth-form-container'>
                <p className='auth-form-title'>Reset Password</p>
                <Form name='auth-login' initialValues={{ remember: true, }}
                    size='large'
                    layout='vertical'
                    onFinish={onFinish}>

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