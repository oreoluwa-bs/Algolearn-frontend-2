import React, { useContext } from 'react';
import { Layout, Input, Button, Form, Tooltip, PageHeader } from 'antd';
import { BookOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { TextInputRules } from '../../../components/Dashboard/Course/CourseFormRules';
import { LessonContext } from '../../../store/context/lesson';

const { TextArea } = Input;

const EditLessonPage = (props) => {
    const { handleEditLesson } = useContext(LessonContext);
    const { lesson, course } = props.location.state;

    const onFinish = async (values) => {
        values.video = !values.video ? lesson.video : values.video;
        const res = await handleEditLesson({ courseId: course._id, lessonId: lesson._id }, values);
        if (res.status === 'success') {
            props.history.push(`/dashboard/manage/${course.slug}`);
        }
    };


    return (
        <Layout>
            <PageHeader onBack={() => { props.history.goBack() }} title='Edit lesson' />
            <div style={{ margin: '', backgroundColor: 'white', padding: '10px 20px' }}>
                <Form name='edit-lesson' initialValues={{ title: lesson?.title, text: lesson?.text, }} hideRequiredMark size='large' layout='vertical' onFinish={onFinish}>
                    <Form.Item label='Title:' name='title' rules={[...TextInputRules('Course title')]} hasFeedback>
                        <Input prefix={<BookOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder='Algorithms 101' />
                    </Form.Item>
                    <Form.Item name='text' label={
                        <span>Text:&nbsp;
                        <Tooltip title={
                                <span>For more customization write in markdown.
                                Check <a href='https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet'>Markdown Guide</a> for more information
                                </span>
                            }>
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </span>
                    }>
                        <TextArea autoSize={{ minRows: 15 }} />
                    </Form.Item>
                    <Form.Item>
                        <Button style={{ float: 'right' }} size='large' type='primary' htmlType='submit'>
                            Submit changes
                            </Button>
                    </Form.Item>
                </Form>
            </div>
        </Layout >
    );
}

export default EditLessonPage;
