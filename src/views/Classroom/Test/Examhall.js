import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Layout, PageHeader, Divider, Typography, Radio, Form, Button, Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { AuthContext } from '../../../store/context/auth';
import { CourseContext } from '../../../store/context/course';
import { QuestionsContext } from '../../../store/context/questions';
import { EnrollmentContext } from '../../../store/context/enroll';

const { Content } = Layout;
const { Text } = Typography;
const { confirm } = Modal;

const Examhall = (props) => {
    const { auth } = useContext(AuthContext);
    const { handleGetCourse } = useContext(CourseContext);
    const { handleGetCourseTest } = useContext(QuestionsContext);
    const { handleGetEnrolledInCourse, handleEditUserCourseEnrollment } = useContext(EnrollmentContext);
    const [course, setCourse] = useState({});
    const [testQuestions, setTestQuestions] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        const getCourseData = async () => {
            const resCourse = await handleGetCourse(props.match.params.slug);
            if (resCourse.data) {
                const res = await handleGetEnrolledInCourse(resCourse.data._id, `/?user=${auth?._id}`);
                if (!res.data.doc[0] && resCourse.data.author._id === auth._id) {
                    props.history.push(`/dashboard/manage/${props.match.params.slug}/content/`);
                }
                if (res?.status === 'error' || (!res.data.doc[0] && resCourse.data.author._id !== auth._id)) {
                    props.history.push(`/dashboard/enrolled-courses`);
                }
                setCourse(res.data.doc[0]);
            }
        }
        if (props.location.state?.course) {
            setCourse(props.location.state.course);
        } else {
            getCourseData();
        }
    }, [props.location.state, props.match.params.slug, handleGetCourse, props.history, handleGetEnrolledInCourse, auth]);


    useEffect(() => {
        const getTestData = async () => {
            const res = await handleGetCourseTest(course.course._id);
            setTestQuestions(res.doc);
            setDataLoaded(true);
        }

        if (course?._id) {
            getTestData();
        }
    }, [course, handleGetCourseTest]);

    const showSubmitConfirm = (values) => {
        confirm({
            title: 'Are you sure you want to submit?',
            icon: <ExclamationCircleOutlined />,
            content: 'Only ONE attempt is permitted',
            okText: 'I am sure',
            // okType: 'danger',
            cancelText: 'No',
            onOk() {
                onFinish(values);
            },
            onCancel() { },
        });
    }

    const calculateScore = (values) => {
        let score = 0;
        const userAnswers = Object.values(values);
        for (let index = 0; index < testQuestions.length; index++) {
            const element = testQuestions[index];
            element.correctOption.key === userAnswers[index] ? score++ : score += 0;
        }
        return score;
    }

    const onFinish = async (values) => {
        const test = {
            score: calculateScore(values),
            attempts: course.test.attempts + 1,
            answers: values,
        }
        const finalValues = {
            test,
            course: course.course._id
        }
        const res = await handleEditUserCourseEnrollment(course._id, finalValues);
        res.status === 'success' ? message.success('Test answers have been submitted') : message.error('Error while submitting answers. Try again later!');
        props.history.push({
            pathname: `/classroom/${course.course.slug}/test-results`,
            state: {
                course: { ...course, test },
                testQuestions,
                showReviewModal: true
            }
        });
    };

    if (!auth) return <Redirect to='/dashboard' />

    if (course?.test?.attempts >= 1 && testQuestions.length > 0) return <Redirect to={{
        pathname: `/classroom/${course.course.slug}/test-results`,
        state: {
            course,
            testQuestions,
            showReviewModal: false
        }
    }} />

    if (course.course && dataLoaded && testQuestions.length < 1) return <Redirect to={`/classroom/${course.course.slug}/`} />
    return (
        <Layout className='dash'>
            <Layout style={{ padding: '48px 48px 0' }}>
                <Content style={{ padding: '24px', margin: 0, backgroundColor: 'white', minHeight: 'calc(100vh - 190px)' }}>
                    <PageHeader title={course?.course?.title} style={{}} extra={[<Text type='secondary' key='attempts'>Attempts: {course?.test?.attempts}</Text>]}>
                        <Content>
                            <Text>Only <strong>ONE</strong> attempt is permitted. Each question is worth a point.</Text>
                        </Content>
                    </PageHeader>
                    <Divider />
                    <div>
                        <Form name="validate_other" onFinish={showSubmitConfirm}>
                            {
                                testQuestions && testQuestions.length > 0 &&
                                testQuestions.map((question, index) => {
                                    return (
                                        <div key={question._id} style={{ marginBottom: 20 }}>
                                            <Text strong>{index + 1}. {question.question}</Text>
                                            <br />
                                            <Form.Item name={`question-${index + 1}`}>
                                                <Radio.Group>
                                                    {
                                                        question.options.map((options) => {
                                                            return (
                                                                <Radio key={options.key} value={options.key}
                                                                    style={{ display: 'block', height: '40px', lineHeight: '40px', paddingLeft: 20 }}
                                                                >{options.text}</Radio>
                                                            )
                                                        })
                                                    }
                                                </Radio.Group>
                                            </Form.Item>
                                        </div>
                                    );
                                })
                            }
                            <Form.Item>
                                <Button style={{ float: 'right' }} size='large' type='primary' htmlType='submit'>Submit</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default Examhall;