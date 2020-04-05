import React, { Component, createContext } from 'react';
import axios from 'axios';
import { message } from 'antd';

export const AuthContext = createContext();

class AuthContextProvider extends Component {
    initAuth = sessionStorage.getItem('auth') || null;
    state = {
        auth: JSON.parse(this.initAuth) || null,
        response: {
            status: null,
            message: null
        }
    }

    setAuthToken = (token) => {
        token ? axios.defaults.headers.common["Authorization"] = token : delete axios.defaults.headers.common["Authorization"]
    };


    handleInit = () => {
        axios.get(`${this.props.apiUrl}/`).then(() => {
            return
        }).catch(() => {
            return
        });
    }

    handleLogout = () => {
        sessionStorage.removeItem('auth');
        this.setState({ auth: null });
        this.feedback({ status: 'success', message: `You have logged out successfully!` });
        this.setAuthToken();
    }

    handleLogin = async (credentials) => {
        const { email, password } = credentials;
        let authToken;
        try {
            const res = await axios.post(`${this.props.apiUrl}/users/login`, { email, password });
            const { data, token } = res.data;
            authToken = token;
            this.setState({ auth: data.user });
            sessionStorage.setItem('auth', JSON.stringify(data.user));
            this.feedback({ status: 'success', message: `Hello, ${data.user.firstname}!` });
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
        }
        this.setAuthToken(authToken);
    }

    handleSignUp = async (credentials) => {
        const { email, password, firstname, lastname, role } = credentials;
        let authToken;
        try {
            const res = await axios.post(`${this.props.apiUrl}/users/signup`, { email, password, firstname, lastname, role });
            const { data, token } = res.data;
            authToken = token;
            this.setState({ auth: data.user });
            sessionStorage.setItem('auth', JSON.stringify(data.user));
            this.feedback({ status: 'success', message: `Hello, ${data.user.firstname}!` });
        } catch (error) {
            const { status, message } = error.response.data;
            this.feedback({ status, message });
        }
        this.setAuthToken(authToken);
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
            }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export default AuthContextProvider;