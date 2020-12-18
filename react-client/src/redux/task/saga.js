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
	createTaskSuccess,
	createTaskFailure,
	updateTaskSuccess,
	updateTaskFailure,
	deleteTaskSuccess,
	deleteTaskFailure
} from "./actions";
import axios from "axios";

function* fetchTasksStartAsync({ payload: { projectId } }) {
	try {
		const allTasks = yield axios.get(`http://localhost:8080/api/projects/${projectId}/tasks`).then(response => response.data);
		yield put(fetchTasksSuccess(allTasks));
	} catch (error) {
		const { errors } = error.response.data;
		yield put(fetchTasksFailure(errors));
	}
}

function* createTaskStartAsync({ payload: { task, projectId, history } }) {
	
	try {
		yield axios.post(`http://localhost:8080/api/projects/${projectId}/tasks`, task);
		yield put(createTaskSuccess("Task created successfully"));
		history.push(`/dashboard/projectBoard/${projectId}`);
	} catch (error) {
		if (error.response.data.errors) {
			const { errors } = error.response.data;
			yield put(createTaskFailure(errors));
		}
	}
}

function* fetchTaskStartAsync({ payload: { sequence, projectId, history } }) {
	try {
		const task = yield axios.get(`http://localhost:8080/api/projects/${projectId}/tasks/${sequence}`).then(response => response.data);
		yield put(fetchTaskSuccess(task));
	} catch (error) {
		if (error.response.data.errors) {
			const { errors } = error.response.data;
			yield put(fetchTaskFailure(errors));
		}
		history.push(`/dashboard/projectBoard/${projectId}`);
	}
}

function* updateTaskStartAsync({ payload: { task, projectId, history } }) {
	try {
		yield axios.put(`http://localhost:8080/api/projects/${projectId}/tasks`, task);
		yield put(updateTaskSuccess("Task updated successfully"));
		history.push(`/dashboard/projectBoard/${projectId}`);
	} catch (error) {
		if (error.response.data.errors) {
			const { errors } = error.response.data;
			yield put(updateTaskFailure(errors));
		}
	}
}

function* deleteTaskStartAsync({ payload: {sequence, projectId} }) {
	try {
		yield axios.delete(`http://localhost:8080/api/projects/${projectId}/tasks/${sequence}`);
		yield put(deleteTaskSuccess(sequence));
	} catch(error) {
		if (error.response.data.errors) {
			const { errors } = error.response.data;
			yield put(deleteTaskFailure(errors));
		}
	}
}

export function* watchDeleteTaskStart() {
	yield takeEvery(DELETE_TASK_START, deleteTaskStartAsync);
}

export function* watchUpdateTaskStart() {
	yield takeEvery(UPDATE_TASK_START, updateTaskStartAsync);
}

export function* watchFetchTaskStart() {
	yield takeEvery(FETCH_TASK_START, fetchTaskStartAsync);
}

export function* watchCreateTaskStart() {
	yield takeEvery(CREATE_TASK_START, createTaskStartAsync);
}

export function* watchFetchTasksStart() {
	yield takeEvery(FETCH_TASKS_START, fetchTasksStartAsync);
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