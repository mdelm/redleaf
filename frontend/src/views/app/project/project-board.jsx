import React, { Component, Suspense } from "react";
import { Link } from "react-router-dom";
import Task from "../../../components/Task";
import { connect } from "react-redux";
import { fetchTasksStart, clearTasks } from "../../../redux/actions";
// import PropTypes from "prop-types";

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
				<div className="container">
			        <Link to={`/dashboard/projectBoard/${projectId}/createTask`} className="btn btn-primary mb-3">
			            <i className="fas fa-plus-circle mr-2"></i>Create Project Task
			        </Link>
			        <br />
			        <hr />
			        <div className="container">
			            <div className="row">
			                <div className="col-md-4">
			                    <div className="card text-center mb-2">
			                        <div className="card-header bg-secondary text-white">
			                            <h3>TO DO</h3>
			                        </div>
			                    </div>

			                    { allTasks.filter(task => task.status === "TO_DO").map(task => (<Task projectId={projectId} {...task} key={task.sequence} />)) }
			                    
			                </div>
			                <div className="col-md-4">
			                    <div className="card text-center mb-2">
			                        <div className="card-header bg-primary text-white">
			                            <h3>In Progress</h3>
			                        </div>
			                    </div>
			                    
			                    { allTasks.filter(task => task.status === "IN_PROGRESS").map(task => (<Task projectId={projectId} {...task} key={task.sequence} />)) }

			                </div>
			                <div className="col-md-4">
			                    <div className="card text-center mb-2">
			                        <div className="card-header bg-success text-white">
			                            <h3>Done</h3>
			                        </div>
			                    </div>

			                    { allTasks.filter(task => task.status === "DONE").map(task => (<Task projectId={projectId} {...task} key={task.sequence} />)) }

			                </div>
			            </div>
			        </div>
			    </div>
			</Suspense>
		);
	}
}

/*ProjectBoard.propTypes = {
	fetchTasksStart: PropTypes.func.isRequired,
	allTasks: PropTypes.array.isRequired
}*/

const mapStateToProps = ({ tasks }) => {
	const { allTasks } = tasks;
	return { allTasks };
};

const mapActionsToProps = dispatch => ({
	fetchTasksStart: (projectId) => dispatch(fetchTasksStart(projectId)),
	clearTasks: () => dispatch(clearTasks())
});

export default connect(
	mapStateToProps,
	mapActionsToProps
)(ProjectBoard);