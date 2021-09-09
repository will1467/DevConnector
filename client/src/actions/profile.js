import axios from 'axios';
import { setAlert } from './alert';
import { ACCOUNT_DELETED, CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, GET_PROFILES, GET_REPOS } from './constants';

export const getUserProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload : res.data
        })

    } catch (err) {

        const errors = err.response.data.errors;
        if(errors.length){
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: errors[0].msg}
            })
        }

    }
}

export const getProfiles = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile');

        dispatch({type: CLEAR_PROFILE});


        dispatch({
            type: GET_PROFILES,
            payload : res.data
        })

    } catch (err) {

        const errors = err.response.data.errors;
        if(errors.length){
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: errors[0].msg}
            })
        }

    }
}

export const getProfileByID = (userID) => async dispatch => {
   // try {
        const res = await axios.get(`/api/profile/user/${userID}`);

        dispatch({
            type: GET_PROFILE,
            payload : res.data
        })

    // } catch (err) {

    //     const errors = err.response.data.errors;
    //     if(errors.length){
    //         dispatch({
    //             type: PROFILE_ERROR,
    //             payload: { msg: errors[0].msg}
    //         })
    //     }

    // }
}

export const getGithubRepos = (githubusername) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/github/${githubusername}}`);

        dispatch({
            type: GET_REPOS,
            payload : res.data
        })

    } catch (err) {

        const errors = err.response.data.errors;
        if(errors.length){
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: errors[0].msg}
            })
        }

    }
}



export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {headers: {'Content-Type' : 'application/json'}};
        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload : res.data
        })

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        if(!edit){
            history.push('/dashboard');
        }

    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')) )
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: errors[0].msg}
        })


    }
}

export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {headers: {'Content-Type' : 'application/json'}};
        const res = await axios.put('/api/profile/experience', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload : res.data
        })

        dispatch(setAlert('Experience Added', 'success'));

        history.push('/dashboard');

    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')) )
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: errors[0].msg}
        })


    }
}

export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {headers: {'Content-Type' : 'application/json'}};
        const res = await axios.put('/api/profile/education', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload : res.data
        })

        dispatch(setAlert('Education Added', 'success'));

        history.push('/dashboard');

    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')) )
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: errors[0].msg}
        })


    }
}

export const deleteExperience = (ID) => async dispatch => {
   try {
        const res = await axios.delete(`/api/profile/experience/${ID}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload : res.data
        })

        dispatch(setAlert('Experience Removed', 'success'));

   } catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')) )
        }
    
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: errors[0].msg}
        })
    }
 
}

export const deleteEducation = (ID) => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${ID}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload : res.data
        })

        dispatch(setAlert('Education Removed', 'success'));

    }
    catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')) )
        }
    
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: errors[0].msg}
        })
    }
 
}

export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure? This cannot be undone.')){
        try {
            await axios.delete(`/api/profile`);
            dispatch({type: CLEAR_PROFILE});
            dispatch({type: ACCOUNT_DELETED});
    
            dispatch(setAlert('Your account has been permanantly deleted'));
    
        }
        catch(err){
            const errors = err.response.data.errors;
            if(errors){
                errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')) )
            }
        
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: errors[0].msg}
            })
        }
    }
    
 
}