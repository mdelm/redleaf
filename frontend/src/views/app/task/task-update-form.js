import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import {
    fetchTaskStart,
    updateTaskStart,
    fetchProjectStart,
} from "../../../redux/actions";
import classnames from "classnames";
import { Link } from "react-router-dom";

class TaskUpdateFrom extends Component {
    constructor() {
        super();

        this.state = {
            acceptanceCriteria: "",
            dueDate: "",
            id: "",
            priority: "",
            sequence: "",
            status: "",
            summary: "",
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const { updateTaskStart, history } = this.props;
        const { projectId } = this.props.match.params;

        updateTaskStart({ ...this.state }, projectId, history);
    }

    componentDidMount() {
        const { fetchTaskStart, fetchProjectStart, history } = this.props;
        const { sequence, projectId } = this.props.match.params;

        fetchTaskStart(sequence, projectId, history);
        fetchProjectStart(projectId, history);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps.task });
    }

    render() {
        const { errors } = this.props;
        const { project } = this.props;

        return (
            <Suspense fallback={<div className="loading" />}>
                <div className="add-PBI">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <Link
                                    to={`/dashboard/projectBoard/${project.projectIdentifier}`}
                                    className="btn btn-light"
                                >
                                    Back to Project Board
                                </Link>
                                <h4 className="display-4 text-center">
                                    View / Update Project Task
                                </h4>
                                <p className="lead text-center">
                                    {project.projectName +
                                        " " +
                                        project.projectIdentifier}
                                </p>
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className={classnames(
                                                "form-control form-control-lg",
                                                {
                                                    "is-invalid":
                                                        errors.summary,
                                                }
                                            )}
                                            name="summary"
                                            placeholder="Project Task summary"
                                            onChange={this.onChange}
                                            value={this.state.summary}
                                        />
                                        {errors.summary && (
                                            <div className="invalid-feedback">
                                                {errors.summary}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <textarea
                                            className="form-control form-control-lg"
                                            placeholder="Acceptance Criteria"
                                            name="acceptanceCriteria"
                                            onChange={this.onChange}
                                            value={
                                                this.state.acceptanceCriteria
                                            }
                                        ></textarea>
                                    </div>
                                    <h6>Due Date</h6>
                                    <div className="form-group">
                                        <input
                                            type="date"
                                            className="form-control form-control-lg"
                                            name="dueDate"
                                            onChange={this.onChange}
                                            value={this.state.dueDate}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <select
                                            className="form-control form-control-lg"
                                            name="priority"
                                            onChange={this.onChange}
                                            value={this.state.priority}
                                        >
                                            <option value={0}>
                                                Select Priority
                                            </option>
                                            <option value={1}>High</option>
                                            <option value={2}>Medium</option>
                                            <option value={3}>Low</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <select
                                            className="form-control form-control-lg"
                                            name="status"
                                            onChange={this.onChange}
                                            value={this.state.status}
                                        >
                                            <option value="">
                                                Select Status
                                            </option>
                                            <option value="IDEAS">Ideas</option>
                                            <option value="TO_DO">To Do</option>
                                            <option value="IN_PROGRESS">
                                                In Progress
                                            </option>
                                            <option value="DONE">Done</option>
                                        </select>
                                    </div>

                                    <input
                                        type="submit"
                                        className="btn btn-primary btn-block mt-4"
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Suspense>
        );
    }
}

const mapStateToProps = ({ projects, tasks }) => {
    const { task, errors } = tasks;
    const { project } = projects;
    return { project, task, errors };
};

const mapActionsToProps = (dispatch) => ({
    fetchTaskStart: (sequence, projectId, history) =>
        dispatch(fetchTaskStart(sequence, projectId, history)),
    updateTaskStart: (task, projectId, history) =>
        dispatch(updateTaskStart(task, projectId, history)),
    fetchProjectStart: (projectId, history) =>
        dispatch(fetchProjectStart(projectId, history)),
});

export default connect(mapStateToProps, mapActionsToProps)(TaskUpdateFrom);
