import React, { Component } from "react";
import Project from "../../components/Project";
import CreateProjectButton from "../../components/buttons/CreateProjectButton";
import { connect } from "react-redux";
import { fetchProjectsStart } from "../../redux/actions";

class Dashboard extends Component {

	componentDidMount() {
		const { fetchProjectsStart } = this.props;
		fetchProjectsStart();
	}

	render() {

		const { allProjects } = this.props;

		return <div className="projects">
	        <div className="container">
	            <div className="row">
	                <div className="col-md-12">
	                    <h1 className="display-4 text-center">Projects</h1>
	                    <br />
	                    
	                    <CreateProjectButton />

	                    <br />
	                    <hr />

	                    { allProjects.map(project => (<Project key={project.id} project={project} />)) }

	                </div>
	            </div>
	        </div>
	    </div>
	}
}

const mapStateToProps = ({ projects }) => {
	const { allProjects } = projects;

	console.log(allProjects);

	return { allProjects };
};

const mapDispatshToProps = disptach => ({
	fetchProjectsStart: () => disptach(fetchProjectsStart())
});

export default connect(
	mapStateToProps,
	mapDispatshToProps
)(Dashboard);