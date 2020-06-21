import React, { useState, useContext, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { Layout, Input, Button, Form, Tooltip, PageHeader, Upload } from 'antd';
import { BookOutlined, QuestionCircleOutlined, InboxOutlined } from '@ant-design/icons';
import { Editor, EditorState, convertToRaw } from 'draft-js';
import { TextInputRules } from '../../../../components/Dashboard/Course/CourseFormRules';
import { LessonContext } from '../../../../store/context/lesson';
import { AuthContext } from '../../../../store/context/auth';
import { CourseContext } from '../../../../store/context/course';
import { RichTextEditor } from '../../../../components/Dashboard';
import { decorator } from '../../../../components/Dashboard/RichTextEditor/utils';

const { Dragger } = Upload;

const CreateLessonPage = (props) => {
    const { handleCreateLesson } = useContext(LessonContext);
    const { handleGetCourse } = useContext(CourseContext);
    const { auth } = useContext(AuthContext);

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty(decorator));
    const [videoFileList, setVideoFileList] = useState([]);

    const editorRef = useRef(Editor);

    const [forml] = Form.useForm();
    const [course, setCourse] = useState({});

    useEffect(() => {
        if (props?.location?.state) {
            setCourse(props.location.state.course);
        } else {
            const alt = async () => {
                const res = await handleGetCourse(props.match.params.slug);
                setCourse(res.data);
                if (res?.status === 'error') {
                    props.history.push(`/dashboard/manage/${props.match.params.slug}`)
                }
            }
            alt();
        }
    }, [handleGetCourse, props]);


    const onFinish = async (values) => {
        values.text = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        // values.text = draftToMarkdown(convertToRaw(editorState.getCurrentContent()));
        const res = await handleCreateLesson(course._id, values);
        if (res.status === 'success') {
            forml.resetFields();
            props.history.push(`/dashboard/manage/${course.slug}/content/`);
        }
        console.log(values);
    };

    const getUploadData = (e) => {
        if (e?.fileList.length > 0) return e.fileList[0].originFileObj;
        return undefined;
    };
    const uploadVideo = async ({ file, onSuccess, onError }) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            if (reader.result) {
                onSuccess({ status: 'success' });
            }
        };

        reader.onerror = function () {
            onError();
        };
    }

    if (!auth) return <Redirect to='/dashboard' />
    if (auth?.role === 'student') return <Redirect to='/dashboard' />

    return (
        <Layout>
            <PageHeader onBack={() => { props.history.push(`/dashboard/manage/${props.match.params.slug}/content/`) }} title='Create a lesson' />
            <div style={{ margin: '', backgroundColor: 'white', padding: '10px 20px' }}>
                <Form form={forml} name='create-lesson' initialValues={{}} hideRequiredMark size='large' layout='vertical' onFinish={onFinish}>
                    <Form.Item label='Title:' name='title' rules={[...TextInputRules('Course title')]} hasFeedback>
                        <Input prefix={<BookOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder='Algorithms 101' />
                    </Form.Item>
                    <Form.Item label='Video:' name='video' valuePropName='filelist' getValueFromEvent={getUploadData}>
                        <Dragger

                            listType='picture'
                            name='lesson-video' accept='video/mp4,video/x-m4v,video/*' fileList={videoFileList} customRequest={uploadVideo}
                            onChange={(info) => {
                                if (info.fileList.length > 1) {
                                    info.fileList.shift();
                                }
                                setVideoFileList(info.fileList);
                            }}>
                            <p className='ant-upload-drag-icon'>
                                <InboxOutlined />
                            </p>
                            <p className='ant-upload-text'>Click or drag file to this area to upload</p>
                            <p className='ant-upload-hint'>Support for a single upload.</p>
                        </Dragger>
                    </Form.Item>
                    <Form.Item name='text' label={
                        <span>Overview:&nbsp;
                        {/* <Tooltip title={
                                <span>For more customization write in markdown.
                                Check <a href='https://guides.github.com/features/mastering-markdown/'>Markdown Guide</a> for more information
                                </span>
                            }>
                                <QuestionCircleOutlined />
                            </Tooltip> */}
                        </span>
                    }>
                        <RichTextEditor editorState={editorState} editorRef={editorRef}
                            customStyle={{ minHeight: 'calc(100vh - 700px)' }}
                            EditorState={EditorState}
                            setEditorState={setEditorState} placeholder='Write Something...' />
                    </Form.Item>
                    <Form.Item>
                        <Button style={{ float: 'right' }} size='large' type='primary' htmlType='submit'>
                            Create lesson
                            </Button>
                    </Form.Item>
                </Form>
            </div>
        </Layout >
    );
}

export default CreateLessonPage;
