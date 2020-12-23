import { combineReducers } from "redux";
import projects from "./project/reducer";
import tasks from "./task/reducer";
import auth from "./auth/reducer";

const reducers = combineReducers({
	projects,
	tasks,
	auth
});

export default reducers;