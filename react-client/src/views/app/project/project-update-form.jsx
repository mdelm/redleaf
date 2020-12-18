import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { fetchProjectStart, updateProjectStart } from "../../../redux/actions";
import classnames from "classnames";
import PropTypes from "prop-types";

class ProjectUpdateFrom extends Component {

	constructor(props) {
		super();

		this.state = {
			project: {
				id: "",
				projectName: "",
				projectIdentifier: "",
				description: "",
				startDate: "",
				endDate: ""
			}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({ project: {...this.state.project, [e.target.name]: e.target.value} });
	}

	onSubmit(e) {
		e.preventDefault();

		const { updateProjectStart, history } = this.props;
		const { project } = this.state;

		updateProjectStart(project, history);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({ project: {...nextProps.project} });
	}

	componentDidMount() {
		const { fetchProjectStart } = this.props;
		const { projectId } = this.props.match.params;

		fetchProjectStart(projectId, this.props.history);
	}

	render() {
		const { errors } = this.props;

		return (
			<Suspense fallback={<div className="laoding" />}>
				<div className="project">
			        <div className="container">
			            <div className="row">
			                <div className="col-md-8 m-auto">
			                    <h5 className="display-4 text-center">Update Project form</h5>
			                    <hr />
			                    <form onSubmit={this.onSubmit}>
			                        <div className="form-group">
			                            <input 
			                            	type="text" 
			                            	name="projectName"
			                            	className={classnames("form-control form-control-lg", {"is-invalid": errors.projectName})} 
			                            	placeholder="Project Name"
			                            	onChange={this.onChange}
			                            	value={this.state.project.projectName}
			                            />
			                            { errors.projectName && (<div className="invalid-feedback">{errors.projectName}</div>) }
			                        </div>
			                        <div className="form-group">
			                            <input 
			                            	type="text" 
			                            	name="projectIdentifier"
			                            	className="form-control form-control-lg"
			                            	placeholder="Unique Project ID"
			                            	onChange={this.onChange}
			                            	value={this.state.project.projectIdentifier}
			                                disabled 
			                            />
			                        </div>
			                        <div className="form-group">
			                            <textarea 
			                            	name="description"
			                            	className={classnames("form-control form-control-lg", {"is-invalid": errors.description})} 
			                            	placeholder="Project Description"
			                            	onChange={this.onChange}
			                            	value={this.state.project.description}
			                            ></textarea>
			                            { errors.description && (<div className="invalid-feedback">{errors.description}</div>) }
			                        </div>
			                        <h6>Start Date</h6>
			                        <div className="form-group">
			                            <input 
			                            	type="date" 
			                            	name="startDate" 
			                            	className="form-control form-control-lg"
			                            	onChange={this.onChange}
			                            	value={this.state.project.startDate}
			                            />
			                        </div>
			                        <h6>Estimated End Date</h6>
			                        <div className="form-group">
			                            <input 
			                            	type="date" 
			                            	name="endDate" 
			                            	className="form-control form-control-lg" 
			                            	onChange={this.onChange}
			                            	value={this.state.project.endDate}
			                            />
			                        </div>

			                        <input type="submit" className="btn btn-primary btn-block mt-4" />
			                    </form>
			                </div>
			            </div>
			        </div>
			    </div>
			</Suspense>
		);
	}
}

const mapStateToProps = ({ projects }) => {
	const { project, errors } = projects;
	return { project, errors };
};

const mapActionsToProps = dispatch => ({
	fetchProjectStart: (projectId, history) => dispatch(fetchProjectStart(projectId, history)),
	updateProjectStart: (project, history) => dispatch(updateProjectStart(project, history))
});

export default connect(
	mapStateToProps,
	mapActionsToProps
)(ProjectUpdateFrom);