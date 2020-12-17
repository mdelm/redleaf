import { 
	CREATE_PROJECT_START,
	CREATE_PROJECT_SUCCESS,
	CREATE_PROJECT_FAILURE,
	FETCH_PROJECTS_START,
	FETCH_PROJECTS_SUCCESS,
	FETCH_PROJECTS_FAILURE,
	FETCH_PROJECT_START,
	FETCH_PROJECT_SUCCESS,
	FETCH_PROJECT_FAILURE,
	UPDATE_PROJECT_START,
	UPDATE_PROJECT_SUCCESS,
	UPDATE_PROJECT_FAILURE,
	DELETE_PROJECT_START,
	DELETE_PROJECT_SUCCESS,
	DELETE_PROJECT_FAILURE
} from "../actions";

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

export const createProjectStart = (project, history) => ({
	type: CREATE_PROJECT_START,
	payload: { project, history }
});

export const createProjectSuccess = (message) => ({
	type: CREATE_PROJECT_SUCCESS,
	payload: { message }
});

export const createProjectFailure = (errors) => ({
	type: CREATE_PROJECT_FAILURE,
	payload: { errors }
});

export const fetchProjectStart = (projectId, history) => ({
	type: FETCH_PROJECT_START,
	payload: { projectId, history }
});

export const fetchProjectSuccess = (project) => ({
	type: FETCH_PROJECT_SUCCESS,
	payload: { project }
});

export const fetchProjectFailure = (errors) => ({
	type: FETCH_PROJECT_FAILURE,
	payload: { errors }
});

export const updateProjectStart = (project, history) => ({
	type: UPDATE_PROJECT_START,
	payload: { project, history }
});

export const updateProjectSuccess = (message) => ({
	type: UPDATE_PROJECT_SUCCESS,
	payload: { message }
});

export const updateProjectFailure = (errors) => ({
	type: UPDATE_PROJECT_FAILURE,
	payload: { errors }
});

export const deleteProjectStart = (projectId) => ({
	type: DELETE_PROJECT_START,
	payload: { projectId }
});

export const deleteProjectSuccess = (projectId) => ({
	type: DELETE_PROJECT_SUCCESS,
	payload: { projectId }
});

export const deleteProjectFailure = (errors) => ({
	type: DELETE_PROJECT_FAILURE,
	payload: { errors }
});