import React, { useState, Suspense, lazy, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Layout, Row, Col, Typography } from 'antd';
import { CourseContext } from '../../../store/context/course';

const RecommendThumbnails = lazy(() => import('../CoursePreview'));
const ReviewThumbnails = lazy(() => import('../ReviewPreview'));

const { Content } = Layout;
const { Title } = Typography;

const CourseDetailFooter = (props) => {
    const { handleGetCourseRecommendations, getAllCourses } = useContext(CourseContext);
    const [recommendations, setRecommendations] = useState([]);
    const { course } = props;

    useEffect(() => {
        const handleGetRecommendations = async () => {
            const res = await handleGetCourseRecommendations(course?._id);
            console.log(res);
            setRecommendations(res.data);
            // if (res.data.length < 1) {
            //     const newres = await getAllCourses(`/?sort=-ratingsAverage&_id[ne]=${course?._id}`);
            //     setRecommendations(newres.data.doc.slice(0, 4));
            // } else {
               
            // }

        }
        handleGetRecommendations();
    }, [handleGetCourseRecommendations, course, getAllCourses]);
    return (
        <div>
            {
                course.reviews && course.reviews.length > 0 &&
                <div style={{ backgroundColor: '#FAFBFC' }}>
                    <Content className='course-details-container' style={{ backgroundColor: 'inherit' }}>
                        <div style={{ paddingTop: 64, paddingBottom: 40 }}>
                            <Row gutter={16}>
                                {
                                    course.reviews.map((review) => (
                                        <Suspense key={review.course.slug} fallback={
                                            <Col key={review._id} xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 6 }}>
                                                <div className='skeleton-card loading' style={{ height: 200 }}></div>
                                            </Col>}>
                                            <Col key={review._id} xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 6 }}>
                                                <ReviewThumbnails review={review} />
                                            </Col>
                                            <Col key={review._id} xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 6 }}>
                                            </Col>
                                        </Suspense>
                                    ))
                                }
                            </Row>
                        </div>
                    </Content>
                </div>
            }
            <div style={{ backgroundColor: '#FAFBFC' }}>
                <Content className='course-details-container' style={{ backgroundColor: 'inherit' }}>
                    <div style={{ paddingTop: 64, paddingBottom: 40 }}>
                        <Title level={2} style={{ marginBottom: 35 }}>Check out other courses</Title>
                        <Row gutter={{ xs: 10, md: 28, lg: 36, xl: 48 }}>
                            {
                                recommendations && recommendations.map((course) => (
                                    <Suspense key={course.slug} fallback={
                                        <Col key={course._id} xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }} xxl={{ span: 6 }} style={{ marginBottom: 40 }}>
                                            <div className='skeleton-card loading' style={{ height: 200 }}></div>
                                        </Col>}>
                                        <Col key={course._id} xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }} xxl={{ span: 6 }} style={{ marginBottom: 40 }}>
                                            <Link to={`/catalogue/${course.slug}`}>
                                                <RecommendThumbnails course={course} />
                                            </Link>
                                        </Col>
                                    </Suspense>
                                ))
                            }
                        </Row>
                    </div>
                </Content>
            </div>
        </div>
    )
}

export default CourseDetailFooter
