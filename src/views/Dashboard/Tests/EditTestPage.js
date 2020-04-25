import React, { useState } from 'react';
import { Layout, Input, Button, Form, Tooltip, Table, Popconfirm, Modal, message } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { AddOptionPage } from '../../../components/Dashboard';
import { TextInputRules } from '../../../components/Dashboard/Course/CourseFormRules';

const { TextArea } = Input;

const EditTestPage = (props) => {
    const [questionOptions, setQuestionOptions] = useState([]);
    const [correctOption, setCorrectOption] = useState();
    const [optionModalVisible, setOptionModal] = useState(false);
    const [forml] = Form.useForm();


    const onFinish = async (values) => {
        if (correctOption) {
            values.correctOption = correctOption;
            values.options = questionOptions;
            console.log(values);
        } else {
            message.error('Please select a correct option');
        }
    };


    return (
        <Layout>
            <div style={{ margin: '', backgroundColor: 'white', padding: '10px 20px' }}>
                <Form form={forml} name='create-test' initialValues={{ ...props.test }} hideRequiredMark layout='vertical' onFinish={onFinish}>
                    <Form.Item name='text' rules={[...TextInputRules('Test question')]} label={
                        <span>Question:&nbsp;
                        <Tooltip title={
                                <span>For more customization write in markdown.
                                Check <a href='https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet'>Markdown Guide</a> for more information.
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

                <Modal title='Add Option' visible={optionModalVisible} footer={null} onOk={() => { setOptionModal(false) }} onCancel={() => { setOptionModal(false) }}>
                    <AddOptionPage setQuestionOptions={setQuestionOptions} questionOptions={questionOptions} />
                </Modal>
            </div>
        </Layout >
    );
}

export default EditTestPage;
