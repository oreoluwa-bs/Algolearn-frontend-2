import React, { Component, createContext } from 'react';
import { message } from 'antd';
import { utils, instance } from '../../config';

export const DiscussionContext = createContext();

class DiscussionContextProvider extends Component {
    state = {
        response: {
            status: null,
            message: null
        }
    }
    // CRUD REVIEW
    handleGetCourseDiscussions = async (courseId, params) => {
        try {
            const res = await instance.get(`/courses/${courseId}/discussions${params ? params : '/'}`, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            return res.data.data;
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
            <DiscussionContext.Provider value={{
                ...this.state,

                // CRUD REVIEW
                handleGetCourseDiscussions: this.handleGetCourseDiscussions,

            }}>
                {this.props.children}
            </DiscussionContext.Provider>
        );
    }
}

export default DiscussionContextProvider;