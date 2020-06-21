import React from 'react';
import { Empty, Result } from 'antd';

const EmptyState = (props) => {
    const { description, extra } = props;
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <Result
                icon={<Empty description={false} />}
                title={description}
                extra={extra}
            />
        </div>
    );
}

export default EmptyState;