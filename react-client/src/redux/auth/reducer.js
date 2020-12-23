import { 
    LOGIN_USER_FAILURE,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_SUCCESS
} from "../actions";

const initialState = {
    jwt: localStorage.getItem("jwt"),
    errors: {},
    message: ""
}

export default (state = initialState, action) => {
    switch(action.type) {

        case LOGIN_USER_SUCCESS:
            return { ...state, jwt: action.payload.jwt, message: "" };

        case LOGIN_USER_FAILURE:
            return { ...state, errors: action.payload.errors };

        case REGISTER_USER_SUCCESS:
            return { 
                ...state, 
                message: action.payload.message, 
                errors: {} 
            };

        case REGISTER_USER_FAILURE:
            return { 
                ...state,
                errors: action.payload.errors 
            };

        case LOGOUT_USER:
            return { ...state, jwt: null };

        default: return { ...state };

    }
};