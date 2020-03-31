import React from 'react';
import { Layout, Row, Col } from 'antd';

const AuthFormWrapper = (props) => {
    return (
        <Layout>
            <div className='auth-form-wrap'>
                <div className='auth-form-wrapper'>
                    <Row>
                        <Col xs={{ span: 24 }} xl={{ span: 10 }}>
                            <div className='auth-form-img' style={{ backgroundColor: props.bgColor }}>
                            </div>
                        </Col>
                        <Col xs={{ span: 24 }} xl={{ span: 14 }}>
                            {props.children}
                        </Col>
                    </Row>
                </div>
            </div>
        </Layout>
    );
}

export default AuthFormWrapper;