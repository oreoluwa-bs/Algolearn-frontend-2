import React, { useContext, useEffect, useState } from 'react';
import { Layout, Input, Button, Form, PageHeader, Upload } from 'antd';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { BookOutlined, InboxOutlined } from '@ant-design/icons';
import { TextInputRules } from '../../../../components/Dashboard/Course/CourseFormRules';
import { LessonContext } from '../../../../store/context/lesson';
import { RichTextEditor } from '../../../../components/Dashboard';
import { decorator } from '../../../../components/Dashboard/RichTextEditor/utils';
import { utils } from '../../../../config';

const { Dragger } = Upload;

const EditLessonPage = (props) => {
    const { handleEditLesson } = useContext(LessonContext);
    const [course, setCourse] = useState({});
    const [lesson, setLesson] = useState({});

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty(decorator));
    const [videoFileList, setVideoFileList] = useState([]);

    const onFinish = async (values) => {
        values.video = !values.video ? lesson.video : values.video;
        values.text = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        const res = await handleEditLesson({ courseId: course._id, lessonId: lesson._id }, values);
        if (res.status === 'success') {
            props.history.push(`/dashboard/manage/${course.slug}/content`);
        }
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
                        <Form.Item label={
                        <span>
                            Video: {lesson.video && <span><a href={`${utils.apiHOST}videos/courses/${lesson.video}`} rel='noopener noreferrer' target='_blank'>Current lesson video</a></span>}
                        </span>}
                            name='video' valuePropName='filelist' getValueFromEvent={getUploadData}>
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
                        <Form.Item name='text' label='Overview:'>
                            <>
                                <RichTextEditor editorState={editorState}
                                    customStyle={{ minHeight: 'calc(100vh - 500px)' }}
                                    EditorState={EditorState}
                                    setEditorState={setEditorState} placeholder='Write Something...' />
                            </>
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
