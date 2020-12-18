import React from "react";
import { Link } from "react-router-dom";

const CreateProjectButton = ({ formPath }) => {
	return <React.Fragment>
		<Link to={formPath} className="btn btn-lg btn-info">
			Create a Project
		</Link>
	</React.Fragment>
}

export default CreateProjectButton;