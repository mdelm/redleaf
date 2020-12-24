import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
    LOGIN_USER_START,
    LOGOUT_USER,
    REGISTER_USER_START,
    SET_CURRENT_USER_START,
} from "../actions";
import {
    loginUserSuccess,
    loginUserFailure,
    registerUserSuccess,
    registerUserFailure,
    setCurrentUserSuccess,
    setCurrentUserFailure
} from "./actions";
import instance from "../../helpers/instance";

/* LOGIN USER START */
const authenticate = async (username, password) => {
    return await instance
        .post("api/authenticate", { username, password })
        .then(resp => {
            localStorage.setItem("jwt", resp.data.jwt);
            instance.defaults.headers.common["Authorization"] = "Bearer " + resp.data.jwt;

            return resp.data;
        })
        .catch(error => ({ errors: error.response.data.errors }));
};

const getLogedUser = async () => {
    return await instance.get("api/profile").then(resp => resp.data);
};

function* loginWidthEmailAndPassword({ payload }) {
    const { email, password } = payload.user;
    const { history } = payload;
    var resp = null;
    try {
        resp = yield call(authenticate, email, password);
        if (resp) {

            if (resp.jwt) {
                const logedUserResponse = yield call(getLogedUser);
                yield put(loginUserSuccess(logedUserResponse));
                history.push("/dashboard");
            }

            if (resp.errors) {
                console.log(resp.errors);
                yield put(loginUserFailure(resp.errors));
            }

        }
    } catch (error) { }
}

export function* watchLoginUserStart() {
    yield takeEvery(LOGIN_USER_START, loginWidthEmailAndPassword);
}
/* LOGIN USER END */


/* LOGOUT USER START */
function logout() {
    localStorage.removeItem("jwt");
    delete instance.defaults.headers.common["Authorization"];
    window.location.href = "/";
}

export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}
/* LOGOUT USER END */

/* REGISTER USER START */

const registerUserAsync = async (user) => {
    return await instance.post("/api/register", user)
        .catch(error => ({ errors: error.response.data.errors }));
};

function* registerUser({ payload }) {
    const { user, history } = payload;
    var resp = null
    try {
        resp = yield call(registerUserAsync, user);

        if (resp && resp.errors) {
            yield put(registerUserFailure(resp.errors));
            return;
        }

        yield put(registerUserSuccess(""));
        history.push("/login");

    } catch (error) {
        if (error.response.data) {
            yield put(registerUserFailure(error.response.data.errors));
        }
    }
}

export function* watchRegisterUserStart() {
    yield takeEvery(REGISTER_USER_START, registerUser);
}
/* REGISTER USER END */

// SET CURRENT USER
const setCurrentUserAsync = async () => {
    return await instance.get("api/profile")
        .then(resp => ({ user: resp.data }))
        .catch(err => ({ errors: err.response.data.errors }));
};

function* setCurrentUser() {
    if (localStorage.getItem("jwt")) {
        try {
            instance.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt");
            let resp = yield call(setCurrentUserAsync);

            // console.log(resp.user);

            if (resp && resp.user) {
                yield put(setCurrentUserSuccess(resp.user));
            }

            if (resp && resp.errors) {
                yield put(setCurrentUserFailure());
                delete instance.defaults.headers.common["Authorization"];
            }

        } catch (err) { }
    } else {
        delete instance.defaults.headers.common["Authorization"];
    }
}

export function* watchSetCurrentUserStart() {
    yield takeEvery(SET_CURRENT_USER_START, setCurrentUser);
}

export default function* rootSaga() {
    yield all([
        fork(watchLoginUserStart),
        fork(watchLogoutUser),
        fork(watchRegisterUserStart),
        fork(watchSetCurrentUserStart),
    ]);
}