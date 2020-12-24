import {
    LOGIN_USER_FAILURE,
    LOGIN_USER_START,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_START,
    REGISTER_USER_SUCCESS,
    SET_CURRENT_USER_START,
    SET_CURRENT_USER_SUCCESS,
    SET_CURRENT_USER_FAILURE
} from "../actions";

export const loginUserStart = (user, history) => ({
    type: LOGIN_USER_START,
    payload: { user, history }
});
export const loginUserSuccess = (user) => ({
    type: LOGIN_USER_SUCCESS,
    payload: { user }
});
export const loginUserFailure = (errors) => ({
    type: LOGIN_USER_FAILURE,
    payload: { errors }
});

export const registerUserStart = (user, history) => ({
    type: REGISTER_USER_START,
    payload: { user, history }
});
export const registerUserSuccess = (message) => ({
    type: REGISTER_USER_SUCCESS,
    payload: {message}
});
export const registerUserFailure = (errors) => ({
    type: REGISTER_USER_FAILURE,
    payload: { errors }
});

export const setCurrentUserStart = () => ({
    type: SET_CURRENT_USER_START,
    payload: { }
});

export const setCurrentUserSuccess = (user) => ({
    type: SET_CURRENT_USER_SUCCESS,
    payload: { user }
});

export const setCurrentUserFailure = () => ({
    type: SET_CURRENT_USER_FAILURE,
    payload: { }
});

export const logoutUser = () => ({
    type: LOGOUT_USER,
    payload: { }
});

