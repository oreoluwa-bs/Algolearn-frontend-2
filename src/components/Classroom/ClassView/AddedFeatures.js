import React, { useState, useContext } from 'react'
import { Button, Modal, List } from 'antd'
import { FlagOutlined, MessageOutlined } from '@ant-design/icons'
import { ReportContext } from '../../../store/context/report';
import { AuthContext } from '../../../store/context/auth';
import { Link } from 'react-router-dom';

const AddedFeatures = (props) => {
    const { auth } = useContext(AuthContext);
    const { handleReportCourse } = useContext(ReportContext);
    const [modalFlagVisible, setFlagModal] = useState(false);

    const handleFlag = async (report) => {
        const values = {
            courseId: props.course._id,
            lesson: props.lesson._id,
            report,
        }
        await handleReportCourse(values);
        setFlagModal(false);
    };

    return (
        <div>
            <div style={{ float: 'right' }}>
                {
                    auth.role !== 'admin' && <Button type='dashed' onClick={() => setFlagModal(true)}><FlagOutlined /></Button>
                }
                <Link to={`/discuss/${props.course?.slug}`}>
                    <Button icon={<MessageOutlined />} style={{ float: 'right', marginLeft: 10 }} onClick={() => null} disabled={auth.role === 'admin'} />
                </Link>
            </div>
            {
                auth.role !== 'admin' &&
                <Modal title='Report Course & Lesson' visible={modalFlagVisible} onOk={() => setFlagModal(false)} onCancel={() => setFlagModal(false)} footer={null} className='flag-modal'>
                    <List size='large' bordered dataSource={['Copyright Infringement', 'It\'s inappropriate', 'It\'s Inaccurate', 'It\'s Spam', 'It\'s Offensive']}
                        renderItem={(item) => <List.Item className='flag-modal-list-item' onClick={() => { handleFlag(item) }}>{item}</List.Item>} />
                </Modal>
            }
        </div>
    )
}

export default AddedFeatures
