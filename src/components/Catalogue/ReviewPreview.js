import React from 'react'
import { Avatar, Rate, Typography } from 'antd'
import { utils } from '../../config'

const { Paragraph, Text, } = Typography;

const ReviewPreview = ({ review }) => {

    const reviewColors = ['#02b3e4', '#02ccba', '#ff5483'];

    return (
        <div className='review-card' style={{ borderColor: review.rating > 2 ? review.rating > 3 ? reviewColors[1] : reviewColors[0] : reviewColors[2] }}>
            <div>
                {review.user.photo && <Avatar alt='user-profile-photo' size={80} style={{ backgroundColor: review.user.color ?? '#87d068' }} src={`${utils.apiHOST}images/users/${review.user.photo}`} />}
                {!review.user.photo && <Avatar alt='user-profile-photo' size={80} style={{ backgroundColor: review.user.color ?? '#87d068' }}>{review.user.firstname[0]}{review.user.lastname[0]}</Avatar>}
            </div>
            <div><Text type='secondary'>{review.user && review.user.firstname} {review.user && review.user.lastname}</Text></div>
            <div style={{ marginTop: 5 }}>
                <Paragraph strong>{review.review}</Paragraph>
            </div>
            <Rate value={review.rating} defaultValue={review.rating} disabled />
        </div>
    )
}

export default ReviewPreview
