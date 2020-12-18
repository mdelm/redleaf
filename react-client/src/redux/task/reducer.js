import {
	FETCH_TASKS_SUCCESS,
	FETCH_TASKS_FAILURE,
	FETCH_TASK_SUCCESS,
	FETCH_TASK_FAILURE,
	CREATE_TASK_SUCCESS,
	CREATE_TASK_FAILURE,
	UPDATE_TASK_SUCCESS,
	UPDATE_TASK_FAILURE,
	DELETE_TASK_SUCCESS,
	DELETE_TASK_FAILURE,
	CLEAR_TASKS
} from "../actions";

const initialState = {
	allTasks: [],
	task: {},
	message: "",
	errors: {}
}

export default (state=initialState, action) => {
	switch(action.type) {

		case FETCH_TASKS_SUCCESS:
			return {
				...state,
				allTasks: action.payload.allTasks
			};

		case FETCH_TASKS_FAILURE:
			return {
				...state,
				errors: action.payload.errors
			};

		case CREATE_TASK_SUCCESS:
			return {
				...state,
				message: action.payload.message,
				errors: {}
			};

		case CREATE_TASK_FAILURE:
			return {
				...state,
				errors: action.payload.errors
			};

		case FETCH_TASK_SUCCESS:
			return {
				...state,
				task: action.payload.task
			};

		case FETCH_TASK_FAILURE:
			return {
				...state,
				errors: action.payload.errors
			};

		case UPDATE_TASK_SUCCESS:
			return {
				...state,
				message: action.payload.message,
				errors: {}
			};

		case UPDATE_TASK_FAILURE:
			return {
				...state,
				errors: action.payload.errors
			};

		case DELETE_TASK_SUCCESS:
			return {
				...state,
				allTasks: state.allTasks.filter(task => task.sequence !== action.payload.sequence)
			};

		case DELETE_TASK_FAILURE:
			return {
				...state,
				errors: action.payload.errors
			};

		case CLEAR_TASKS:
			return {
				...state,
				allTasks: []
			};

		default: return {...state};
	}
}