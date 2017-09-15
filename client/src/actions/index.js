import axios from 'axios'
import { browserHistory } from 'react-router'
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FEATURE_MESSAGE
 } from './types'

const ROOT_URL = 'http://localhost:4000'

export function signinUser({ email, password }) {
    // Use Redux Thunk to return a function and gain control over dispatch
    return function(dispatch) {
        // Submit email/password to server
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then((response) => {
                // If correct
                // - Update state to authenticated
                dispatch({ type: AUTH_USER })
                // - Save JWT
                localStorage.setItem('token', response.data.token)
                // - Redirect to /dashboard
                browserHistory.push('/feature')
            })
            .catch((error) => {
                // If incorrect
                // - Show error
                dispatch(authError(error.data.error))
            })
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function signoutUser() {
    localStorage.removeItem('token')

    return {
        type: UNAUTH_USER
    }
}

export function signupUser({ email, password }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, { email, password })
            .then((response) => {
                dispatch({ type: AUTH_USER })
                localStorage.setItem('token', response.data.token)
                browserHistory.push('/feature')
            })
            .catch((error) => dispatch(authError(error.data.error)))
    }
}

export function fetchMessage() {
    return function(dispatch) {

        axios.get(ROOT_URL, {
            headers: { authorization: localStorage.getItem('token') }
        })
            .then((response) => dispatch({
                type: FEATURE_MESSAGE,
                payload: response.data.message
            }))
            .catch((error) => {
                //dispatch FEATURE_ERROR
                console.log(error)
            })
    }
}