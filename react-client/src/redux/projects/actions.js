import { 
	CREATE_PROJECT_START,
	CREATE_PROJECT_SUCCESS,
	CREATE_PROJECT_FAILURE
} from "../actions";

export const createProjectStart = (project, history) => ({
	type: CREATE_PROJECT_START,
	payload: { project, history }
});

export const createProjectSuccess = (history) => ({
	type: CREATE_PROJECT_SUCCESS,
	payload: { history }
});

export const createProjectFailure = (errors) => ({
	type: CREATE_PROJECT_FAILURE,
	payload: { errors }
});