import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
	FETCH_TASKS_START,
	FETCH_TASK_START,
	CREATE_TASK_START,
	UPDATE_TASK_START,
	DELETE_TASK_START
} from "../actions";
import {
	fetchTasksSuccess,
	fetchTasksFailure,
	fetchTaskSuccess,
	fetchTaskFailure,
	updateTaskSuccess,
	updateTaskFailure,
	deleteTaskSuccess,
	deleteTaskFailure,
	createTaskSuccess,
	createTaskFailure
} from "./actions";
import instance from "../../helpers/instance";

// FETCH TASK
const fetchTasksAsync = async (projectId) => {
	return await instance.get(`/api/projects/${projectId}/tasks`)
		.then(resp => ({ tasks: resp.data }))
		.catch(err => ({ errors: err.response.data.errors }));
};

function* fetchTasks({ payload }) {
	const { projectId } = payload;
	try {
		let resp = yield call(fetchTasksAsync, projectId);
		if (resp) {
			if (resp.tasks) {
				yield put(fetchTasksSuccess(resp.tasks));
			}

			if (resp.errors) {
				yield put(fetchTasksFailure(resp.errors));
			}
		}

	} catch(err) { }
}

export function* watchFetchTasksStart() {
	yield takeEvery(FETCH_TASKS_START, fetchTasks);
}

// CREATE TASK
const createTaskAsync = async (task, projectId) => {
	return await instance.post(`/api/projects/${projectId}/tasks`, task)
		.then(resp => ({ message: "task created successfully" }))
		.catch(err => ({ errors: err.response.data.errors }));
};

function* createTask({ payload }) {
	const { task, projectId, history } = payload;
	try {
		let resp = yield call(createTaskAsync, task, projectId);
		if (resp) {
			if (resp.message) {
				yield put(createTaskSuccess(resp.message));
				history.push(`/dashboard/projectBoard/${projectId}`);
			}
			if (resp.errors) {
				yield put(createTaskFailure(resp.errors));
			}
		}
	} catch(err) { }
}

export function* watchCreateTaskStart() {
	yield takeEvery(CREATE_TASK_START, createTask);
}

// FETCH TASK
const fetchTaskAsync = async (sequence, projectId) => {
	return await instance.get(`api/projects/${projectId}/tasks/${sequence}`)
		.then(resp => ({ task: resp.data }))
		.catch(err => ({ errors: err.response.data.errors }));
};

function* fetchTask({ payload: { sequence, projectId, history } }) {
	try {
		let resp = yield call(fetchTaskAsync, sequence, projectId);
		if (resp) {
			if (resp.task) {
				yield put(fetchTaskSuccess(resp.task));
				history.push(`/dashboard/projectBoard/${projectId}`);
			}
			if (resp.errors) {
				yield put(fetchTaskFailure(resp.errors));
			}
		}
	} catch(err) {}
}

export function* watchFetchTaskStart() {
	yield takeEvery(FETCH_TASK_START, fetchTask);
}

// UPDATE TASK
const updateTaskAsync = async (task, projectId) => {
	return await instance.put(`api/projects/${projectId}/tasks`, task)
		.then(resp => ({ message: "task updated successfully" }))
		.catch(err => ({ errors: err.response.data.errors }));
};

function* updateTask({ payload: { task, projectId, history } }) {
	try {
		let resp = yield call(updateTaskAsync, task, projectId);
		if (resp) {
			if (resp.message) {
				yield put(updateTaskSuccess(resp.message));
				history.push(`/dashboard/projectBoard/${projectId}`);
			}
			if (resp.errors) {
				yield put(updateTaskFailure(resp.errors));
			}
		}
	} catch(err) {}
}

export function* watchUpdateTaskStart() {
	yield takeEvery(UPDATE_TASK_START, updateTask);
}

// DELETE TASK
const deleteTaskAsync = async (sequence, projectId) => {
	return await instance.delete(`api/projects/${projectId}/tasks/${sequence}`)
		.then(resp => ({ message: "task deleted successfully" }))
		.catch(err => ({ errors: err.response.data.errors }));
};

function* deleteTask({ payload: {sequence, projectId} }) {
	try {
		let resp = yield call(deleteTaskAsync, sequence, projectId);
		if (resp) {
			if (resp.message) {
				yield put(deleteTaskSuccess(sequence));
			}
			if (resp.errors) {
				yield put(deleteTaskFailure(resp.errors));
			}
		}
	} catch (err) {}
}

export function* watchDeleteTaskStart() {
	yield takeEvery(DELETE_TASK_START, deleteTask);
}

export default function* rootSaga() {
	yield all([
		fork(watchFetchTasksStart),
		fork(watchCreateTaskStart),
		fork(watchFetchTaskStart),
		fork(watchUpdateTaskStart),
		fork(watchDeleteTaskStart)
	]);
}