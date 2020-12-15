import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { 
	CREATE_PROJECT_START,
	CREATE_PROJECT_SUCCESS,
	CREATE_PROJECT_FAILURE
} from "../actions";
import {
	createProjectSuccess,
	createProjectFailure
} from "./actions";
import axios from "axios";

function* createProjectStartAsync({ payload }) {
	try {
		yield axios.post("http://localhost:8080/api/projects", payload.project);
		yield put(createProjectSuccess(payload.history));
	} catch (error) {
		const { errors } = error.response.data;
		yield put(createProjectFailure(errors));
	}
}

export function* watchCreateProjectStart() {
	yield takeEvery(CREATE_PROJECT_START, createProjectStartAsync);
}

export default function* rootSaga() {
	yield all([
		fork(watchCreateProjectStart)
	]);
}