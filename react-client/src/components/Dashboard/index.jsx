import React, { Component } from "react";
import Navbar from "../Navbar";
import Project from "../Project";

class Dashboard extends Component {
	render() {
		return <div className="projects">
			<Navbar />
	        <div className="container">
	            <div className="row">
	                <div className="col-md-12">
	                    <h1 className="display-4 text-center">Projects</h1>
	                    <br />
	                    <a href="ProjectForm.html" className="btn btn-lg btn-info">
	                        Create a Project
	                    </a>
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