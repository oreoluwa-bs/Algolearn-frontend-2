import React, { Component, createContext } from 'react';
import { message } from 'antd';
import { utils, instance } from '../../config';

export const ReportContext = createContext();

class ReportContextProvider extends Component {
    state = {
        response: {
            status: null,
            message: null
        }
    }

    // CRUD COURSE
    handleGetReportedCourses = async (params) => {
        try {
            const res = await instance.get(`/reports/${params ? params : '/'}`, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            return res.data.data;
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
        }
    }

    handleGetReportedCourse = async (reportId) => {
        try {
            const res = await instance.get(`/reports/${reportId}`, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            return res.data.data;
        } catch (error) {
            return error.response.data
        }
    }

    handleReportCourse = async (values) => {
        const { courseId, report, lesson } = values;
        try {
            const res = await instance.post(`/reports/create/${courseId}`, { report, lesson }, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            // const { data } = res.data;
            this.feedback({ status: 'success', message: 'You have report has been sent. Thanks for your feedback' });
            return res.data;
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
        }
    }
    handleEditReportedCourse = async (reportId, values) => {
        const { report } = values;
        try {
            const res = await instance.patch(`/reports/${reportId}`, { report }, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            return res.data;
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
        }
    }

    handleDeleteReportedCourse = async (reportId) => {
        try {
            const res = await instance.delete(`/reports/${reportId}`, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            this.feedback({ status: 'success', message: 'Report has been deleted' });
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
            <ReportContext.Provider value={{
                ...this.state,

                // CRUD TestQuestion
                handleGetReportedCourses: this.handleGetReportedCourses,
                handleGetReportedCourse: this.handleGetReportedCourse,
                handleReportCourse: this.handleReportCourse,
                handleEditReportedCourse: this.handleEditReportedCourse,
                handleDeleteReportedCourse: this.handleDeleteReportedCourse

            }}>
                {this.props.children}
            </ReportContext.Provider>
        );
    }
}

export default ReportContextProvider;