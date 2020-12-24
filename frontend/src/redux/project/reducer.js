import {
	CREATE_PROJECT_SUCCESS,
	CREATE_PROJECT_FAILURE,
	FETCH_PROJECTS_SUCCESS,
	FETCH_PROJECTS_FAILURE,
	FETCH_PROJECT_SUCCESS,
	FETCH_PROJECT_FAILURE,
	UPDATE_PROJECT_SUCCESS,
	UPDATE_PROJECT_FAILURE,
	DELETE_PROJECT_SUCCESS,
	DELETE_PROJECT_FAILURE
} from "../actions";

const initialState = {
	allProjects: [],
	project: {},
	message: "",
	errors: {}
};

export default (state = initialState, action) => {
	switch (action.type) {

		case FETCH_PROJECTS_SUCCESS:
			return {...state, allProjects: action.payload.projects};

		case FETCH_PROJECTS_FAILURE:
			return {...state, errors: action.payload.errors};

		case CREATE_PROJECT_SUCCESS:
			return {...state, message: action.payload.message, errors: {}};

		case CREATE_PROJECT_FAILURE:
			return {...state, message: "", errors: action.payload.errors};

		case FETCH_PROJECT_SUCCESS:
			return {...state, project: action.payload.project}

		case FETCH_PROJECT_FAILURE:
			return {...state, errors: action.payload.errors};

		case UPDATE_PROJECT_SUCCESS:
			return {...state, message: action.payload.message, errors: []};

		case UPDATE_PROJECT_FAILURE:
			return {...state, errors: action.payload.errors};

		case DELETE_PROJECT_SUCCESS:
			return {
				...state,
				allProjects: state.allProjects.filter(project => project.projectIdentifier !== action.payload.projectId)
			};

		case DELETE_PROJECT_FAILURE:
			return {...state, errors: action.payload.errors};

		default: return {...state};
	}
};