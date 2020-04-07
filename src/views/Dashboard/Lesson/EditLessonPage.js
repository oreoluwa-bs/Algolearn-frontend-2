import React, { useState, useContext } from 'react';
import { Layout, Input, Button, Form, Tooltip, Upload, message } from 'antd';
import { BookOutlined, QuestionCircleOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { TextInputRules } from '../../../components/Dashboard/Course/CourseFormRules';
import { LessonContext } from '../../../store/context/lesson';

const { TextArea } = Input;

const EditLessonPage = (props) => {
    const { handleEditLesson } = useContext(LessonContext);
    const [imageUrl, setImageUrl] = useState();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        values.video = !values.video ? props.lesson.video : values.video;
        const res = await handleEditLesson({ courseId: props.course._id, lessonId: props.lesson._id }, values);
        if (res.status === 'success') {
            await props.getCourse(props.course.slug);
            props.close();
        }
    };


    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                setImageUrl(imageUrl);
                setLoading(true);
            }
            );
        }
    };


    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    return (
        <Layout>
            <div style={{ margin: '', backgroundColor: 'white', padding: '10px 20px' }}>
                <Form name='edit-lesson' initialValues={{ title: props.lesson.title, text: props.lesson.text, }} hideRequiredMark size='large' layout='vertical' onFinish={onFinish}>
                    <Form.Item label='Title:' name='title' rules={[...TextInputRules('Course title')]} hasFeedback>
                        <Input prefix={<BookOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder='Algorithms 101' />
                    </Form.Item>
                    <Form.Item>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
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
