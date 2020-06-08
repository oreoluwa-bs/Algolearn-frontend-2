import React, { Component, createContext } from 'react';
import { message } from 'antd';
import { utils, instance } from '../../config';

export const ReviewContext = createContext();

class ReviewContextProvider extends Component {
    state = {
        response: {
            status: null,
            message: null
        }
    }
    // CRUD REVIEW
    handleGetCourseReviews = async (courseId, params) => {
        try {
            const res = await instance.get(`/courses/${courseId}/reviews${params ? params : '/'}`, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            return res.data.data;
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
        }
    }

    handleGetCourseReview = async ({ courseId, reviewId }) => {
        try {
            const res = await instance.get(`/courses/${courseId}/reviews/${reviewId}`, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            return res.data.data;
        } catch (error) {
            return error.response.data
        }
    }

    handleReviewCourse = async (courseId, values) => {
        const { review, rating } = values;
        try {
            const res = await instance.post(`/courses/${courseId}/reviews/`, { review, rating }, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            this.feedback({ status: 'success', message: 'Thanks for your feedback!' });
            return res.data;
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
        }
    }
    handleEditCourseReview = async ({ courseId, reviewId }, values) => {
        const { review, rating } = values;
        try {
            const res = await instance.patch(`/courses/${courseId}/reviews/${reviewId}`, { review, rating }, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            this.feedback({ status: 'success', message: 'Review has been edited' });
            return res.data;
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
        }
    }

    handleDeleteCourseReview = async ({ courseId, reviewId }) => {
        try {
            const res = await instance.delete(`/courses/${courseId}/reviews/${reviewId}`, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            this.feedback({ status: 'success', message: 'Review has been deleted' });
            return res.data;
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
        }
    }


    feedback = (response) => {
        if (response.status === 'success') {
            message.success(response.message);
        }
        if (response.status === 'error') {
            message.error(response.message);
        }
        if (response.status === 'info') {
            message.info(response.message);
        }
    }
    render() {
        return (
            <ReviewContext.Provider value={{
                ...this.state,

                // CRUD REVIEW
                handleGetCourseReviews: this.handleGetCourseReviews,
                handleGetCourseReview: this.handleGetCourseReview,
                handleReviewCourse: this.handleReviewCourse,
                handleEditCourseReview: this.handleEditCourseReview,
                handleDeleteCourseReview: this.handleDeleteCourseReview,

            }}>
                {this.props.children}
            </ReviewContext.Provider>
        );
    }
}

export default ReviewContextProvider;