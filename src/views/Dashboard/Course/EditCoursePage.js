import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Layout, Input, Button, Form, PageHeader, Select, Row, Col } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { AuthContext } from '../../../store/context/auth';
import { CourseContext } from '../../../store/context/course';
import { TextInputRules } from '../../../components/Dashboard/Course/CourseFormRules';

const { TextArea } = Input;
const { Option } = Select;

const EditCoursePage = (props) => {
    const { auth, handleGetMe } = useContext(AuthContext);
    const { handleGetCourse, handleEditCourse } = useContext(CourseContext);

    const [course, setCourse] = useState({});


    useEffect(() => {
        const handleInit = async (slug) => {
            const res = await handleGetCourse(slug);
            setCourse(res.data);
            if (res.status === 'error') {
                props.history.push('page-not-found');
            };
        }

        handleInit(props.match.params.slug);
    }, [props.match.params.slug, props.history, handleGetCourse]);

    const onFinish = async (values) => {
        const res = await handleEditCourse(course._id.toString(), values);
        await handleGetMe();
        if (res.status === 'success') {
            props.history.push(`/dashboard/manage/${res.data.data.slug}`);
        };
    };

    if (!auth) return <Redirect to='/dashboard' />
    if (auth && auth.role === 'student') return <Redirect to='/dashboard' />

    return (
        <Layout>
            <PageHeader onBack={() => { props.history.goBack() }} title='Edit course' />
            <div style={{ backgroundColor: 'white', padding: '10px 20px' }}>
                {
                    course && course.title &&
                    <Form name='edit-course' initialValues={{ title: course.title, difficulty: course.difficulty, description: course.description }} hideRequiredMark size='large' layout='vertical' onFinish={onFinish}>
                        <Row gutter={{ md: 24 }}>
                            <Col xs={24} md={16}>
                                <Form.Item label='Title:' name='title' rules={[...TextInputRules('Course title')]} hasFeedback>
                                    <Input prefix={<BookOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder='Algorithms 101' />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={8}>
                                <Form.Item label='Skill-level:' name='difficulty' hasFeedback rules={[{ required: true, message: 'Please select a course skill-level' }]}>
                                    <Select>
                                        <Option value='Beginner'>Beginner</Option>
                                        <Option value='Intermediate'>Intermediate</Option>
                                        <Option value='Advanced'>Advanced</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label='Description:' name='description' rules={[...TextInputRules('Course description')]}>
                            <TextArea autoSize={{ minRows: 21 }} />
                        </Form.Item>
                        <Form.Item>
                            <Button style={{ float: 'right' }} size='large' type='primary' htmlType='submit'>
                                Submit Changes
                        </Button>
                        </Form.Item>
                    </Form>}
            </div>
        </Layout >
    );
}

export default EditCoursePage;
