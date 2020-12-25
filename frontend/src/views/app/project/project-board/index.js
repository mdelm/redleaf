import React, { Component, Suspense } from "react";
import { Link } from "react-router-dom";
import Task from "../../../../components/Task";
import TaskItem from "../../../../components/TaskItem";
import { connect } from "react-redux";
import { fetchTasksStart, clearTasks } from "../../../../redux/actions";
import {
    Card,
    Button,
    CardTitle,
    CardText,
    CardDeck,
    CardSubtitle,
    CardBody,
    Nav,
    NavLink,
    NavbarText,
} from "reactstrap";
import "./style.css";

class ProjectBoard extends Component {
    componentDidMount() {
        const { fetchTasksStart } = this.props;
        const { projectId } = this.props.match.params;

        fetchTasksStart(projectId);
    }

    componentWillUnmount() {
        const { clearTasks } = this.props;

        clearTasks();
    }

    render() {
        const { projectId } = this.props.match.params;
        const { allTasks } = this.props;

        return (
            <Suspense fallback={<div className="laoding" />}>
                <div>
                    <Nav>
                        <Link
                            to={`/dashboard/projectBoard/${projectId}/createTask`}
                            className="nav-link"
                        >
                            <i className="fas fa-plus-circle mr-2"></i>Create
                            Project Task
                        </Link>
                        <NavLink href="#">Clear</NavLink>{" "}
                        <NavLink href="#">Refresh</NavLink>{" "}
                        <NavLink disabled href="#">
                            { allTasks.length + " Task(s)" }
                        </NavLink>
                    </Nav>
                </div>

                <CardDeck className="p-2">
                    <Card className="mr-0 cards-container">
                        <CardBody>
                            <CardTitle tag="h5">Ideas</CardTitle>
                            {allTasks
                                .filter((task) => task.status === "IDEAS")
                                .map((task) => (
                                    <TaskItem
                                        projectId={projectId}
                                        {...task}
                                        key={task.sequence}
                                    />
                                ))}
                        </CardBody>
                    </Card>
                    <Card className="mr-0 cards-container">
                        <CardBody>
                            <CardTitle tag="h5">To Do</CardTitle>
                            {allTasks
                                .filter((task) => task.status === "TO_DO")
                                .map((task) => (
                                    <TaskItem
                                        projectId={projectId}
                                        {...task}
                                        key={task.sequence}
                                    />
                                ))}
                        </CardBody>
                    </Card>
                    <Card className="mr-0 cards-container">
                        <CardBody>
                            <CardTitle tag="h5">In Progress</CardTitle>
                            {allTasks
                                .filter((task) => task.status === "IN_PROGRESS")
                                .map((task) => (
                                    <TaskItem
                                        projectId={projectId}
                                        {...task}
                                        key={task.sequence}
                                    />
                                ))}
                        </CardBody>
                    </Card>
                    <Card className="mr-0 cards-container">
                        <CardBody>
                            <CardTitle tag="h5">Done</CardTitle>
                            {allTasks
                                .filter((task) => task.status === "DONE")
                                .map((task) => (
                                    <TaskItem
                                        projectId={projectId}
                                        {...task}
                                        key={task.sequence}
                                    />
                                ))}
                        </CardBody>
                    </Card>
                </CardDeck>
            </Suspense>
        );
    }
}

const mapStateToProps = ({ tasks }) => {
    const { allTasks } = tasks;
    return { allTasks };
};

const mapActionsToProps = (dispatch) => ({
    fetchTasksStart: (projectId) => dispatch(fetchTasksStart(projectId)),
    clearTasks: () => dispatch(clearTasks()),
});

export default connect(mapStateToProps, mapActionsToProps)(ProjectBoard);
