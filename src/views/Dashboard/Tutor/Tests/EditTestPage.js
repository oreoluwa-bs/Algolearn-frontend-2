import React, { useState, useEffect, useContext } from 'react';
import { Layout, Input, Button, Form, Tooltip, Table, Popconfirm, Modal, message } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { AddOptionPage } from '../../../../components/Dashboard';
import { TextInputRules } from '../../../../components/Dashboard/Course/CourseFormRules';
import { QuestionsContext } from '../../../../store/context/questions';

const { TextArea } = Input;

const EditTestPage = (props) => {
    const { handleEditTestQuestion } = useContext(QuestionsContext);
    const [questionOptions, setQuestionOptions] = useState([]);
    const [correctOption, setCorrectOption] = useState({});
    const [initialValues, setInitialValues] = useState(null);
    const [optionModalVisible, setOptionModal] = useState(false);
    const [forml] = Form.useForm();


    const onFinish = async (values) => {
        if (correctOption) {
            values.correctOption = correctOption;
            values.options = questionOptions;
            await handleEditTestQuestion({ courseId: props.course._id, questionId: props.test._id }, values);
            await props.getTests(props.course._id);
            forml.resetFields();
            props.close();
            setCorrectOption();
            setQuestionOptions([]);
        } else {
            message.error('Please select a correct option');
        }
    };

    useEffect(() => {
        if (props.test) {
            setInitialValues(props.test);
            setQuestionOptions(props.test.options);
            setCorrectOption(props.test.correctOption);
        }
    }, [props.test]);
    useEffect(() => {
        forml.resetFields();
    })
    return (
        <Layout>
            <div style={{ margin: '', backgroundColor: 'white', padding: '10px 20px' }}>
                {initialValues && initialValues._id &&
                    <Form form={forml} name='create-test' initialValues={{ ...initialValues }} hideRequiredMark layout='vertical' onFinish={onFinish}>
                        <Form.Item name='question' rules={[...TextInputRules('Test question')]} label={
                            <span>Question:&nbsp;
                        <Tooltip title={
                                    <span>For more customization write in markdown.
                                Check <a href='https://guides.github.com/features/mastering-markdown/'>Markdown Guide</a> for more information.
                                </span>
                                }>
                                    <QuestionCircleOutlined />
                                </Tooltip>
                            </span>
                        }>
                            <TextArea autoSize={{ minRows: 3 }} />
                        </Form.Item>
                        <Form.Item>
                            <Button style={{ float: 'right' }} onClick={() => { setOptionModal(true) }}>
                                Add option
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Table tableLayout='fixed' dataSource={questionOptions} pagination={false}
                                rowKey='key'
                                rowSelection={{
                                    selectedRowKeys: [props?.test?.correctOption.key],
                                    columnTitle: 'Correct Option',
                                    type: 'radio',
                                    columnWidth: 100,
                                    onChange: (selectedRowKeys, selectedRows) => {
                                        setCorrectOption(selectedRows[0]);
                                    },
                                }}
                                columns={[
                                    {
                                        title: 'Options',
                                        dataIndex: 'text',
                                        key: 'option',
                                    },
                                    {
                                        title: 'Action',
                                        key: 'action',
                                        render: (option) => (
                                            <span>
                                                <Popconfirm
                                                    title='Are you sure delete this option?'
                                                    onConfirm={() => {
                                                        correctOption?.key === option.key ? setCorrectOption() : setCorrectOption(correctOption);
                                                        setQuestionOptions(questionOptions.filter((val) => val.key !== option.key));
                                                    }}
                                                    onCancel={null}
                                                    okText='Yes'
                                                    cancelText='No'
                                                >
                                                    <Button type='dashed'>Delete</Button>
                                                </Popconfirm>
                                            </span>
                                        ),
                                    },
                                ]} />

                        </Form.Item>
                        <Form.Item>
                            <Button style={{ float: 'right' }} size='large' type='primary' htmlType='submit'>
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                }

                <Modal title='Add Option' visible={optionModalVisible} footer={null} onOk={() => { setOptionModal(false) }} onCancel={() => { setOptionModal(false) }}>
                    <AddOptionPage setQuestionOptions={setQuestionOptions} questionOptions={questionOptions} />
                </Modal>
            </div>
        </Layout >
    );
}

export default EditTestPage;
