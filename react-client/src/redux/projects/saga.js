import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { 
	CREATE_PROJECT_START,
	FETCH_PROJECTS_START,
	FETCH_PROJECTS_SUCCESS,
	FETCH_PROJECTS_FAILURE
} from "../actions";
import {
	createProjectSuccess,
	createProjectFailure,
	fetchProjectsSuccess,
	fetchProjectsFailure
} from "./actions";
import axios from "axios";

function* createProjectStartAsync({ payload : { project, history } }) {

	try {
		yield axios.post("http://localhost:8080/api/projects", project);
		yield put(createProjectSuccess(history));
		history.push("/dashboard");
	} catch (error) {
		const { errors } = error.response.data;
		yield put(createProjectFailure(errors));
	}
}

function* fetchProjectsStartAsync() {
	try {
		const projects = yield axios.get("http://localhost:8080/api/projects").then(response => response.data);
		yield put(fetchProjectsSuccess(projects));
	} catch (error) {
		const { errors } = error.response.data;
		yield put(fetchProjectsFailure(errors));
	}
}

export function* watchCreateProjectStart() {
	yield takeEvery(CREATE_PROJECT_START, createProjectStartAsync);
}

export function* watchFetchProjectsStart() {
	yield takeEvery(FETCH_PROJECTS_START, fetchProjectsStartAsync);
}

export default function* rootSaga() {
	yield all([
		fork(watchCreateProjectStart),
		fork(watchFetchProjectsStart)
	]);
}