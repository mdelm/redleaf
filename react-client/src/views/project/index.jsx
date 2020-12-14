import React, { Component } from "react";

class AddProject extends Component {

	constructor() {
		super();

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

		let { projectName, projectIdentifier, description, startDate, endDate } = this.state;

		console.log({ projectName, projectIdentifier, description, startDate, endDate });
	}

	render() {
		return <div className="project">
	        <div className="container">
	            <div className="row">
	                <div className="col-md-8 m-auto">
	                    <h5 className="display-4 text-center">Create / Edit Project form</h5>
	                    <hr />
	                    <form onSubmit={this.onSubmit}>
	                        <div className="form-group">
	                            <input type="text" name="projectName" value={this.state.projectName} onChange={this.onChange} className="form-control form-control-lg " placeholder="Project Name" />
	                        </div>
	                        <div className="form-group">
	                            <input type="text" name="projectIdentifier" value={this.state.projectIdentifier} onChange={this.onChange} className="form-control form-control-lg" placeholder="Unique Project ID"
	                                 />
	                        </div>
	                        <div className="form-group">
	                            <textarea name="description" value={this.state.description} onChange={this.onChange} className="form-control form-control-lg" placeholder="Project Description"></textarea>
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
	}
	
}

export default AddProject;