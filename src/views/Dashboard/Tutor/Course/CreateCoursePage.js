import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Layout, Input, Button, Form, PageHeader, Select, Row, Col } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { AuthContext } from '../../../../store/context/auth';
import { CourseContext } from '../../../../store/context/course';
import { TextInputRules } from '../../../../components/Dashboard/Course/CourseFormRules';

const { TextArea } = Input;
const { Option } = Select;

const CreateCoursePage = (props) => {
    const { auth, handleGetMe } = useContext(AuthContext);
    const { handleCreateCourse } = useContext(CourseContext);



    const onFinish = async (values) => {
        const res = await handleCreateCourse(values);
        await handleGetMe();
        props.history.push(`/catalogue/${res.data.slug}`);
    };

    if (!auth) return <Redirect to='/dashboard' />
    if (auth && auth.role === 'student') return <Redirect to='/dashboard' />

    return (
        <Layout>
            <PageHeader onBack={() => { props.history.goBack() }} title='Create a course' subTitle='The course will be published on creation' />
            <div style={{ margin: '', backgroundColor: 'white', padding: '10px 20px' }}>
                <Form name='create-course' initialValues={{ difficulty: 'Beginner' }} hideRequiredMark size='large' layout='vertical' onFinish={onFinish}>
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
                            Create course
                            </Button>
                    </Form.Item>
                </Form>
            </div>
        </Layout >
    );
}

export default CreateCoursePage;
