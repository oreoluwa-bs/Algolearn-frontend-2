import React from 'react';
import { Layout, Button, Result } from 'antd';
// import emptyImage from '../../assets/images/undraw_404.svg';

const PageNotFound = (props) => {
    return (
        <div>
            <Layout>
                <div style={{ backgroundColor: 'white', minHeight: 'calc(100vh - 135px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div>
                        <Result
                            status="404"
                            title="404"
                            subTitle="Sorry, the page you visited does not exist."
                            extra={<Button type="primary" onClick={() => {
                                props.history.goBack()
                            }}>Go Back</Button>}
                        />
                    </div>
                </div>
            </Layout>
        </div>
    );
}

export default PageNotFound;