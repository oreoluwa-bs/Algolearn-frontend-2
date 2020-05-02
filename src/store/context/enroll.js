import React, { Component, createContext } from 'react';
import { message } from 'antd';
import { utils, instance } from '../../config';

export const EnrollmentContext = createContext();

class EnrollmentContextProvider extends Component {
    state = {
        response: {
            status: null,
            message: null
        }
    }
    // CRUD COURSE ENROLLMENT 
    handleGetEnrolledInCourse = async (id, params) => {
        try {
            const res = await instance.get(`/courses/${id}/enrolls${params ? params : '/'}`, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            return res.data;
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
        }
    }

    handleGetSpecificEnrolledInCourse = async ({ courseId, enrollemtId }) => {
        try {
            const res = await instance.get(`/courses/${courseId}/enrolls/${enrollemtId}`, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            return res.data;
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
        }
    }

    handleEnrollInCourse = async (id) => {
        try {
            const res = await instance.post(`/courses/${id}/enrolls/`, {}, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            this.feedback({ status: 'success', message: 'Your have enrolled in this course' });
            return res.data;
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
        }
    }

    // CRUD USER ENROLLMENT
    handleGetMyEnrolled = async () => {
        try {
            const res = await instance.get(`/users/me/enrolls/`, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            return res.data.data;
        } catch (error) {
            return error.response.data
        }
    }

    handleUnEnrollInCourse = async (id) => {
        try {
            await instance.delete(`/users/me/enrolls/${id}/`, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            this.feedback({ status: 'success', message: 'Your have unenrolled from this course' });
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
        }
    }


    handleEditLesson = async ({ courseId, lessonId }, values) => {
        const { title, text, video } = values;
        try {
            const res = await instance.patch(`/courses/${courseId}/lessons/${lessonId}`, { title, text, video }, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            this.feedback({ status: 'success', message: 'Your lesson has been edited' });
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
            <EnrollmentContext.Provider value={{
                ...this.state,

                // CRUD USER ENROLLEMENT
                handleGetEnrolledInCourse: this.handleGetEnrolledInCourse,
                handleGetMyEnrolled: this.handleGetMyEnrolled,

                // ENROLLMENT
                handleEnrollInCourse: this.handleEnrollInCourse,
                handleUnEnrollInCourse: this.handleUnEnrollInCourse,

                handleEditLesson: this.handleEditLesson,
                handleDeleteLesson: this.handleDeleteLesson,

            }}>
                {this.props.children}
            </EnrollmentContext.Provider>
        );
    }
}

export default EnrollmentContextProvider;