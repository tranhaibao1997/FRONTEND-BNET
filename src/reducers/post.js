import { GET_POSTS, POST_ERROR, ADD_POST, LIKE_POST, UNLIKE_POST, GET_POSTDETAIL, ADD_COMMENT, DELETE_POST, UPDATE_POST, DELETE_COMMENT } from '../actions/types'
const initialState = {
    posts: [],
    post: null,
    loading: true,
    errors: []
}

export default function(state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false

            }
        case POST_ERROR:
            return {
                ...state,
                errors: payload
            }
        case ADD_POST:

            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false
            }
        case LIKE_POST:
            return {
                ...state,
                posts: state.posts.map(post =>
                    post._id === payload._id ? {...post, likes: payload.likes } : post),
                loading: false
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload)
            }
        case GET_POSTDETAIL:
            {
                return {
                    ...state,
                    post: payload,
                    loading: false
                }
            }
        case ADD_COMMENT:
            {
                return {
                    ...state,
                    posts: state.posts.map(post => post._id == payload._id ? {...post, comments: payload.comments } : post),
                    loading: false
                }
            }
        case DELETE_COMMENT:
            {
                return {
                    ...state,
                    posts: state.posts.map(post => post._id == payload._id ? {...post, comments: payload.comments } : post)
                }
            }
        case UPDATE_POST:
            {
                return {
                    ...state,
                    posts: state.posts.map(post => post._id === payload._id ? {...post, postImg: payload.postImg, text: payload.text, peopleTag: payload.peopleTag, checkIn: payload.checkIn } : post)
                }
            }
        default:
            return state
    }
}