import React, { Component, createContext } from 'react';
// import axios from 'axios';
import { message } from 'antd';
import { utils, instance } from '../../config';

export const CourseContext = createContext();

class CourseContextProvider extends Component {
    state = {
        response: {
            status: null,
            message: null
        }
    }

    getAllCourses = async (params) => {
        try {
            const res = await instance.get(`/courses${params ? params : '/'}`);
            // const { data } = res.data;
            // this.setState({ courses: data.doc });
            return res.data;
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
        }
    }

    // CRUD COURSE
    handleGetCourse = async (slug) => {
        try {
            const res = await instance.get(`/courses/${slug}`);
            return res.data.data;
        } catch (error) {
            return error.response.data
        }
    }

    handleCreateCourse = async (values) => {
        const { title, description, difficulty } = values;
        try {
            const res = await instance.post(`/courses/`, { title, description, difficulty }, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            // const { data } = res.data;
            this.feedback({ status: 'success', message: 'Your course has been created' });
            return res.data.data;
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
        }
    }
    handleEditCourse = async (id, values) => {
        const { title, description, difficulty } = values;
        try {
            const res = await instance.patch(`/courses/${id}`, { title, description, difficulty }, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            this.feedback({ status: 'success', message: 'Your course has been edited' });
            return res.data;
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
        }
    }

    handleDeleteCourse = async (id) => {
        try {
            const res = await instance.delete(`/courses/${id}`, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            this.feedback({ status: 'success', message: 'Your course has been deleted' });
            return res.data;
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
        }
    }


    // ENROLLMENT
    // handleEnrollInCourse = async (id) => {
    //     try {
    //         const res = await instance.patch(`/courses/enroll/${id}`, {}, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
    //         this.feedback({ status: 'success', message: 'Your have enrolled in this course' });
    //         return res.data;
    //     } catch (error) {
    //         const { status, message } = error.response.data;
    //         this.feedback({ status, message });
    //     }
    // }
    // handleUnEnrollInCourse = async (id) => {
    //     try {
    //         await instance.delete(`/courses/enroll/${id}`, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
    //         this.feedback({ status: 'success', message: 'Your have unenrolled from this course' });
    //     } catch (error) {
    //         const { status, message } = error.response.data;
    //         this.feedback({ status, message });
    //     }
    // }

    handleGetCourseEnrolledStats = async (id, year) => {
        try {
            const res = await instance.get(`/courses/${id}/enrolls/enrolled-stats/${year}`, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            return res.data;
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
        }
    }

    // RECOMMENDATIONS
    handleGetCourseRecommendations = async (id) => {
        try {
            const res = await instance.get(`/courses/recommend/${id}`);
            return res.data.data;
        } catch (error) {
            return error.response.data
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
            <CourseContext.Provider value={{
                ...this.state,

                // CRUD COURSE
                getAllCourses: this.getAllCourses,
                handleGetCourse: this.handleGetCourse,
                handleCreateCourse: this.handleCreateCourse,
                handleEditCourse: this.handleEditCourse,
                handleDeleteCourse: this.handleDeleteCourse,

                // ENROLLMENTS
                handleGetCourseEnrolledStats: this.handleGetCourseEnrolledStats,
                
                // RECOMMENDATIONS
                handleGetCourseRecommendations: this.handleGetCourseRecommendations,
            }}>
                {this.props.children}
            </CourseContext.Provider>
        );
    }
}

export default CourseContextProvider;