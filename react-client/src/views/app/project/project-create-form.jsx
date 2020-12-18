import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { createProjectStart } from "../../../redux/actions";
import classnames from "classnames";
import { Formik, Form, Field } from "formik";

class ProjectCreateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            projectName: "",
            projectIdentifier: "",
            description: "",
            startDate: "",
            endDate: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        let project = { 
        	projectName: this.state.projectName, 
        	projectIdentifier: this.state.projectIdentifier, 
        	description: this.state.description, 
        	startDate: this.state.startDate, 
        	endDate: this.state.endDate
        };

        const { createProjectStart } = this.props;

        createProjectStart(project, this.props.history);
    }

    render() {

        const { errors } = this.props;

        return (
            <Suspense fallback={<div className="loading" />}>
                <div className="project">
                    <div className="container">

                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h5 className="display-4 text-center">Create Project form</h5>
                                <hr />
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input 
                                            type="text" 
                                            name="projectName" 
                                            value={this.state.projectName} 
                                            onChange={this.onChange} 
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.projectName
                                            })}
                                            placeholder="Project Name" 
                                        />
                                        { errors.projectName && (<div className="invalid-feedback">{errors.projectName}</div>) }
                                    </div>
                                    <div className="form-group">
                                        <input 
                                            type="text" 
                                            name="projectIdentifier" 
                                            value={this.state.projectIdentifier} 
                                            onChange={this.onChange} 
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.projectIdentifier
                                            })}
                                            placeholder="Unique Project ID" 
                                        />
                                        { errors.projectIdentifier && (<div className="invalid-feedback">{errors.projectIdentifier}</div>) }
                                    </div>
                                    <div className="form-group">
                                        <textarea 
                                            name="description" 
                                            value={this.state.description} 
                                            onChange={this.onChange} 
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.description
                                            })}
                                            placeholder="Project Description"
                                        ></textarea>
                                        { errors.description && (<div className="invalid-feedback">{errors.description}</div>) }
                                    </div>
                                    <h6>Start Date</h6>
                                    <div className="form-group">
                                        <input type="date" name="startDate" value={this.state.startDate} onChange={this.onChange} className="form-control form-control-lg" />
                                    </div>
                                    <h6>Estimated End Date</h6>
                                    <div className="form-group">
                                        <input type="date" name="endDate" value={this.state.endDate} onChange={this.onChange} className="form-control form-control-lg" />
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
    const { errors } = projects;
    return { errors };
}

const mapActionsToProps = dispatch => ({
    createProjectStart: (project, history) => dispatch(createProjectStart(project, history))
});

export default connect(
    mapStateToProps,
    mapActionsToProps
)(ProjectCreateForm);