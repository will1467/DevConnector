import { POST_ERROR, GET_POSTS, UPDATE_LIKE, DELETE_POST, ADD_POST } from '../actions/constants';
const initialState = {
    posts : [],
    post : null,
    loading : true,
    error : {}
}


const postReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type){
        case GET_POSTS:
            return {...state, posts : payload, loading: false};
        case POST_ERROR:
            return {...state, error : payload, loading: false};
        case UPDATE_LIKE:
            const returnedPosts = state.posts.map((post) => {
                return post._id === payload.postid ? {...post, likes: payload.likes} : post
            });
            return {...state, posts: returnedPosts, loading: false }
        case DELETE_POST:
            return {...state, posts: state.posts.filter((post) => post._id !== payload)}
        case ADD_POST:
            return {...state, posts: [...state.posts, payload ], loading: false }
        default:
            return state;
        
    }
}

export default postReducer;