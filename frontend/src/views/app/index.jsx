import React, { Component, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

const ViewDashboard = React.lazy(() => import("./dashboard"));
const ViewProjectCreateForm = React.lazy(() => import("./project/project-create-form"));
const ViewProjectUpdateForm = React.lazy(() => import("./project/project-update-form"));
const ViewProjectBoard = React.lazy(() => import("./project/project-board"));
const ViewTaskCreateForm = React.lazy(() => import("./task/task-create-form"));
const ViewTaskUpdateForm = React.lazy(() => import("./task/task-update-form"));

class App extends Component {
    render() {
        const { match } = this.props;

        return (
            <Suspense fallback={<div className="loading" />}>
                <Switch>
                    <Route
                        path={`${match.url}/projectBoard/:projectId/updateTask/:sequence`}
                        exact
                        render={props => (<ViewTaskUpdateForm {...props} />)}
                    />
                    <Route
                        path={`${match.url}/projectBoard/:projectId/createTask`}
                        exact
                        render={props => (<ViewTaskCreateForm {...props} />)}
                    />
                    <Route
                        path={`${match.url}/projectBoard/:projectId`}
                        exact
                        render={props => (<ViewProjectBoard {...props} />)}
                    />
                    <Route
                        path={`${match.url}/updateProject/:projectId`}
                        exact
                        render={props => (<ViewProjectUpdateForm {...props} />)}
                    />
                    <Route
                        path={`${match.url}/createProject`}
                        exact
                        render={props => (<ViewProjectCreateForm {...props} />)}
                    />
                    <Route
                        path={`${match.url}/`}
                        exact
                        render={props => (<ViewDashboard {...props} />)}
                    />
                </Switch>
            </Suspense>
        );
    }
}

export default App;
