import axios from 'axios';
import { REGISTER_FAIL, REGISTER_SUCCESS, 
         USER_LOADED, AUTH_ERROR,
         LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './constants';
import { setAlert } from '../actions/alert';
import setAuthToken from '../utils/setAuthToken';


export const loadUser = () => async dispatch => {
    if(localStorage.getItem('token')){
        setAuthToken(localStorage.getItem('token'));
    }

    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type : USER_LOADED,
            payload : res.data
        })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })

        const errors = error.response.data.err;
        if(errors){
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')) )
        }
    }
}

export const register = (newUser) => async dispatch => {

    try {
        const config = { headers: { 'Content-Type': 'Application/json'  } }
        const body = JSON.stringify(newUser);

        const res = await axios.post('/api/users', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser());


    } catch(err){
        const errors = err.response.data.err;
        if(errors){
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')) )
        }

        dispatch({
            type: REGISTER_FAIL
        })
        
    }
}

export const login = (email, password) => async dispatch => {

    try {
        const config = { headers: { 'Content-Type': 'Application/json'  } }
        const body = JSON.stringify({ email, password});

        const res = await axios.post('/api/auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser());

    } catch(err){
        const errors = err.response.data.err;
        if(errors){
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')) )
        }

        dispatch({
            type: LOGIN_FAIL
        })
        
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}