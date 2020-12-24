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
import instance from "../../helpers/instance";

// FETCH PROJECTS
const fetchProjectsAsync = async () => {
	return await instance.get("/api/projects")
		.then(response => ({ projects: response.data }))
		.catch(error => ({ errors: error.response.data.errors }));
};

function* fetchProjects() {
	try {
		let resp = yield call(fetchProjectsAsync);

		if (resp) {

			if (resp.projects)
				yield put(fetchProjectsSuccess(resp.projects));

			if (resp.errors)
				yield put(fetchProjectsFailure(resp.errors));
		}

	} catch (error) {
		const { errors } = error.response.data;
		yield put(fetchProjectsFailure(errors));
	}
}

export function* watchFetchProjectsStart() {
	yield takeEvery(FETCH_PROJECTS_START, fetchProjects);
}

// FETCH ONE PROJECT
const fetchProjectAsync = async (projectId) => {
	return await instance.get(`/api/projects/${projectId}`)
		.then(resp => ({ project: resp.data }))
		.catch(error => ({ errors: error.response.data.errors }));
};

function* fetchProject({ payload }) {
	const { projectId, history } = payload;
	try {
		let resp = yield call(fetchProjectAsync, projectId);

		if (resp) {
			if (resp.project)
				yield put(fetchProjectSuccess(resp.project));

			if (resp.errors) {
				yield put(fetchProjectFailure(resp.errors));
				history.push("/dashboard");
			}
		}

	} catch (error) { }
}

export function* watchFetchProjectStart() {
	yield takeEvery(FETCH_PROJECT_START, fetchProject);
}

// CREATE PROJECT
const createProjectAsync = async (project) => {
	return await instance.post("/api/projects", project)
		.then(() => ({ message: "project created successfully" }))
		.catch(err => ({ errors: err.response.data.errors }));
}

function* createProject({ payload }) {
	const { project, history } = payload;
	try {
		let resp = yield call(createProjectAsync, project);

		console.log(resp);

		if (resp) {

			if (resp.message) {
				yield put(createProjectSuccess(resp.message));
				history.push("/dashboard");
			}

			if (resp.errors) {
				yield put(createProjectFailure(resp.errors));
			}
		}
	} catch (error) { }
}

export function* watchCreateProjectStart() {
	yield takeEvery(CREATE_PROJECT_START, createProject);
}

// UPDATE PROJECT
const updateProjectAsync = async (project) => {
	return await instance.put("/api/projects", project)
		.then(resp => ({ message: "project updated successfully" }))
		.catch(err => ({ errors: err.response.data.errors }));
};

function* updateProject({ payload }) {
	const { project, history } = payload;
	try {

		let resp = yield call(updateProjectAsync, project);

		if (resp) {
			if (resp.message) {
				yield put(updateProjectSuccess(resp.message));
				history.push("/dashboard");
			}	

			if (resp.errors) {
				yield put(updateProjectFailure(resp.errors));
			}
		}

	} catch (err) { }
}

export function* watchUpdateProjectStart() {
	yield takeEvery(UPDATE_PROJECT_START, updateProject);
}

// DEELTE PROJECT
function* deleteProject({ payload }) {
	const { projectId } = payload;
	try {
		let resp = yield call(async (projectId) => {
			return await instance.delete(`/api/projects/${projectId}`)
				.then(resp => ({ message: "project deleted successfully" }))
				.catch(err => ({ errors: err.response.data.errors }));
		}, projectId);

		if (resp) {
			if (resp.message) {
				yield put(deleteProjectSuccess(projectId));
			}

			if (resp.errors) {
				yield put(deleteProjectFailure(resp.errors));
			}
		}
	} catch (error) { }
}

export function* watchDeleteProjectStart() {
	yield takeEvery(DELETE_PROJECT_START, deleteProject);
}

export default function* rootSaga() {
	yield all([
		fork(watchFetchProjectsStart),
		fork(watchFetchProjectStart),
		fork(watchCreateProjectStart),
		fork(watchUpdateProjectStart),
		fork(watchDeleteProjectStart),
	]);
}