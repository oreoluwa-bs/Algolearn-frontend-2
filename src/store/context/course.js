import React, { Component, createContext } from 'react';
// import axios from 'axios';
import { message } from 'antd';
import instance from '../../axios';
import utils from '../../utils';

export const CourseContext = createContext();

class CourseContextProvider extends Component {
    state = {
        courses: [],
        response: {
            status: null,
            message: null
        }
    }


    componentDidMount() {
        this.getAllCourses();
    }

    getAllCourses = async () => {
        try {
            const res = await instance.get(`/courses`);
            const { data } = res.data;
            this.setState({ courses: data.doc });
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
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

    handleEnrollInCourse = async (id) => {
        try {
            const res = await instance.patch(`/courses/enroll/${id}`, {}, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            this.feedback({ status: 'success', message: 'Your have enrolled in this course' });
            return res.data;
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
        }
    }
    handleUnEnrollInCourse = async (id) => {
        try {
            await instance.delete(`/courses/enroll/${id}`, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            this.feedback({ status: 'success', message: 'Your have unenrolled from this course' });
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
            <CourseContext.Provider value={{
                ...this.state,
                getAllCourses: this.getAllCourses,
                handleCreateCourse: this.handleCreateCourse,


                handleEnrollInCourse: this.handleEnrollInCourse,
                handleUnEnrollInCourse: this.handleUnEnrollInCourse,
            }}>
                {this.props.children}
            </CourseContext.Provider>
        );
    }
}

export default CourseContextProvider;