import { 
    LOGIN_USER_FAILURE,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_SUCCESS,
    SET_CURRENT_USER_SUCCESS
} from "../actions";

const initialState = {
    user: null, 
    errors: {},
    message: ""
}

export default (state = initialState, action) => {
    switch(action.type) {

        case SET_CURRENT_USER_SUCCESS:
            return {
                ...state,
                user: action.payload.user
            }

        case LOGIN_USER_SUCCESS:

            return { 
                ...state, 
                user: action.payload.user, 
                message: "",
                errors: {}
             };

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
            return { ...state, user: null };

        default: return { ...state };

    }
};