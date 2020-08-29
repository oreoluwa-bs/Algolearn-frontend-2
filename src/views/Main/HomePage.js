import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Divider, Result } from 'antd';
import { TeamOutlined, BookOutlined } from '@ant-design/icons';
import { orange } from '@ant-design/colors';
import { AuthContext } from '../../store/context/auth';
import '../../styles/homepage.css';

const { Title } = Typography;

const HomePage = () => {

    const { handleStartAPI } = useContext(AuthContext);

    useEffect(() => {
        const handleInit = async () => { await handleStartAPI(); }
        handleInit();
    }, [handleStartAPI]);


    return (
        <div>
            <div className='hero'>
                <div className='hero-bg'> </div>
                <div className='hero-content'>
                    <p className='hero-caption'>Get better grades</p>
                    <p className='hero-text'>Gain the neccessary skills for success</p>
                </div>
            </div>
            <Result
                style={{ backgroundColor: orange[4] }}
                status='warning'
                icon={<BookOutlined style={{ color: 'white' }} />}
                title={<Title level={1} style={{ fontWeight: 'bold', color: 'white' }}>What do we offer?</Title>}
                subTitle={<span style={{ color: 'white' }}>Get a better understanding of your courses with AlgoLearn.</span>}
                extra={[
                    <Link key='cat' to='/catalogue' className='ant-btn ant-btn-primary ant-btn-lg'>Catalogue</Link>
                ]}
            />
            <Result
                // style={{ backgroundColor: green[4] }}
                status='info'
                icon={<TeamOutlined />}
                title={<Title level={1} style={{ fontWeight: 'bold' }}>Begin your journey</Title>}
                subTitle=' Get a better understanding of your courses with AlgoLearn.'
                extra={[
                    <Link key='tut' to='/signup?v=tutor' className='ant-btn ant-btn-primary ant-btn-lg' style={{ backgroundColor: '#7D8CC4', borderColor: '#7D8CC4' }}>
                        Become a tutor
                    </Link>,
                    <Divider key='div' type='vertical' />,
                    <Link key='len' to='/signup?v=student' className='ant-btn ant-btn-primary ant-btn-lg'>Become a learner</Link>
                ]}
            />
            {/* <div className='get-started' style={{ backgroundColor: '#7D8CC4' }}>
                <div className='get-started-content'>
                    <Title level={1} style={{ fontWeight: 'bold', color: 'white' }}>What do we offer?</Title>
                    <Paragraph style={{ color: 'white' }}> Check out our catalogue of courses</Paragraph>
                    <Link to='/catalogue' className='ant-btn ant-btn-primary ant-btn-lg'>Catalogue</Link>
                </div>
            </div> *
            <div className='get-started' >
                <div className='get-started-content'>
                    <Title level={1} style={{ fontWeight: 'bold' }}>Begin your journey</Title>
                    <Paragraph>
                        Get a better understanding of your courses with AlgoLearn.
                    </Paragraph>
                    <Link to='/signup?v=tutor' className='ant-btn ant-btn-primary ant-btn-lg' style={{ backgroundColor: '#7D8CC4', borderColor: '#7D8CC4' }}>
                        Become a tutor
                    </Link>
                    <Divider type='vertical' />
                    <Link to='/signup?v=student' className='ant-btn ant-btn-primary ant-btn-lg'>Become a learner</Link>
                </div>
            </div> */}
        </div>
    );
}

export default HomePage;