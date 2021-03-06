import React, { lazy, Suspense, useContext, useEffect, useState } from 'react';
import { Input, Row, Col, BackTop } from 'antd';
import { Link } from 'react-router-dom';
import { CourseContext } from '../../store/context/course';
import '../../styles/catalogue.css';

const Thumbnails = lazy(() => import('../../components/Catalogue/CoursePreview'));

const { Search } = Input;

const CataloguePage = () => {
    const [categoryCourses, setCourses] = useState([]);
    const [orgCourses, setOrgCourses] = useState([]);
    const { getAllCourses } = useContext(CourseContext);

    useEffect(() => {
        const handleInit = async () => {
            const res = await getAllCourses('/?sort=-ratingsAverage');
            setOrgCourses(res.data.doc);
            setCourses(res.data.doc);
        }
        handleInit();
    }, [getAllCourses]);

    const handleSearch = (e) => {
        setCourses(orgCourses.filter((course) => {
            const title_course = course.title.toLowerCase();
            const search_params = e.target.value.toLowerCase();
            return title_course.includes(search_params);
        }));
    };

    return (
        <div className='catalogue-container'>
            <div style={{ padding: '50px' }}>
                <h1 style={{ textAlign: 'center' }}>Course Catalogue</h1>
                <div style={{ maxWidth: '75vw', margin: '0 auto' }}>
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
                    {/* <div className='skeleton-card loading' style={{ height: 300 }}></div> */}
                    <br />
                    <br />
                    <div>
                        {
                            categoryCourses && categoryCourses.length > 0 &&
                            <Row gutter={{ xs: 10, md: 28, lg: 36, xl: 48 }}>
                                {categoryCourses.map((course) => (
                                    <Suspense key={course.slug} fallback={
                                        <Col key={course.slug} xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }} xxl={{ span: 6 }} style={{ marginBottom: 40 }}>
                                            <div className='skeleton-card loading' style={{ height: 300 }}></div>
                                        </Col>}>
                                        <Col key={course.slug} xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }} xxl={{ span: 6 }} style={{ marginBottom: 40 }}>
                                            <Link to={`/catalogue/${course.slug}`}>
                                                <Thumbnails course={course} />
                                            </Link>
                                        </Col>
                                    </Suspense>
                                ))}
                            </Row>
                        }
                        {/* {
                            // eslint-disable-next-line no-mixed-operators
                            !categoryCourses || categoryCourses && categoryCourses.length <= 0 &&
                            <Empty />
                        } */}
                    </div>
                    <BackTop />
                </div>
            </div>
        </div>
    );
}

export default CataloguePage;
