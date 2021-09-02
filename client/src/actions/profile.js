import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR } from './constants';

export const getUserProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload : res.data
        })

    } catch (err) {

        const errors = err.response.data.errors;
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: errors[0].msg}
        })
    }
}