import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import AuthFormWrapper from '../../components/Auth/AuthFormWrapper';
import { PasswordRules, EmailRules, NameRules } from '../../components/Auth/AuthRules';

const SignupPage = (props) => {
    const [signUpRole, setSignUpRole] = useState('learner');

    const onFinish = values => {
        values.role = signUpRole;
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        const values = queryString.parse(props.location.search);
        setSignUpRole(values.v);
    }, [props.location.search]);

    return (
        <AuthFormWrapper bgColor='#89A6FB'>
            <div className='auth-form-container'>
                <p className='auth-form-title'>Create an account</p>
                <Form name='auth-login' initialValues={{ remember: true, }}
                    size='large'
                    layout='vertical'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}>

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
                        <Link to='/login'>Already a member?</Link>
                    </Form.Item>
                    <Form.Item>
                        <Button size='large' block type='primary' htmlType='submit' className='login-form-button'>
                            Create my account
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </AuthFormWrapper>
    );
}

export { SignupPage };