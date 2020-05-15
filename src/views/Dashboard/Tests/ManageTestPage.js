import React, { useContext, useEffect, useState } from 'react';
import { PageHeader, Button, Table, Tooltip, Divider, Popconfirm, Modal } from 'antd';
import { CreateTestPage, EditTestPage } from '..';
import { QuestionsContext } from '../../../store/context/questions';
import Title from 'antd/lib/typography/Title';

const ManageTestPage = (props) => {
    const { course } = props;
    const { handleGetCourseTest, handleDeleteTestQuestion } = useContext(QuestionsContext);
    const [test, setTest] = useState([]);

    const [testCreateModalVisible, setTestCreateModal] = useState(false);
    const [testEditModalVisible, setTestEditModal] = useState(false);
    const [testIndex, setTestIndex] = useState();

    const getTests = async (courseId) => {
        const res = await handleGetCourseTest(courseId, '/?sort=createdAt');
        setTest(res.doc);
    }

    useEffect(() => {
        const handleInit = async (courseId) => {
            const resTest = await handleGetCourseTest(courseId, '/?sort=createdAt');
            setTest(resTest.doc);
        }

        if (course?.id) {
            handleInit(course._id);
        }
    }, [course, handleGetCourseTest]);

    return (
        <>
            <PageHeader title={<Title level={4} type='secondary'>Test</Title>}
                extra={[<Button key='add' onClick={() => { setTestCreateModal(true) }}>Add Question</Button>]}>
            </PageHeader>
            <div style={{ padding: 24, }}>
                <Table tableLayout='fixed' rowKey={(record) => record._id} dataSource={test} pagination={false} columns={[
                    {
                        title: 'Question',
                        dataIndex: 'question',
                        key: 'question',
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        render: (question) => (
                            <span>
                                <Tooltip title='Delete this question' key='del-button'>
                                    <Popconfirm
                                        title='Are you sure delete this question?'
                                        onConfirm={() => {
                                            handleDeleteTestQuestion({ courseId: course._id, questionId: question._id });
                                            getTests(course._id);
                                        }}
                                        onCancel={null}
                                        okText='Yes'
                                        cancelText='No'
                                    >
                                        <Button type='dashed'>Delete</Button>
                                    </Popconfirm>
                                </Tooltip>
                                <Divider type='vertical' />
                                <Tooltip title='Edit this question' key='edit-button'>
                                    <Button type='primary' onClick={() => {
                                        const tempIndex = test.findIndex((re) => {
                                            return re._id === question._id
                                        })

                                        setTestIndex(tempIndex);
                                        // console.log(tempIndex);
                                        setTestEditModal(true);
                                    }} >Edit</Button>
                                </Tooltip>
                            </span>
                        ),
                    },
                ]} />
            </div>
            <Modal title='Create Test' visible={testCreateModalVisible} footer={null} width='75vw'
                onOk={() => { setTestCreateModal(false) }} onCancel={() => { setTestCreateModal(false) }}>
                <CreateTestPage course={course} close={() => { setTestCreateModal(false) }} getTests={getTests} />
            </Modal>

            <Modal title='Edit Test' visible={testEditModalVisible} footer={null} width='75vw'
                onOk={() => { setTestIndex(); setTestEditModal(false) }} onCancel={() => { setTestIndex(); setTestEditModal(false) }}>
                <EditTestPage course={course} test={test[testIndex]} close={() => { setTestIndex(); setTestEditModal(false) }} getTests={getTests} />
            </Modal>
        </>
    );
}

export default ManageTestPage;