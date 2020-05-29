import React, { Component, createContext } from 'react';
import { message } from 'antd';
import { utils, instance } from '../../config';

export const AuthContext = createContext();

class AuthContextProvider extends Component {

    initAuth = localStorage.getItem('auth') || null;
    state = {
        auth: JSON.parse(this.initAuth) || null,
        response: {
            status: null,
            message: null
        }
    }
    // componentDidMount() {
    //     if (!this.initAuth) this.setAuthToken();
    // }
    setAuthToken = (token) => {
        if (token) {
            document.cookie = `jwt=${token}; expires=${new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)}; path=/;`;
        } else {
            document.cookie = `jwt=; expires=${new Date(Date.now() + 1000)}; path=/;`;
        }
    };


    handleInit = () => {
        instance.get(`/`).then(() => {
            return
        }).catch(() => {
            return
        });
    }

    handleLogout = () => {
        localStorage.removeItem('auth');
        this.setState({ auth: null });
        this.feedback({ status: 'success', message: `You have logged out successfully!` });
        this.setAuthToken();
    }

    handleLogin = async (credentials) => {
        const { email, password } = credentials;
        try {
            const res = await instance.post(`/users/login`, { email, password });
            const { data, token } = res.data;
            this.setAuthToken(token);
            this.setState({ auth: data.user });
            localStorage.setItem('auth', JSON.stringify(data.user));
            this.feedback({ status: 'success', message: `Hello, ${data.user.firstname}!` });
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
        }
    }

    handleSignUp = async (credentials) => {
        const { email, password, firstname, lastname, role } = credentials;
        try {
            const res = await instance.post(`/users/signup`, { email, password, firstname, lastname, role });
            const { data, token } = res.data;
            this.setAuthToken(token);
            this.setState({ auth: data.user });
            localStorage.setItem('auth', JSON.stringify(data.user));
            this.feedback({ status: 'success', message: `Hello, ${data.user.firstname}!` });
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
        }
    }

    handleGetMe = async () => {
        try {
            const res = await instance.get(`/users/me`, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            const { data } = res.data;
            this.setState({ auth: data.data });
            localStorage.setItem('auth', JSON.stringify(data.data));
            return data.data;
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
        }
    }

    handleUpdateMe = async (credentials) => {
        const { firstname, lastname, role, email } = credentials;
        try {
            const res = await instance.patch(`/users/me`, { firstname, lastname, role, email }, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            const { data } = res.data;
            this.handleGetMe();
            this.feedback({ status: 'success', message: `Profile has been updated!` });
            return data.data;
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
        }
    }

    handleDeleteMe = async () => {
        try {
            const res = await instance.delete(`/users/me`, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            const { data } = res.data;
            this.handleLogout();
            this.feedback({ status: 'success', message: `Profile has been deleted!` });
            return data.data;
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
        }
    }

    handleUpdatePassword = async (credentials) => {
        const { password, passwordConfirm } = credentials;
        try {
            const res = await instance.patch(`/users/updateMyPassword`, { password, passwordConfirm }, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            const { data, token } = res.data;
            this.feedback({ status: 'success', message: `Password has been updated!` });
            this.setAuthToken(token);
            return data.data;
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
        }
    }



    // ADMIN

    handleGetAllUsers = async (params) => {
        try {
            const res = await instance.get(`/users${params ? params : '/'}`, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
            // const { data } = res.data;
            // this.setState({ courses: data.doc });
            return res.data;
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
        }
    }

    handleUsersStats = async (year) => {
        try {
            const res = await instance.get(`/users/stats/${year}`, { headers: { Authorization: `Bearer ${utils.getCookie('jwt')}` } });
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
            <AuthContext.Provider value={{
                ...this.state,
                handleLogout: this.handleLogout,
                handleLogin: this.handleLogin,
                handleSignUp: this.handleSignUp,

                handleGetMe: this.handleGetMe,
                handleUpdateMe: this.handleUpdateMe,
                handleUpdatePassword: this.handleUpdatePassword,
                handleDeleteMe: this.handleDeleteMe,


                // Admin
                handleGetAllUsers: this.handleGetAllUsers,
                handleUsersStats: this.handleUsersStats,
            }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export default AuthContextProvider;