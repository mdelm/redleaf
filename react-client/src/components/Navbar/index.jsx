import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/actions";

class Navbar extends Component {

	constructor() {
		super();

		this.onLogout = this.onLogout.bind(this);
	}

	onLogout(e) {
		e.preventDefault();

		const { logoutUser, history } = this.props;

		logoutUser(history);
	}

	render() {
		return <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
			<div className="container">
				<Link className="navbar-brand" to="/dashboard">
					RedLeaf
	            </Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
					<span className="navbar-toggler-icon" />
				</button>

				<div className="collapse navbar-collapse" id="mobile-nav">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<Link className="nav-link" to="/dashboard">
								Dashboard
	                        </Link>
						</li>
					</ul>

					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							<a className="nav-link " onClick={this.onLogout}>
								Log out
							</a>
						</li>
						<li className="nav-item">
							<Link className="nav-link " to="/register">
								Sign Up
	                        </Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/login">
								Login
	                        </Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	}
}

const mapActionsToProps = dispatch => ({
	logoutUser: (history) => dispatch(logoutUser(history)) 
});

export default connect(
	null,
	mapActionsToProps
)(Navbar);