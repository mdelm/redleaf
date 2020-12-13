import React, { Component } from "react";
import Header from "../Header";
import Project from "../Project";

class Dashboard extends Component {
	render() {
		return <div>
			<Header />
			<div className="alert alert-success">Alert</div>
			<Project />
			<Project />
			<Project />
		</div>
	}
}

export default Dashboard;