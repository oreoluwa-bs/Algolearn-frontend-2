import React, { useContext } from 'react'
import { Form, Rate, Modal, Button, Input } from 'antd'
import { ReviewContext } from '../../../store/context/review';

const { TextArea } = Input;

const ReviewModal = (props) => {
    const { reviewModal, setReviewModal, course } = props;

    const { handleReviewCourse } = useContext(ReviewContext);

    const onReviewCourse = async (values) => {
        const res = await handleReviewCourse(course._id, values);
        if (res?.status === 'success') {
            setReviewModal(false);
        }
    };

    return (
        <div>
            <Modal closable={false} title={'We\'d love to hear about your experience'} visible={reviewModal} maskClosable={false}
                footer={null} onOk={() => setReviewModal(false)} onCancel={() => setReviewModal(false)}>
                <Form name='review_course' initialValues={{ rating: 3 }} onFinish={onReviewCourse} size='large' layout='vertical'>
                    {/* // {...formItemLayout} */}
                    <Form.Item name='rating' style={{ textAlign: 'center' }}>
                        <Rate style={{ fontSize: 35 }} />
                    </Form.Item>
                    <Form.Item name='review' label='Feedback:' rules={[{ required: true, message: 'You haven\'t give us your input on this course' }]}>
                        <TextArea placeholder='How do you feel about the course?' rows={4} />
                    </Form.Item>
                    <Form.Item>
                        <Button size='large' type='primary' block htmlType='submit'>
                            Submit review
                            </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default ReviewModal
