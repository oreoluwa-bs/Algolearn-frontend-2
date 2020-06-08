import React, { useState } from 'react'
import { Button, Modal } from 'antd';

const ClassFooter = (props) => {
    const [reviewModal, setReviewModal] = useState(false);
    const { currentMatch, course, nextLesson, lessons, lesson } = props.courseData;
    if (lesson) {

    }
    return (
        <div>
            <div>
                {
                    nextLesson?.slug &&
                    <Button style={{ float: 'right' }} type='primary' onClick={() => {
                        props.history.push({
                            pathname: `/classroom/${currentMatch.params.slug}/lesson/${nextLesson.slug}`,
                            state: {
                                course,
                                lesson: nextLesson,
                                lessons,
                            }
                        });
                    }}>Next Lesson</Button>
                }
                {
                    !nextLesson?.slug &&
                    <Button style={{ float: 'right' }} type='primary' onClick={() => { setReviewModal(true) }}>Complete Course</Button>
                }
            </div>
            <div>
                <Modal title="We'd love to hear about your experience" visible={reviewModal} onOk={() => setReviewModal(false)} onCancel={() => setReviewModal(false)}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        </div>
    )
}

export default ClassFooter
