import { 
	CREATE_PROJECT_START,
	CREATE_PROJECT_SUCCESS,
	CREATE_PROJECT_FAILURE,
	FETCH_PROJECTS_START,
	FETCH_PROJECTS_SUCCESS,
	FETCH_PROJECTS_FAILURE
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

export const fetchProjectsStart = () => ({
	type: FETCH_PROJECTS_START
});

export const fetchProjectsSuccess = (projects) => ({
	type: FETCH_PROJECTS_SUCCESS,
	payload: { projects }
});

export const fetchProjectsFailure = (error) => ({
	type: FETCH_PROJECTS_FAILURE,
	payload: { error }
});