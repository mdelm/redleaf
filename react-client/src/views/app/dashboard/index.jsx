import React, { Component, Suspense } from "react";
import Project from "../../../components/Project";
import CreateProjectButton from "../../../components/buttons/CreateProjectButton";
import { connect } from "react-redux";
import { fetchProjectsStart } from "../../../redux/actions";
import PropTypes from "prop-types";

class Dashboard extends Component {

	componentDidMount() {
		const { fetchProjectsStart } = this.props;
		fetchProjectsStart();
	}

	render() {

		const { allProjects } = this.props;

		return (
			<Suspense fallback={<div className="loading" />}>
				<div className="projects">
			        <div className="container">
			            <div className="row">
			                <div className="col-md-12">
			                    <h1 className="display-4 text-center">Projects</h1>
			                    <br />
			                    
			                    <CreateProjectButton formPath="/dashboard/createProject" />

			                    <br />
			                    <hr />

			                    { allProjects.map(project => (<Project key={project.id} project={project} />)) }

			                </div>
			            </div>
			        </div>
			    </div>
			</Suspense>
		);
	}
}

Dashboard.propTypes = {
	fetchProjectsStart: PropTypes.func.isRequired,
	allProjects: PropTypes.array.isRequired
}

const mapStateToProps = ({ projects }) => {
	const { allProjects } = projects;

	return { allProjects };
};

const mapActionsToProps = disptach => ({
	fetchProjectsStart: () => disptach(fetchProjectsStart())
});

export default connect(
	mapStateToProps,
	mapActionsToProps
)(Dashboard);