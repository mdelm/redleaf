import React, { Component } from "react";
import Project from "../../components/Project";
import CreateProjectButton from "../../components/buttons/CreateProjectButton";

class Dashboard extends Component {
	render() {
		return <div className="projects">
	        <div className="container">
	            <div className="row">
	                <div className="col-md-12">
	                    <h1 className="display-4 text-center">Projects</h1>
	                    <br />
	                    
	                    <CreateProjectButton />

	                    <br />
	                    <hr />

	                    <Project />
	                    <Project />

	                </div>
	            </div>
	        </div>
	    </div>
	}
}

export default Dashboard;