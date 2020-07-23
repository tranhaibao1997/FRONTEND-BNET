import axios from 'axios'
import { GET_POSTS, POST_ERROR, ADD_POST, LIKE_POST, UNLIKE_POST, GET_POSTDETAIL, ADD_COMMENT, DELETE_POST, UPDATE_POST, DELETE_COMMENT, PROFILE_UPDATE } from './types'
import Axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//get posts
export const getPostsById = (id) => async dispatch => {
    try {
        const res = await axios.get(`https://bnet-backend.herokuapp.com/api/post/${id}`)
        console.log(res, "FROM ALL POST BY ID")
        dispatch({
            type: GET_POSTS,
            payload: res.data.data
        })

    } catch (err) {
        console.log(err)
            // dispatch({
            //     type: POST_ERROR,
            //     payload: { msg: err.response.data.mgs, status: err.response.status }
            // })
    }
}

//addd new post
export const addPost = post => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        console.log(post)
        const res = await axios.post('https://bnet-backend.herokuapp.com/api/post', post, config)
        console.log(res, "Hello from POST ACTIONNNNNNNN")
        dispatch({
            type: ADD_POST,
            payload: res.data.data
        })
        toast.success("POST IS CREATED !!!", {
                position: "top-center",
                autoClose: 3000,
            })
            // dispatch({
            //     type: PROFILE_UPDATE,
            // })
        return true

    } catch (err) {
        console.log(err)
        return false
            // dispatch({
            //     type: POST_ERROR,
            //     payload: { msg: err.response.data.mgs, status: err.response.status }
            // })
    }


}



//like post
export const likePost = (id) => async dispatch => {
    try {
        const res = await axios.put(`https://bnet-backend.herokuapp.com/api/post/like/${id}`)
        dispatch({
            type: LIKE_POST,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
            // dispatch({
            //     type: POST_ERROR,
            //     payload: { msg: err.response.data.mgs, status: err.response.status }
            // })

    }
}



//delete post
export const deletePost = (id) => async dispatch => {
    try {
        const res = await axios.delete(`https://bnet-backend.herokuapp.com/api/post/${id}`)
        dispatch({
            type: DELETE_POST,
            payload: id
        })
        toast.error("POST IS DELETED !!!", {
            position: "top-center",
            autoClose: 3000,
        })


    } catch (err) {
        console.log(err)
            // dispatch({
            //     type: POST_ERROR,
            //     payload: { msg: err.response.data.mgs, status: err.response.status }
            // })

    }
}

//get post detail
export const getPostDetail = id => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${id}`)
        dispatch({
            type: GET_POSTDETAIL,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.data.mgs, status: err.response.status }
        })

    }
}

//add new comment
export const addComment = (id, comment) => async dispatch => {
    console.log("CHAY ZO DAY ROI")
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.put(`https://bnet-backend.herokuapp.com/api/post/comment/${id}`, comment, config)
        console.log(res, "ACTION ADD COMMENT")
        dispatch({
            type: ADD_COMMENT,
            payload: res.data.data
        })

    } catch (err) {
        console.log(err)
            // dispatch({
            //     type: POST_ERROR,
            //     payload: { msg: err.response.data.mgs, status: err.response.status }
            // })
    }
}

//delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        const res = await axios.delete(`https://bnet-backend.herokuapp.com/api/post/comment/${postId}/${commentId}`)
        dispatch({
            type: DELETE_COMMENT,
            payload: res.data.data
        })

    } catch (err) {
        // dispatch({
        //     type: POST_ERROR,
        //     payload: { msg: err.response.data.msg, status: err.response.status }
        // })
    }

}

//update post

export const updatePost = (id, post) => async dispatch => {
    console.log(post)
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let res = await Axios.put(`https://bnet-backend.herokuapp.com/api/post/${id}`, post, config)
        console.log(res, "EDIT POST")
        dispatch({
            type: UPDATE_POST,
            payload: res.data.data
        })
        toast.success("POST IS UPDATED !!!", {
            position: "top-center",
            autoClose: "3000"
        })
        return true




    } catch (err) {
        console.log(err)
        return false
    }
}

//newfeed
export const getNewsFeed = () => async dispatch => {
    try {
        let res = await axios.get("https://bnet-backend.herokuapp.com/api/post/newsfeed")
        dispatch({
            type: GET_POSTS,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}