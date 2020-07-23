import { GET_PROFILE, GET_PROFILES, PROFILE_ERROR, PROFILE_UPDATE, CLEAR_PROFILE, CREATE_PROFILE, ADD_FRIEND, CLEAR_PROFILES } from '../actions/types'

const initialState = {
    clientProfile: null,
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {},
    profilesLength: null

}

export default function(state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_PROFILE:
        case PROFILE_UPDATE:
        case CREATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,

            };
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload.data,
                profilesLength: payload.dataLength,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                profile: null
            };

        case CLEAR_PROFILE:
            return {...state, profile: null, repos: [], loading: false, error: {} }
        case CLEAR_PROFILES:
            return {...state, profiles: payload }
        default:
            return state;
    }
}