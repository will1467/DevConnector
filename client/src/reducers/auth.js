import { REGISTER_FAIL, REGISTER_SUCCESS, 
    USER_LOADED, AUTH_ERROR,
    LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE, ACCOUNT_DELETED } from '../actions/constants';
const initialState = {
    token : localStorage.getItem('token'),
    isAuthenticated : null,
    loading : true,
    user: null
};


const authReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type){
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state, ...payload, isAuthenticated : true, loading: false
            };
        case ACCOUNT_DELETED:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state, token: null, isAuthenticated : false, loading: false
            }
        case USER_LOADED:
                return {
                    ...state, isAuthenticated : true, loading: false, user: payload
                }
        default:
            return state;
    }
}

export default authReducer;