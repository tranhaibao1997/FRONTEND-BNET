import { GET_PROFILE, GET_PROFILES, PROFILE_ERROR, PROFILE_UPDATE, CREATE_PROFILE, ADD_TO_FRIEND_REQUEST, UPDATE_POST, ADD_FRIEND, CLEAR_PROFILES, UPDATE_ACCOUNT } from '../actions/types'
import axios from 'axios'
import { loadUser } from './auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const createEmptyProfile = () => async(dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const body = {}
    try {
        let res = await axios.post("https://bnet-backend.herokuapp.com/api/profile/createProfile")
        dispatch({
            type: "CREATE_PROFILE",
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}
export const getAllProfiles = (minAge = 0, maxAge = 100, gender = null, page = 1) => async(dispatch) => {

    try {
        let res = await axios.get(`https://bnet-backend.herokuapp.com/api/profile/getProfiles?minAge=${minAge}&maxAge=${maxAge}&page=${page}&gender=${gender}`)
        console.log(res, "ALL PROFILE IS HERE")
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const updatePersonal = (formData) => async(dispatch) => {
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }
    const body = JSON.stringify(formData);
    try {
        let res = await axios.post("https://bnet-backend.herokuapp.com/api/profile/updatePersonal", body, config)
        dispatch({
            type: PROFILE_UPDATE,
            payload: res.data.data
        })
        toast.success("PROFILE IS UPDATED !!!", {
            position: "top-center",
            autoClose: "3000"
        })


    } catch (err) {
        console.log(err)
    }
}


export const getCurrentProfile = () => async dispatch => {
    try {
        let token = localStorage.getItem("token")
        let config = {
            headers: {
                "Authorization": token
            }
        }
        let res = await axios.get("https://bnet-backend.herokuapp.com/api/profile/me", config)
        console.log(res, "CURRENT PROFILE")
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        console.log(err)
    }

}

//get profile by id
export const getProfileById = (userId) => async dispatch => {
    try {
        const res = await axios.get(`https://bnet-backend.herokuapp.com/api/profile/${userId}`)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        console.log(res.data, "FROM PROFILE BY IDDDDDDDDDDD")
    } catch (err) {
        console.log(err)
            // dispatch({
            //     type: PROFILE_ERROR,
            //     payload: { msg: err.response.data.mgs, status: err.response.status }
            // })

    }
}

export const updateHobbies = (formData) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const body = JSON.stringify(formData)
    console.log(body)
    try {
        let res = await axios.post("https://bnet-backend.herokuapp.com/api/profile/updateHobbies", body, config)
        dispatch({
            type: PROFILE_UPDATE,
            payload: res.data.data
        })
        toast.success("PROFILE IS UPDATED !!!", {
            position: "top-center",
            autoClose: "3000"
        })
    } catch (err) {
        console.log(err)
    }
}


export const updateAccount = (formData) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const body = JSON.stringify(formData)
    console.log(body)
    try {
        let res = await axios.post("https://bnet-backend.herokuapp.com/api/profile/updateAccount", body, config)
        await dispatch({
            type: PROFILE_UPDATE,
            payload: res.data.data
        })
        toast.success("ACCOUNT IS UPDATED !!!", {
            position: "top-center",
            autoClose: "3000"
        })
        await dispatch(loadUser())
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}



export const createEducation = (formData, history) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const body = JSON.stringify(formData)
    try {
        let res = await axios.post("https://bnet-backend.herokuapp.com/api/profile/createEducation", body, config)
        dispatch({
            type: PROFILE_UPDATE,
            payload: res.data.data
        })
        toast.success("EDUCATION IS UPDATED !!!", {
            position: "top-center",
            autoClose: "3000"
        })
        history.push("/dashboard/carrier")

    } catch (err) {
        console.log(err)
    }
}


export const deleteEducation = (id) => async dispatch => {

    try {
        let res = await axios.delete(`https://bnet-backend.herokuapp.com/api/profile/deleteEducation/${id}`)

        dispatch({
            type: PROFILE_UPDATE,
            payload: res.data.data
        })
        toast.error("EDUCATION IS DELETED !!!", {
            position: "top-center",
            autoClose: "3000"
        })


    } catch (err) {
        console.log(err)
    }
}


export const createExperience = (formData, history) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const body = JSON.stringify(formData)
    try {
        let res = await axios.post("https://bnet-backend.herokuapp.com/api/profile/createExperience", body, config)
        dispatch({
            type: PROFILE_UPDATE,
            payload: res.data.data
        })
        toast.success("EXPERIENCE IS UPDATED !!!", {
            position: "top-center",
            autoClose: "3000"
        })
        history.push("/dashboard/carrier")

    } catch (err) {
        console.log(err)
    }
}


