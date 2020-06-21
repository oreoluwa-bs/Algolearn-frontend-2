import React, { Component, createContext } from 'react';
import { message } from 'antd';
import { utils, instance } from '../../config';

export const LessonContext = createContext();

class LessonContextProvider extends Component {
    state = {
        response: {
            status: null,
            message: null
        }
    }

    // getAllCourses = async () => {
    //     try {
    //         const res = await instance.get(`/courses`);
    //         const { data } = res.data;
    //         this.setState({ courses: data.doc });
    //     } catch (error) {
    //         const { status, message } = error.response.data;
    //         this.feedback({ status, message });
    //     }
    // }

    // CRUD COURSE
    handleGetCourseLessons = async (courseId, params) => {
        try {
            const res = await instance.get(`/courses/${courseId}/lessons${params ? params : '/'}`, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            return res.data.data;
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
        }
    }

    handleGetLesson = async ({ courseId, lessonId }) => {
        try {
            const res = await instance.get(`/courses/${courseId}/lessons/${lessonId}`, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            return res.data.data;
        } catch (error) {
            return error.response.data
        }
    }

    handleCreateLesson = async (courseId, values) => {
        const { title, text, video } = values;
        const form = new FormData();
        form.append('title', title);
        form.append('text', text);
        form.append('video', video);

        try {
            const res = await instance.post(`/courses/${courseId}/lessons/`, form, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            // const { data } = res.data;
            this.feedback({ status: 'success', message: 'Your lesson has been created' });
            return res.data;
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
        }
    }
    handleEditLesson = async ({ courseId, lessonId }, values) => {
        const { title, text, video } = values;
        const form = new FormData();
        form.append('title', title);
        form.append('text', text);
        form.append('video', video);
        
        try {
            const res = await instance.patch(`/courses/${courseId}/lessons/${lessonId}`, form, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            this.feedback({ status: 'success', message: 'Your lesson has been edited' });
            return res.data;
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
        }
    }

    handleDeleteLesson = async ({ courseId, lessonId }) => {
        try {
            const res = await instance.delete(`/courses/${courseId}/lessons/${lessonId}`, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            this.feedback({ status: 'success', message: 'Your lesson has been deleted' });
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
            <LessonContext.Provider value={{
                ...this.state,

                // CRUD LESSON
                // getAllCourses: this.getAllCourses,
                handleGetCourseLessons: this.handleGetCourseLessons,
                handleGetLesson: this.handleGetLesson,
                handleCreateLesson: this.handleCreateLesson,
                handleEditLesson: this.handleEditLesson,
                handleDeleteLesson: this.handleDeleteLesson,

            }}>
                {this.props.children}
            </LessonContext.Provider>
        );
    }
}

export default LessonContextProvider;