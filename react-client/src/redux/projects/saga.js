import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { 
	CREATE_PROJECT_START,
	FETCH_PROJECTS_START,
	FETCH_PROJECT_START,
	UPDATE_PROJECT_START,
	DELETE_PROJECT_START,
} from "../actions";
import {
	createProjectSuccess,
	createProjectFailure,
	fetchProjectsSuccess,
	fetchProjectsFailure,
	fetchProjectSuccess,
	fetchProjectFailure,
	updateProjectSuccess,
	updateProjectFailure,
	deleteProjectSuccess,
	deleteProjectFailure
} from "./actions";
import axios from "axios";

function* createProjectStartAsync({ payload : { project, history } }) {

	try {
		yield axios.post("http://localhost:8080/api/projects", project);
		yield put(createProjectSuccess("Project created successfully"));
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

function* fetchProjectStartAsync({ payload: {projectId, history} }) {
	try {
		const project = yield axios.get(`http://localhost:8080/api/projects/${projectId}`).then(response => response.data);
		yield put(fetchProjectSuccess(project));
	} catch(error) {
		history.push("/dashboard");
	}
}

function* updateProjectStartAsync({ payload: { project, history }}) {
	try {
		yield axios.put(`http://localhost:8080/api/projects`, project);
		yield put(updateProjectSuccess("Project updated successfully"));
		history.push("/dashboard");
	} catch (error) {
		const { errors } = error.response.data;
		yield put(updateProjectFailure(errors));
	}
}

function* deleteProjectStartAsync({ payload: { projectId }}) {
	try {
		yield axios.delete(`http://localhost:8080/api/projects/${projectId}`);
		yield put(deleteProjectSuccess(projectId));
	} catch (error) {
		console.log(error);
		if (error.response) {
			const { errors } = error.response.data;
			yield put(deleteProjectFailure(errors));
		}
	}
}

export function* watchDeleteProjectStart() {
	yield takeEvery(DELETE_PROJECT_START, deleteProjectStartAsync);
}

export function* watchUpdateProjectStart() {
	yield takeEvery(UPDATE_PROJECT_START, updateProjectStartAsync);
}

export function* watchFetchProjectStart() {
	yield takeEvery(FETCH_PROJECT_START, fetchProjectStartAsync);
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
		fork(watchFetchProjectsStart),
		fork(watchFetchProjectStart),
		fork(watchUpdateProjectStart),
		fork(watchDeleteProjectStart)
	]);
}