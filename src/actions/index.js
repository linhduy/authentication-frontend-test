import * as types from '../constants/ActionTypes';
import { doesNotReject } from 'assert';
const axios = require('axios');
axios.defaults.withCredentials = true;
const backendURL = "https://authenticate-backend-test.herokuapp.com";

const checkAuth = (response) => {
    return (response && response.status && response.status == 200)
}
export function loginAction(loginInfo) {
    return function action(dispatch) {
        const request = axios(backendURL + '/login', {
            method: 'post',
            data: {
                userid: loginInfo.userid,
                password: loginInfo.password
            },
            withCredentials: true
        });
        return request.then(
            function(response) {
                dispatch({
                    type: types.LOGIN,
                    data: response.data,
                    authenticated: checkAuth(response)
                })
            },
            function(err) {
                dispatch({
                    type: types.AUTH_FAIL,
                    data: {},
                    authenticated: false
                })
            },
          );
    }
}

export function logoutAction(loginInfo) {
    return function action(dispatch) {
        const request = axios(backendURL + '/logout', {
            method: 'get',
            withCredentials: true
        });
        return request.then(
            function(response) {
                dispatch({
                    type: types.LOGOUT,
                    data: response.data,
                    authenticated: false
                })
            },
            function(err) {
                dispatch({
                    type: types.AUTH_FAIL,
                    data: {},
                    authenticated: false
                })
            },
          );
    }
}

export function fetchProfile() {
    return function action(dispatch) {
        const request = axios.get(backendURL + '/profile');
        return request.then(
            function(response) {
                dispatch({
                    type: types.PROFILE,
                    payload: response,
                    authenticated: checkAuth(response)
                })
            },
            function(err) {
                dispatch({
                    type: types.AUTH_FAIL,
                    payload: {},
                    authenticated: false
                })
            },
          );
    }
}

export function fetchComments(id) {
    return function action(dispatch) {
        const request = axios.get(backendURL + '/comment/writer/' + id);
        return request.then(
            function(response) {
                dispatch({
                    type: types.COMMENTS_FETCH,
                    data: response.data,
                    authenticated: checkAuth(response)
                })
            },
            function(err) {
                dispatch({
                    type: types.AUTH_FAIL,
                    data: []
                })
            },
          );
    }
}
export function fetchCommentById(id) {
    return function action(dispatch) {
        const request = axios.get(backendURL + '/comment/' + id);
        return request.then(
            function(response) {
                dispatch({
                    type: types.COMMENTS_FETCH_BY_ID,
                    data: response.data,
                    authenticated: checkAuth(response)
                })
            },
            function(err) {
                dispatch({
                    type: types.AUTH_FAIL,
                    data: []
                })
            },
          );
    }
}

export function addComment(commentInfo) {
    return function action(dispatch) {
        const request = axios(backendURL + '/comment', {
            method: 'post',
            data: {
                email: commentInfo.email,
                writer: commentInfo.writer,
                title: commentInfo.title,
                content: commentInfo.content
            },
            withCredentials: true
        });
        return request.then(
            function(response) {
                dispatch({
                    type: types.COMMENT_ADD,
                    data: response.data,
                    authenticated: checkAuth(response)
                })
            },
            function(err) {
                dispatch({
                    type: types.AUTH_FAIL,
                    data: []
                })
            },
          );
    }
}

export function updateComment(commentInfo) {
    return function action(dispatch) {
        const request = axios(backendURL + '/comment/' + commentInfo._id, {
            method: 'put',
            data: commentInfo,
            withCredentials: true
        });
        return request.then(
            function(response) {
                dispatch({
                    type: types.COMMENT_UPDATE,
                    data: response.data,
                    authenticated: checkAuth(response)
                })
            },
            function(err) {
                dispatch({
                    type: types.AUTH_FAIL,
                    data: []
                })
            },
          );
    }
}

export function deleteComment(commentInfo) {
    return function action(dispatch) {
        const request = axios(backendURL + '/comment/' + commentInfo._id, {
            method: 'delete',
            withCredentials: true
        });
        return request.then(
            function(response) {
                dispatch({
                    type: types.COMMENT_DELETE,
                    data: response.data,
                    authenticated: checkAuth(response)
                })
            },
            function(err) {
                dispatch({
                    type: types.AUTH_FAIL,
                    data: []
                })
            },
          );
    }
}