import React, { Component, Suspense, useEffect } from "react";
import { connect } from "react-redux";
import { setCurrentUserStart } from "./redux/actions";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import Header from "./components/Header";

const ViewMain = React.lazy(() => import("./views"));
const ViewApp = React.lazy(() => import("./views/app"));
const ViewError = React.lazy(() => import("./views/error"));
const ViewLogin = React.lazy(() => import("./views/user/login"));
const ViewRegister = React.lazy(() => import("./views/user/register"));

const App = ({ setCurrentUserStart, authUser }) => {

	useEffect(() => {
		setCurrentUserStart();
	}, []);

	return (
		<React.Fragment>
			<Suspense fallback={<div className="loading" />}>
				<Router>
					<Header />
					<Switch>
						<AuthRoute
							path="/dashboard"
							authUser={authUser}
							component={ViewApp}
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

const mapStateToProps = ({ auth }) => {
	const { user: authUser } = auth;
	return { authUser };
};

const mapActionsToProps = dispatch => ({
	setCurrentUserStart: () => dispatch(setCurrentUserStart())
});

export default connect(
	mapStateToProps,
	mapActionsToProps
)(App);
