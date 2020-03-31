import React from 'react';
import { Link } from 'react-router-dom';
// import { Layout, Row, Col, Typography, Divider } from 'antd';
import { Typography, Divider } from 'antd';
import '../../styles/homepage.css';

const { Title, Paragraph } = Typography;

const HomePage = () => {
    return (
        <div>
            <div className='hero'>
                <div className='hero-bg'> </div>
                <div className='hero-content'>
                    <p className='hero-caption'>Get better grades</p>
                    <p className='hero-text'>Gain the neccessary skills for success</p>
                </div>
            </div>
            <div className='get-started' >
                <div className='get-started-content'>
                    <Title level={1} style={{ fontWeight: 'bold' }}>Begin your journey</Title>
                    <Paragraph>
                        Get a better understanding of your Computer Science courses with AlgoLearn.

                    </Paragraph>
                    <Link to='/signup?v="tutor"' className='ant-btn ant-btn-primary ant-btn-lg' style={{ backgroundColor: '#7D8CC4', borderColor: '#7D8CC4' }}>
                        Become a tutor
                    </Link>
                    <Divider type='vertical' />
                    <Link to='/signup?v="learner"' className='ant-btn ant-btn-primary ant-btn-lg'>Become a learner</Link>
                </div>
            </div>
        </div>
    );
}

export default HomePage;