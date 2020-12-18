import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteTaskStart } from "../../redux/actions";

class Task extends Component {

    constructor() {
        super();

        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    onDeleteClick() {
        const { deleteTaskStart, sequence, projectId } = this.props;

        deleteTaskStart(sequence, projectId);
    }

	render() {

		const { 
            projectId, 
            sequence,
            priority,
            summary,
            acceptanceCriteria } = this.props;

		return <div className="card mb-1 bg-light">
            <div className="card-header text-primary">
                ID: {sequence} -- Priority: {priority}
            </div>
            <div className="card-body bg-light">
                <h5 className="card-title">{summary}</h5>
                <p className="card-text text-truncate ">
                    {acceptanceCriteria}
                </p>
                <Link to={`/dashboard/projectBoard/${projectId}/updateTask/${sequence}`} className="btn btn-primary btn-sm">
                    View / Update
                </Link>

                <button onClick={this.onDeleteClick} className="btn btn-danger btn-sm ml-4">
                    Delete
                </button>
            </div>
        </div>
	}
}

const mapActionsToProps = dispatch => ({
    deleteTaskStart: (sequence, projectId) => dispatch(deleteTaskStart(sequence, projectId))
});

export default connect(
    null,
    mapActionsToProps
)(Task);