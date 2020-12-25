import React from "react";
import { connect } from "react-redux";
import { deleteTaskStart } from "../../redux/actions";
import { Link } from "react-router-dom";
import { Card, Button, CardText, CardBody } from "reactstrap";
import classnames from "classnames";
import "./style.css";

const TaskItem = (props) => {
    const {
        projectId,
        sequence,
        priority,
        summary,
        deleteTaskStart
    } = props;

    const deleteTask = () => deleteTaskStart(sequence, projectId);

    return (
        <Card className="mx-0 mb-2 task-item">
            <div
                className={classnames("priority-descriptor", {
                    "high-priority": priority == 1,
                    "medium-priority": priority === 2,
                    "low-priority": priority == 3
                })}
            ></div>
            <span className="task-id">{sequence}</span>
            <CardBody>
                <CardText>{summary}</CardText>
                <Link color="secondary" className="btn btn-sm btn-secondary mr-1" to={`/dashboard/projectBoard/${projectId}/updateTask/${sequence}`}>
                    <i className="fas fa-edit" />
                </Link>
                <Button color="secondary" size="sm" className="mr-1" onClick={deleteTask}>
                    <i className="fas fa-trash" />
                </Button>
            </CardBody>
        </Card>
    );
};

const mapActionsToProps = dispatch => ({
    deleteTaskStart: (sequence, projectId) => dispatch(deleteTaskStart(sequence, projectId))
});

export default connect(
    null,
    mapActionsToProps
)(TaskItem);
