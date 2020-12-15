import { 
	CREATE_PROJECT_START,
	CREATE_PROJECT_SUCCESS,
	CREATE_PROJECT_FAILURE,
	FETCH_PROJECTS_SUCCESS,
	FETCH_PROJECTS_FAILURE
} from "../actions";

const initialState = {
	allProjects: [],
	message: "",
	errors: {}
};

export default (state = initialState, action) => {
	switch (action.type) {

		case CREATE_PROJECT_SUCCESS:
			return {...state, message: "project created successfully", errors: []};

		case CREATE_PROJECT_FAILURE:
			return {...state, message: "", errors: action.payload.errors}

		case FETCH_PROJECTS_SUCCESS:
			return {...state, allProjects: action.payload.projects}

		case FETCH_PROJECTS_FAILURE:
			return {...state, errors: action.payload.errors}

		default: return {...state};
	}
};