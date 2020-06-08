import React, { useState } from 'react'
import { Button } from 'antd';
import { ReviewModal } from '..';


const ClassFooter = (props) => {
    const [reviewModal, setReviewModal] = useState(false);
    const { currentMatch, course, nextLesson, lessons, lesson } = props.courseData;

    if (lesson) { }

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
                {/* {
                    !nextLesson?.slug &&
                    <Button style={{ float: 'right' }} type='primary' onClick={() => { setReviewModal(true) }}>Complete Course</Button>
                } */}
                {
                    !nextLesson?.slug && !course?.course?.testQuestionCount > 0 &&
                    <Button style={{ float: 'right' }} type='primary' onClick={() => { setReviewModal(true) }}>Complete Course</Button>
                }
                {
                    !nextLesson?.slug && course?.course?.testQuestionCount > 0 &&
                    <Button style={{ float: 'right' }} type='primary' onClick={() => {
                        props.history.push({
                            pathname: `/classroom/${currentMatch.params.slug}/test`,
                            // state: { course, }
                        });
                    }}>Start Test</Button>
                }
            </div>
            <div>
                <ReviewModal reviewModal={reviewModal} setReviewModal={setReviewModal} />
            </div>
        </div>
    )
}

export default ClassFooter
