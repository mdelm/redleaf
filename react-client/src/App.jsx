import React, { Component, Suspense } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from "react-router-dom";
import Navbar from "./components/Navbar";

const ViewMain = React.lazy(() => import("./views"));
const ViewDashboard = React.lazy(() => import("./views/app/dashboard"));
const ViewProjectCreateForm = React.lazy(() => import("./views/app/project/project-create-form"));
const ViewProjectUpdateForm = React.lazy(() => import("./views/app/project/project-update-form"));
const ViewProjectBoard = React.lazy(() => import("./views/app/project/project-board"));
const ViewTaskCreateForm = React.lazy(() => import("./views/app/task/task-create-form"));
const ViewTaskUpdateForm = React.lazy(() => import("./views/app/task/task-update-form"));
const ViewError = React.lazy(() => import("./views/error"));

const ViewLogin = React.lazy(() => import("./views/user/login"));
const ViewRegister = React.lazy(() => import("./views/user/register"));

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<Suspense fallback={<div className="loading" />}>
					<Router>
						<Navbar />
						<Switch>
							<Route 
								path="/dashboard/projectBoard/:projectId/updateTask/:sequence"
								exact
								render={props => (<ViewTaskUpdateForm {...props} />)}
							/>
							<Route 
								path="/dashboard/projectBoard/:projectId/createTask"
								exact
								render={props => (<ViewTaskCreateForm {...props} />)}
							/>
							<Route 
								path="/dashboard/projectBoard/:projectId"
								exact
								render={props => (<ViewProjectBoard {...props} />)}
							/>
							<Route 
								path="/dashboard/updateProject/:projectId"
								exact
								render={props => (<ViewProjectUpdateForm {...props} />)}
							/>
							<Route 
								path="/dashboard/createProject"
								exact
								render={props => (<ViewProjectCreateForm {...props} />)}
							/>
							<Route 
								path="/dashboard"
								exact
								render={props => (<ViewDashboard {...props} />)}
							/>
							<Route 
								path="/login"
								exact
								render={props => (<ViewLogin {...props} />)}
							/>
							<Route 
								path="/register"
								exact
								render={props => (<ViewRegister {...props} />)}
							/>
							<Route 
								path="/error"
								exact
								render={props => (<ViewError {...props} />)}
							/>
							<Route 
								path="/"
								exact
								render={props => (<ViewMain {...props} />)}
							/>
							<Redirect to="/error" />
						</Switch>
					</Router>
				</Suspense>
			</React.Fragment>	
		);
	}
}

export default App;
