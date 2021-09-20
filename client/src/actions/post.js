import axios from 'axios';
import {ADD_POST, DELETE_POST, GET_POSTS, POST_ERROR, UPDATE_LIKE } from './constants';
import { setAlert } from '../actions/alert';


export const getPosts = () => async dispatch => {
    try {
        let res = await axios.get('/api/posts');
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { }
        })
    }
}


export const addLike = (postid) => async dispatch => {
    try {
        let res = await axios.get(`/api/posts/like/${postid}`);
        dispatch({
            type: UPDATE_LIKE,
            payload: {postid: postid, likes: res.data}
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { }
        })
    }
}

export const removeLike = (postid) => async dispatch => {
    try {
        let res = await axios.get(`/api/posts/unlike/${postid}`);
        dispatch({
            type: UPDATE_LIKE,
            payload: {postid: postid, likes: res.data}
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { }
        })
    }
}

export const deletePost = (postid) => async dispatch => {
    try {
        let res = await axios.delete(`/api/posts/${postid}`);
        dispatch({
            type: DELETE_POST,
            payload: postid
        })

        dispatch(setAlert('Post removed', 'success'))

    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { }
        })
    }
}

export const addPost = (formData) => async dispatch => {
    try {
        const config = {headers: {'Content-Type' : 'application/json'}};
        let res = await axios.post('/api/posts/', formData, config);
        dispatch({
            type: ADD_POST,
            payload: res.data
        })

        dispatch(setAlert('Post Created', 'success'))

    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { }
        })
    }
}