import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Layout, Input, Button, Form, PageHeader, Select, Row, Col, Divider, Modal, Avatar, Upload, Space } from 'antd';
import { UserOutlined, LockOutlined, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { AuthContext } from '../../store/context/auth';
import { PasswordRules, EmailRules, NameRules, ConfirmPasswordRules } from '../../components/Auth/AuthRules';
import { utils } from '../../config';

const { Option } = Select;
const { confirm } = Modal;

const EditProfilePage = (props) => {
    const { auth, handleUpdateMe, handleUpdatePassword, handleDeleteMe } = useContext(AuthContext);
    const [photoFileList, setPhotoFileList] = useState([]);
    const [previewPhoto, setPreviewPhoto] = useState(null);

    const onFinishChangePassword = async (values) => {
        await handleUpdatePassword(values);
    };

    const onFinishEditProfile = async (values) => {
        // console.log(values);
        await handleUpdateMe(values);
    };

    const showDeleteConfirm = () => {
        confirm({
            title: 'Are you sure delete your account?',
            icon: <ExclamationCircleOutlined />,
            // content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleDeleteMe();
            },
            onCancel() { },
        });
    }

    const getUploadData = (e) => {
        if (e?.fileList.length > 0) return e.fileList[0].originFileObj;
        return undefined;
    };
    const uploadPhoto = async ({ file, onSuccess, onError }) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            if (reader.result) {
                setPreviewPhoto(reader.result);
                onSuccess({ status: 'success' });
            }
        };

        reader.onerror = function () {
            onError();
        };
    }

    if (!auth) return <Redirect to='/dashboard' />
    return (
        <Layout>
            <PageHeader title={null} subTitle='Edit profile' />
            <div style={{ margin: '', backgroundColor: 'white', padding: '10px 20px' }}>
                <Form name='edit-profile' initialValues={{ ...auth }} hideRequiredMark size='large' layout='vertical' onFinish={onFinishEditProfile}>
                    <div>
                        <Space size='large'>
                            {
                                !auth.photo &&
                                <Avatar alt='user-profile-photo' size={70} shape='circle' style={{ color: 'white', backgroundColor: auth.color }}>{auth.firstname[0]}{auth.lastname[0]}</Avatar>
                            }
                            {
                                auth.photo &&
                                <Avatar alt='user-profile-photo' size={70} shape='circle' src={previewPhoto ?? `${utils.apiHOST}images/users/${auth.photo}`} style={{ color: 'white', border: `1px solid ${auth.color}` }} />
                            }
                            <Form.Item label='Profile Picture:' name='photo' valuePropName='filelist' getValueFromEvent={getUploadData}>
                                <Upload name='user-photo' accept='image/*' fileList={photoFileList} customRequest={uploadPhoto}
                                    onChange={(info) => {
                                        if (info.fileList.length > 1) {
                                            info.fileList.shift();
                                        }
                                        setPhotoFileList(info.fileList);
                                    }}>
                                    <Button size='middle' type='dashed'>
                                        <UploadOutlined /> Click to upload
                                </Button>
                                </Upload>
                            </Form.Item>
                        </Space>
                    </div>
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
                                <Select disabled={auth.role === 'admin'}>
                                    <Option value='student'>Student</Option>
                                    <Option value='tutor'>Tutor</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button style={{ float: 'right' }} type='primary' htmlType='submit'>
                            Save changes
                            </Button>
                    </Form.Item>
                </Form>
                <div><br /><Divider /></div>
            </div>

            <PageHeader title={null} subTitle='Change password' />
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
                                label='Confirm Password:' name='passwordConfirm'
                                rules={[...PasswordRules, ({ getFieldValue }) => ConfirmPasswordRules(getFieldValue),]}>
                                <Input.Password
                                    prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button style={{ float: 'right' }} type='primary' htmlType='submit'>
                            Change password
                                </Button>
                    </Form.Item>
                </Form>
                <div><br /><Divider /></div>
            </div>
            <PageHeader title={null} subTitle='Delete Account' />
            <div style={{ margin: '', backgroundColor: 'white', padding: '10px 20px' }}>
                <Button size='large' onClick={showDeleteConfirm}>
                    Delete my account
                </Button>
            </div>
        </Layout >
    );
}

export default EditProfilePage;
