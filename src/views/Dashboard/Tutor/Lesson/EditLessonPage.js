import React, { useContext, useEffect, useState, useRef } from 'react';
import { Layout, Input, Button, Form, Tooltip, PageHeader } from 'antd';
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { BookOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { TextInputRules } from '../../../../components/Dashboard/Course/CourseFormRules';
import { LessonContext } from '../../../../store/context/lesson';
import { RichTextEditor } from '../../../../components/Dashboard';
import { decorator } from '../../../../components/Dashboard/RichTextEditor/utils';

const EditLessonPage = (props) => {
    const { handleEditLesson } = useContext(LessonContext);
    const [course, setCourse] = useState({});
    const [lesson, setLesson] = useState({});

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty(decorator));

    const editorRef = useRef(Editor);

    const onFinish = async (values) => {
        values.video = !values.video ? lesson.video : values.video;
        values.text = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        const res = await handleEditLesson({ courseId: course._id, lessonId: lesson._id }, values);
        if (res.status === 'success') {
            props.history.push(`/dashboard/manage/${course.slug}/content`);
        }
    };

    useEffect(() => {
        if (props?.location?.state) {
            setCourse(props.location.state.course);
            setLesson(props.location.state.lesson);
        } else {
            props.history.push(`/dashboard/manage/${props.match.params.slug}/content`)
        }
    }, [props]);

    useEffect(() => {
        if (lesson?._id) {
            setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(lesson.text)), decorator));
        }
    }, [lesson]);
    return (
        <Layout>
            <PageHeader onBack={() => { props.history.push(`/dashboard/manage/${props.match.params.slug}/content/`) }} title='Edit lesson' />
            <div style={{ margin: '', backgroundColor: 'white', padding: '10px 20px' }}>
                {
                    lesson?.title &&
                    <Form name='edit-lesson' initialValues={{ title: lesson.title, text: lesson.text, }} hideRequiredMark size='large' layout='vertical' onFinish={onFinish}>
                        <Form.Item label='Title:' name='title' rules={[...TextInputRules('Course title')]} hasFeedback>
                            <Input prefix={<BookOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder='Algorithms 101' />
                        </Form.Item>
                        <Form.Item name='text' label={
                            <span>Text:&nbsp;
                            <Tooltip title={
                                    <span>For more customization write in markdown. Check <a href='https://guides.github.com/features/mastering-markdown/'>Markdown Guide</a> for more information. Note some features do not work.</span>
                                }>
                                    <QuestionCircleOutlined />
                                </Tooltip>
                            </span>
                        }>
                            <RichTextEditor editorState={editorState} editorRef={editorRef}
                                customStyle={{ minHeight: 'calc(100vh - 500px)' }}
                                EditorState={EditorState}
                                setEditorState={setEditorState} placeholder='Write Something...' />
                        </Form.Item>
                        <Form.Item>
                            <Button style={{ float: 'right' }} size='large' type='primary' htmlType='submit'>
                                Submit changes
                            </Button>
                        </Form.Item>
                    </Form>}
            </div>
        </Layout >
    );
}

export default EditLessonPage;