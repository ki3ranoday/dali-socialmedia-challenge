import { usersRef, postsRef } from '../firebase'

export const FETCH_USERS = 'FETCH_USERS'
export const FETCH_POSTS = 'FETCH_POSTS'

export const CHANGE_CREATE_STATE = 'CHANGE_CREATE_STATE'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

//the fetch functions will automatically update the app whenever the database changes
export const fetchPosts = () => async dispatch => {
    postsRef.on("value", snapshot => {
        dispatch({
            type: FETCH_POSTS,
            payload: snapshot.val()
        });
    });
}

export const fetchUsers = () => async dispatch => {
    usersRef.on("value", snapshot => {
        dispatch({
            type: FETCH_USERS,
            payload: snapshot.val()
        });
    });
};

export const createPost = (post) => async dispatch => {
    postsRef.push(post)
}

export const comment = (postId, comment) => async dispatch => {
    postsRef.child(postId).child("comments").push(comment) //needs to be an object with the postid/'comments' and then the list of comments including the new one
}

//changes the state of the current user to creating:true (which will bring up the create user form)
export const startCreateUser = () => async dispatch => {
    return dispatch({
        type: CHANGE_CREATE_STATE,
        payload: true
    })
}
//cancles user creation in the middle of making one
export const cancleCreateUser = () => async dispatch => {
    return dispatch({
        type: CHANGE_CREATE_STATE,
        payload: false
    })
}

export const createUser = (user) => async dispatch => {
    const newUserRef = usersRef.push(user)
    return dispatch({
        type: LOGIN,
        payload: newUserRef.key
    })
}

export const login = (username) => async dispatch => {
    return dispatch({
        type: LOGIN,
        payload: username
    })
}

export const logout = () => async dispatch => {
    return dispatch({
        type: LOGOUT,
        payload: false
    })
}

