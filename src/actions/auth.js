import { REGISTER_SUCCESS, REGISTER_FAIL, AUTH_ERROR, USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL, LOG_OUT, CLEAR_PROFILE, LOGIN_BY_OATH } from './types'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//Register User
export const register = (firstName, lastName, email, password, dayOfBirth, gender) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }
    const body = JSON.stringify({ firstName, lastName, email, password, dayOfBirth, gender });
    try {
        const res = await axios.post("https://bnet-backend.herokuapp.com/api/users/register", body, config)
        console.log(res.data.data, "this is data from register")
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data.data
        })
        dispatch(loadUser())

    } catch (err) {

        // const errors = err.response.data.errors
        toast.error(`${err.message}`, {
                position: "top-center",
                autoClose: "3000"
            })
            // if (errors) {
            //    console.log(errors)
            // }
        dispatch({
            type: REGISTER_FAIL
        })

    }
}

//load user
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get("https://bnet-backend.herokuapp.com/api/auth/me");
        console.log(res, "from loadUser")
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

//login

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }
    const body = JSON.stringify({ email, password });
    try {
        const res = await axios.post("https://bnet-backend.herokuapp.com/api/auth/login", body, config)
        console.log(res, "THIS IS FROM LOGIN ACTION")
        await dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.data
        })

        dispatch(loadUser())



    } catch (err) {

        // const errors = err.response.data.errors
        console.log(err.response.data.message)
        toast.error(`${err.response.data.message}`, {
                position: "top-center",
                autoClose: "3000"
            })
            // if (errors) {
            //     console.log(errors)
            // }
        dispatch({
            type: LOGIN_FAIL
        })

    }
}



//login by Facebook

export const loginFacebook = (token) => async dispatch => {
        console.log(token, "from action")
        try {
            await dispatch({
                type: LOGIN_BY_OATH,
                payload: token
            })


            dispatch(loadUser())



        } catch (err) {

            // const errors = err.response.data.errors
            console.log(err)
                // if (errors) {
                //     console.log(errors)
                // }
            dispatch({
                type: LOGIN_FAIL
            })

        }
    }
    //Log out /Clear profile
export const logout = () => async dispatch => {
    try {
        let res = await axios.get(`https://bnet-backend.herokuapp.com/api/auth/logout?token=${localStorage.getItem("token")}`)
        dispatch({ type: LOG_OUT })
        dispatch({ type: CLEAR_PROFILE })
    } catch (err) {

    }

}