export const deleteExperience = (id) => async dispatch => {

    try {
        let res = await axios.delete(`https://bnet-backend.herokuapp.com/api/profile/deleteExperience/${id}`)

        dispatch({
            type: PROFILE_UPDATE,
            payload: res.data.data
        })
        toast.error("EXPERIENCE IS DELETED !!!", {
            position: "top-center",
            autoClose: "3000"
        })


    } catch (err) {
        console.log(err)
    }
}

//add To Request List
export const addToFriendRequest = id => async dispatch => {
        console.log("zo dayyyy")
        try {
            // dispatch({
            //     type: ADD_FRIEND,
            //     payload: id
            // })
            let res = await axios.post(`https://bnet-backend.herokuapp.com/api/profile/friendRequest/${id}`)
            console.log(res)
            dispatch({
                type: PROFILE_UPDATE,
                payload: res.data.data
            })
            toast.success("SENT A FRIEND REQUEST !!!", {
                position: "top-center",
                autoClose: "3000"
            })

        } catch (err) {
            console.log(err)
        }
    }
    //delete From Request List
export const deleteFriendRequest = (id, target) => async dispatch => {
    try {
        let res = await axios.delete(`https://bnet-backend.herokuapp.com/api/profile/friendRequest/${id}?target=${target}`)
        console.log(res)
        dispatch({
            type: PROFILE_UPDATE,
            payload: res.data.data
        })

    } catch (err) {
        console.log(err)
    }
}

export const deleteFriendRequestPending = (id, target) => async dispatch => {
    try {
        let res = await axios.delete(`https://bnet-backend.herokuapp.com/api/profile/friendRequestPending/${id}?target=${target}`)
        console.log(res)
        dispatch({
            type: PROFILE_UPDATE,
            payload: res.data.data
        })

    } catch (err) {
        console.log(err)
    }
}



//add to FriendList

export const acceptFriendRequest = (id, target) => async dispatch => {

    try {
        let res = await axios.post(`https://bnet-backend.herokuapp.com/api/profile/acceptFriendRequest/${id}?target=${target}`)
        console.log(res)
        dispatch({
            type: PROFILE_UPDATE,
            payload: res.data.data
        })
        toast.success("BOTH OF YOU ARE FRIEND NOW !!!", {
            position: "top-center",
            autoClose: "3000"
        })
    } catch (err) {
        console.log(err)
    }
}

//unfriend

export const unFriend = id => async dispatch => {

    try {
        let res = await axios.post(`https://bnet-backend.herokuapp.com/api/profile/unfriend/${id}`)
        console.log(res)
        dispatch({
            type: PROFILE_UPDATE,
            payload: res.data.data
        })
        toast.error("YOU REMOVED A FRIEND !!!", {
            position: "top-center",
            autoClose: "3000"
        })
    } catch (err) {
        console.log(err)
    }
}

export const getLocation = (longtitude, latitude) => async dispatch => {
    try {
        let response = await axios.get(
            `https://bnet-backend.herokuapp.com/api/profile/getLocation?longtitude=${longtitude}&latitude=${latitude}`
        );
        let data = await response.data;
        dispatch({
            type: UPDATE_ACCOUNT,
            payload: response.data.data
        })
        toast.success("UPDATED LOCATION !!!", {
            position: "top-center",
            autoClose: "3000"
        })

        console.log(data);
    } catch (err) {
        console.log(err);
    }
}


export const clearProfiles = () => async dispatch => {
    try {
        dispatch({
            type: CLEAR_PROFILES,
            payload: []
        })
    } catch (err) {

    }
}