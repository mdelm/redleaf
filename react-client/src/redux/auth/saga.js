import axios from "axios";
import { all, fork, put, takeEvery } from "redux-saga/effects";
import { 
    LOGIN_USER_START, 
    LOGIN_USER_SUCCESS, 
    LOGOUT_USER, 
    REGISTER_USER_START
} from "../actions";
import { loginUserFailure, loginUserSuccess, registerUserFailure } from "./actions";

function* loginWithEmailPasswordAsync({ payload }) {
    const { user, history } = payload;
    try {
        const loginUser = yield axios.post("http://localhost:8080/api/users/authenticate", user).then(response => response.data);
        localStorage.setItem("jwt", loginUser.jwt);
        yield put(loginUserSuccess(loginUser.jwt));
        history.push("/dashboard");
    } catch (error) {
        if (error.response.data) {
            const { errors } = error.response.data;
            yield put(loginUserFailure( errors ));
        }
    }
}

function* registerUserStartAsyc({ payload }) {
    const { user, history } = payload;
    try {
        yield axios.post("http://localhost:8080/api/users/register", user);
        history.push("/login");
    } catch (error) {
        if (error.response.data) {
            const { errors } = error.response.data;
            yield put(registerUserFailure(errors));
        }
    }
}

function logout({ payload: { history } }) {
    localStorage.removeItem("jwt");
    // delete axios.defaults.headers.common["Authorization"];
    history.push("/");
}

export function* watchLogout() {
    yield takeEvery(LOGOUT_USER, logout);
}

export function* watchLoginUserStart() {
    yield takeEvery(LOGIN_USER_START, loginWithEmailPasswordAsync);
}

export function* watchRegisterUserStart() {
    yield takeEvery(REGISTER_USER_START, registerUserStartAsyc);
}

export default function* rootSaga() {
	yield all([
        fork(watchLoginUserStart),
        fork(watchRegisterUserStart),
        fork(watchLogout)
	]);
}