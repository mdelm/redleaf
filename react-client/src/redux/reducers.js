import { combineReducers } from "redux";
import projects from "./project/reducer";
import tasks from "./task/reducer";

const reducers = combineReducers({
	projects,
	tasks
});

export default reducers;