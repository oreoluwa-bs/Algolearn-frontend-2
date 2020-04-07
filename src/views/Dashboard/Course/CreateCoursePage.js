import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Layout, Input, Button, Form, PageHeader, Select } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { AuthContext } from '../../../store/context/auth';
import { CourseContext } from '../../../store/context/course';

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

    return (
        <Layout>
            <PageHeader onBack={() => { props.history.goBack() }} title='Create a course' subTitle='The course will not be published on creation' />
            <div style={{ margin: '', backgroundColor: 'white', padding: '10px 20px' }}>
                <Form name='create-course' initialValues={{ difficulty: 'Beginner' }} hideRequiredMark size='large' layout='vertical' onFinish={onFinish}>
                    <Form.Item label='Title:' name='title' rules={[{ required: true, message: 'Please input the course title' }]} hasFeedback>
                        <Input prefix={<BookOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder='Algorithms 101' />
                    </Form.Item>
                    <Form.Item label='Skill-level:' name='difficulty' hasFeedback rules={[{ required: true, message: 'Please select a course skill-level' }]}>
                        <Select>
                            <Option value='Beginner'>Beginner</Option>
                            <Option value='Intermediate'>Intermediate</Option>
                            <Option value='Advanced'>Advanced</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label='Description:' name='description' rules={[{ required: true, message: 'Please input the course description' }]}>
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
