import {
	FETCH_TASKS_START,
	FETCH_TASKS_SUCCESS,
	FETCH_TASKS_FAILURE,
	FETCH_TASK_START,
	FETCH_TASK_SUCCESS,
	FETCH_TASK_FAILURE,
	CREATE_TASK_START,
	CREATE_TASK_SUCCESS,
	CREATE_TASK_FAILURE,
	UPDATE_TASK_START,
	UPDATE_TASK_SUCCESS,
	UPDATE_TASK_FAILURE,
	DELETE_TASK_START,
	DELETE_TASK_SUCCESS,
	DELETE_TASK_FAILURE,
	CLEAR_TASKS
} from "../actions";

export const fetchTasksStart = (projectId) => ({
	type: FETCH_TASKS_START,
	payload: { projectId }
});

export const fetchTasksSuccess = (allTasks) => ({
	type: FETCH_TASKS_SUCCESS,
	payload: { allTasks }
});

export const fetchTasksFailure = (errors) => ({
	type: FETCH_TASK_FAILURE,
	payload: { errors }
});

export const createTaskStart = (task, projectId, history) => ({
	type: CREATE_TASK_START,
	payload: { task, projectId, history }
});

export const createTaskSuccess = (message) => ({
	type: CREATE_TASK_SUCCESS,
	payload: { message }
});

export const createTaskFailure = (errors) => ({
	type: CREATE_TASK_FAILURE,
	payload: { errors }
});

export const fetchTaskStart = (sequence, projectId, history) => ({
	type: FETCH_TASK_START,
	payload: { sequence, projectId }
});

export const fetchTaskSuccess = (task) => ({
	type: FETCH_TASK_SUCCESS,
	payload: { task }
});

export const fetchTaskFailure = (errors) => ({
	type: FETCH_TASK_FAILURE,
	payload: { errors }
});

export const updateTaskStart = (task, projectId, history) => ({
	type: UPDATE_TASK_START,
	payload: { task, projectId, history }
});

export const updateTaskSuccess = (message) => ({
	type: UPDATE_TASK_SUCCESS,
	payload: { message }
});

export const updateTaskFailure = (errors) => ({
	type: UPDATE_TASK_FAILURE,
	payload: { errors }
});

export const deleteTaskStart = (sequence, projectId) => ({
	type: DELETE_TASK_START,
	payload: { sequence, projectId }
});

export const deleteTaskSuccess = (sequence) => ({
	type: DELETE_TASK_SUCCESS,
	payload: { sequence }
});

export const deleteTaskFailure = (errors) => ({
	type: DELETE_TASK_FAILURE,
	payload: { errors }
});

export const clearTasks = () => ({
	type: CLEAR_TASKS,
	payload: {}
});