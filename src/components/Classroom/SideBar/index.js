import React, { useState, useContext, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { CheckOutlined, CiCircleOutlined } from '@ant-design/icons';
import { green } from '@ant-design/colors';
import { Link } from 'react-router-dom';
import { LessonContext } from '../../../store/context/lesson';

const { Sider } = Layout;

const SideBar = (props) => {
    const { handleGetCourseLessons } = useContext(LessonContext);
    const [collapsed, setCollapsed] = useState(false);
    const [lessons, setLessons] = useState([]);
    const [defKey, setDefKey] = useState(null);

    useEffect(() => {
        const handleInit = async (courseId) => {
            const res = await handleGetCourseLessons(courseId, '?sort=createdAt');
            setLessons(res.doc);
        }
        if (props.course?.course?._id) {
            handleInit(props.course.course._id);
        }
    }, [handleGetCourseLessons, props.course]);

    useEffect(() => {
        setDefKey(props.location.pathname.split(`${props.currentMatch.url}/lesson`)[1]);
    }, [props.location.pathname, props.currentMatch.url]);

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
            {defKey && <Menu mode="inline" theme='dark' style={{ height: '100%', borderRight: 0 }} defaultSelectedKeys={[defKey]}>
                {
                    lessons &&
                    lessons.map((lesson) => {
                        const isEnrolled = [{ _id: '5e8cceb630733391a8f279d0', slug: 'ixiaiandai' }].findIndex((les) => les._id === lesson._id) !== -1;
                        return (
                            <Menu.Item key={`/${lesson.slug}`}>
                                {isEnrolled && <CheckOutlined style={{ color: green[5] }} />}
                                {!isEnrolled && <CiCircleOutlined />}
                                <span>{lesson.title}</span>
                                <Link to={
                                    {
                                        pathname: `${props.currentMatch.url}/lesson/${lesson.slug}`,
                                        state: {
                                            lesson,
                                        }
                                    }} />
                            </Menu.Item>
                        );
                    })
                }
            </Menu>}
        </Sider>
    );
}

export default SideBar;