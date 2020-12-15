import { 
	CREATE_PROJECT_START,
	CREATE_PROJECT_SUCCESS,
	CREATE_PROJECT_FAILURE
} from "../actions";

const initialState = {
	message: "",
	errors: {}
};

export default (state = initialState, action) => {
	switch (action.type) {

		case CREATE_PROJECT_SUCCESS:
			return {...state, message: "project created successfully", errors: []};

		case CREATE_PROJECT_FAILURE:
			return {...state, message: "", errors: action.payload.errors}

		default: return {...state};
	}
};