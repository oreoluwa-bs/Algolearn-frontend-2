import React, { Component, createContext } from 'react';
import { message } from 'antd';
import { utils, instance } from '../../config';

export const QuestionsContext = createContext();

class QuestionsContextProvider extends Component {
    state = {
        response: {
            status: null,
            message: null
        }
    }

    // CRUD COURSE
    handleGetCourseTest = async (courseId, params) => {
        try {
            const res = await instance.get(`/courses/${courseId}/test${params ? params : '/'}`, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            return res.data.data;
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
        }
    }

    handleGetTestQuestion = async ({ courseId, questionId }) => {
        try {
            const res = await instance.get(`/courses/${courseId}/test/${questionId}`, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            return res.data.data;
        } catch (error) {
            return error.response.data
        }
    }

    handleCreateTestQuestion = async (courseId, values) => {
        const { question, options, correctOption } = values;
        try {
            const res = await instance.post(`/courses/${courseId}/test/`, { question, options, correctOption }, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            // const { data } = res.data;
            this.feedback({ status: 'success', message: 'Your test question has been created' });
            return res.data;
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
        }
    }
    handleEditTestQuestion = async ({ courseId, questionId }, values) => {
        const { question, options, correctOption } = values;
        try {
            const res = await instance.patch(`/courses/${courseId}/test/${questionId}`, { question, options, correctOption }, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            this.feedback({ status: 'success', message: 'Your test question has been edited' });
            return res.data;
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
        }
    }

    handleDeleteTestQuestion = async ({ courseId, questionId }) => {
        try {
            const res = await instance.delete(`/courses/${courseId}/test/${questionId}`, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            this.feedback({ status: 'success', message: 'Your test question has been deleted' });
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
            <QuestionsContext.Provider value={{
                ...this.state,

                // CRUD TestQuestion
                handleGetCourseTest: this.handleGetCourseTest,
                handleGetTestQuestion: this.handleGetTestQuestion,
                handleCreateTestQuestion: this.handleCreateTestQuestion,
                handleEditTestQuestion: this.handleEditTestQuestion,
                handleDeleteTestQuestion: this.handleDeleteTestQuestion,

            }}>
                {this.props.children}
            </QuestionsContext.Provider>
        );
    }
}

export default QuestionsContextProvider;