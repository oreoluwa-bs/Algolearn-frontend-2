import React, { lazy, Suspense } from 'react';
import { Input, Row, Col, Card } from 'antd';
import '../../styles/catalogue.css';
// import CoursePreview from '../../components/Catalogue/CoursePreview';
import { Link } from 'react-router-dom';

const Thumbnails = lazy(() => import('../../components/Catalogue/CoursePreview'));

const { Search } = Input;

const CataloguePage = () => {
    const course = {
        slug: 2,
        title: 'James',
        description: 'Hanmesds',
        authorName: 'Jane Doe',
        ratings: [0, 3, 4],
        difficulty: 'Beginner'
    }
    const handleSearch = (e) => {

    };
    return (
        <div className='catalogue-container'>
            <div style={{ paddingTop: '50px' }}>
                <h1 style={{ textAlign: 'center' }}>Course Catalogue</h1>
                <div style={{ width: '75vw', margin: '0 auto' }}>
                    <Search
                        placeholder="Search"
                        onSearch={handleSearch}
                        onInput={handleSearch}
                        // style={{ height: 50 }}
                        enterButton
                        size='large'
                    />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div>
                        <Row gutter={{ xs: 10, md: 28, lg: 36, xl: 48 }} style={{ marginBottom: 40 }}>
                            <Suspense key={course._id} fallback={
                                <Col key={course._id} xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }} xxl={{ span: 6 }} style={{ marginBottom: 40 }}>
                                    <Card style={{ backgroundColor: 'gainsborough', height: 200 }}>Loading...</Card>
                                </Col>}>
                                <Col key={course._id} xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }} xxl={{ span: 6 }} style={{ marginBottom: 40 }}>
                                    <Link to={`/catalogue/${course.slug}`}>
                                        <Thumbnails course={course} />
                                    </Link>
                                </Col>
                                <Col key={course._id} xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }} xxl={{ span: 6 }} style={{ marginBottom: 40 }}>
                                    <Link to={`/catalogue/${course.slug}`}>
                                        <Thumbnails course={course} />
                                    </Link>
                                </Col>
                            </Suspense>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CataloguePage;

// 
        //    {/* <Col key={course._id} xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }} xxl={{ span: 6 }} style={{ marginBottom: 40 }}>
        //                         <Link to={`/catalogue/${course.slug}`}>
        //                             <CoursePreview course={course} />
        //                         </Link>
        //                     </Col> */}