import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Layout, Input, Button, Form, PageHeader, Select, Row, Col, Divider } from 'antd';
import { BookOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { AuthContext } from '../../store/context/auth';
import { CourseContext } from '../../store/context/course';
import { PasswordRules, EmailRules, NameRules, ConfirmPasswordRules } from '../../components/Auth/AuthRules';
const { Option } = Select;

const EditProfilePage = (props) => {
    const { auth, handleGetMe } = useContext(AuthContext);
    const { handle } = useContext(CourseContext);

    // useEffect(() => {
    //     const init = async () => {
    //         await handleGetMe();
    //     }
    //     init();
    // }, [handleGetMe]);

    const onFinishChangePassword = async (values) => {
        // const res = await handleCreateCourse(values);
    };

    const onFinishEditProfile = async (values) => {
        // const res = await handleCreateCourse(values);
        // await handleGetMe();
    };

    if (!auth) return <Redirect to='/dashboard' />
    return (
        <Layout>
            <PageHeader title={null} subTitle='Edit your profile' />
            <div style={{ margin: '', backgroundColor: 'white', padding: '10px 20px' }}>
                <Form name='edit-profile' initialValues={{ ...auth }} hideRequiredMark size='large' layout='vertical' onFinish={onFinishEditProfile}>
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
                            {/* <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                            >
                                {fileList.length >= 8 ? null : uploadButton}
                            </Upload> */}
                        </Col>
                    </Row>
                    <Row gutter={{ md: 24 }}>
                        <Col xs={24} md={16}>
                            <Form.Item label='Email Address:' name='email'
                                rules={[...EmailRules]}>
                                <Input type='email'
                                    prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder='john.d@gmail.com' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item label='Account Type:' name='role' hasFeedback rules={[{ required: true, message: 'Please select a course skill-level' }]}>
                                <Select>
                                    <Option value='student'>Student</Option>
                                    <Option value='tutor'>Tutor</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button style={{ float: 'right' }} size='large' type='primary' htmlType='submit'>
                            Update profile
                            </Button>
                    </Form.Item>
                </Form>
                <div><br /><Divider /></div>
            </div>

            <PageHeader title={null} subTitle='Change your password' />
            <div style={{ margin: '', backgroundColor: 'white', padding: '10px 20px' }}>
                <Form name='change-password' hideRequiredMark size='large' layout='vertical' onFinish={onFinishChangePassword}>
                    <Row gutter={{ md: 24 }}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label='Password:'
                                name='password'
                                rules={[...PasswordRules]}>
                                <Input.Password
                                    prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label='Confirm Password:' name='confirmpassword'
                                rules={[...PasswordRules, ({ getFieldValue }) => ConfirmPasswordRules(getFieldValue),]}>
                                <Input.Password
                                    prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button style={{ float: 'right' }} size='large' type='primary' htmlType='submit'>
                            Change password
                                </Button>
                    </Form.Item>
                </Form>
            </div>
        </Layout >
    );
}

export default EditProfilePage;
