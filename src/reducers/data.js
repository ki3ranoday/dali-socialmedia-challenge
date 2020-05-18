import { FETCH_USERS, FETCH_POSTS, LOGIN, LOGOUT, CHANGE_CREATE_STATE } from "../actions"

const initialUser = {
    loggedIn: false,
    creating: false,
    user: null
}
const initialState = {
    users: [],
    posts: [],
    current_user: {
        ...initialUser
    }
}


export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return {
                ...state,
                users: action.payload
            }
        case FETCH_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        case LOGIN:
            return {
                ...state,
                current_user: {
                    loggedIn: true,
                    user: action.payload
                }
            }
        case LOGOUT:
            return {
                ...state,
                current_user: {
                    ...initialUser
                }
            }
        case CHANGE_CREATE_STATE: 
            return {
                ...state,
                current_user: {
                    ...state.current_user, 
                    creating: action.payload
                }
            }
        default:
            return state
    }
}