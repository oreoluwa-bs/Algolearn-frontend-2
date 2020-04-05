import React, { Component, createContext } from 'react';
import axios from 'axios';
import { message } from 'antd';

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
            const res = await axios.get(`${this.props.apiUrl}/courses`);
            const { data } = res.data;
            this.setState({ courses: data.doc });
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
            }}>
                {this.props.children}
            </CourseContext.Provider>
        );
    }
}

export default CourseContextProvider;