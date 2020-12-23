import {
    LOGIN_USER_FAILURE,
    LOGIN_USER_START,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_START,
    REGISTER_USER_SUCCESS
} from "../actions";

export const loginUserStart = (user, history) => ({
    type: LOGIN_USER_START,
    payload: { user, history }
});
export const loginUserSuccess = (jwt) => ({
    type: LOGIN_USER_SUCCESS,
    payload: { jwt }
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

export const logoutUser = (history) => ({
    type: LOGOUT_USER,
    payload: { history }
});

