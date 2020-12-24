import React, { Component, Suspense } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Main extends Component {

	componentDidMount() {
        const { authUser, history } = this.props;
        if (authUser) {
            history.push("/dashboard");
        }
    }

	render() {
		return (
			<Suspense fallback={<div className="loading" />}>
				<div className="landing">
					<div className="light-overlay landing-inner text-dark">
						<div className="container">
							<div className="row">
								<div className="col-md-12 text-center">
									<h1 className="display-3 mb-4">Personal Kanban Tool</h1>
									<p className="lead">Create your account to join active projects or start you own</p>
									<hr />
									<Link to="/register" className="btn btn-lg btn-primary mr-2">Sign Up</Link>
									<Link to="/login" className="btn btn-lg btn-secondary mr-2">Login</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Suspense>
		)
	}
}

const mapStateToProps = ({ auth }) => {
	const { user: authUser } = auth;
	return { authUser };
}

export default connect(
	mapStateToProps,
	null
)(Main);