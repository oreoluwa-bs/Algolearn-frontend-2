import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Layout, PageHeader, Divider, Typography, Radio, Form, Result, Progress, Tooltip } from 'antd';
import { green, red } from '@ant-design/colors';
import { AuthContext } from '../../../store/context/auth';
import { CourseContext } from '../../../store/context/course';
import { QuestionsContext } from '../../../store/context/questions';
import { EnrollmentContext } from '../../../store/context/enroll';
import { ReviewModal } from '../../../components/Classroom';

const { Content } = Layout;
const { Text } = Typography;

const ExamSubmitted = (props) => {
    const { auth } = useContext(AuthContext);
    const { handleGetCourse } = useContext(CourseContext);
    const { handleGetCourseTest } = useContext(QuestionsContext);
    const { handleGetEnrolledInCourse } = useContext(EnrollmentContext);
    const [course, setCourse] = useState({});
    const [testQuestions, setTestQuestions] = useState([]);
    const [reviewModal, setReviewModal] = useState(false);

    useEffect(() => {
        const getCourseData = async () => {
            const resCourse = await handleGetCourse(props.match.params.slug);
            if (resCourse.data) {
                const resTest = await handleGetCourseTest(resCourse.data._id);
                setTestQuestions(resTest.doc);
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
            setTestQuestions(props.location.state.testQuestions);
            setReviewModal(props.location.state.showReviewModal);
        } else {
            getCourseData();
        }
    }, [props.location.state, props.match.params.slug, handleGetCourse, props.history, handleGetEnrolledInCourse, auth, handleGetCourseTest]);

    if (!auth) return <Redirect to='/dashboard' />
    
    return (
        <Layout className='dash'>
            <Layout style={{ padding: '48px 48px 0' }}>
                <Content style={{ padding: '24px', margin: 0, backgroundColor: 'white', minHeight: 'calc(100vh - 190px)' }}>
                    <PageHeader title={course?.course?.title} style={{}} extra={[
                        <Result key='result' style={{ padding: 0 }}
                            successPercent={50}
                            icon={
                                <Tooltip title={`Got ${course?.test?.score} out of ${testQuestions?.length} questions`}>
                                    <Progress width={50} type='circle' percent={(course?.test?.score / testQuestions?.length) * 100}
                                        strokeColor={(course?.test?.score / testQuestions?.length) * 100 < 70 ? red[5] : null} />
                                </Tooltip>
                            }
                            subTitle='Final Score'
                        />
                    ]}>
                    </PageHeader>
                    <Divider />
                    <div>
                        {
                            course?.test && course?.test.answers &&
                            <Form name='testt_results' initialValues={{ ...course.test.answers }} onFinish={() => { }}>
                                {
                                    testQuestions && testQuestions.length > 0 &&
                                    testQuestions.map((question, index) => {
                                        const userAnswers = Object.values(course.test.answers);
                                        const isCorrectAnswer = testQuestions[index].correctOption.key === userAnswers[index];
                                        return (
                                            <div key={question._id} style={{ marginBottom: 20 }}>
                                                <Text strong>{index + 1}. {question.question}</Text>
                                                {
                                                    !isCorrectAnswer &&
                                                    <Text style={{ color: !isCorrectAnswer ? green[5] : red[5] }}> - Correct answer is {testQuestions[index].correctOption.text}</Text>
                                                }
                                                <br />
                                                <Form.Item name={`question-${index + 1}`}>
                                                    <Radio.Group disabled={false}>
                                                        {
                                                            question.options.map((options) => {
                                                                return (
                                                                    <Radio disabled={userAnswers[index] !== options.key} key={options.key} value={options.key}>
                                                                        <Text style={{
                                                                            color: userAnswers[index] === options.key && !isCorrectAnswer ? red[5] :
                                                                                userAnswers[index] === options.key && isCorrectAnswer ? green[5] : null
                                                                        }}>{options.text}</Text>
                                                                    </Radio>
                                                                )
                                                            })
                                                        }
                                                    </Radio.Group>
                                                </Form.Item>
                                            </div>
                                        );
                                    })
                                }
                                {/* <Form.Item>
                                <Button style={{ float: 'right' }} size='large' type='primary' htmlType='submit'>Submit</Button>
                            </Form.Item> */}
                            </Form>
                        }
                    </div>
                    <ReviewModal reviewModal={reviewModal} setReviewModal={setReviewModal} course={course.course} />
                </Content>
            </Layout>
        </Layout >
    );
}

export default ExamSubmitted;