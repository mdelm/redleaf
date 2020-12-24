import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/actions";
import "./style.css";

class Navbar extends Component {

	constructor() {
		super();

		this.onLogout = this.onLogout.bind(this);
	}

	onLogout(e) {
		e.preventDefault();
		this.props.logoutUser();
	}

	render() {
		const { authUser } = this.props;

		const userLogedInNavLinks = (
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
						<a className="nav-link ">
							<i className="fas fa-user mr-1" /> { authUser && authUser.email }
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link " onClick={this.onLogout}>
							<i className="fas fa-logout-alt mr-1" />Log out
						</a>
					</li>
				</ul>
			</div>
		);

		const userLogedOutNavLinks = (
			<div className="collapse navbar-collapse" id="mobile-nav">
				<ul className="navbar-nav mr-auto">
				</ul>

				<ul className="navbar-nav ml-auto">
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
		);

		const navLinks = authUser != null ? userLogedInNavLinks : userLogedOutNavLinks;

		return <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
			<div className="container">
				<Link className="navbar-brand" to="/">
					RedLeaf
	            </Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
					<span className="navbar-toggler-icon" />
				</button>

				{ navLinks }
				
			</div>
		</nav>
	}
}

const mapStateToProps = ({ auth }) => {
	const { user: authUser } = auth;
	return { authUser };
};

const mapActionsToProps = dispatch => ({
	logoutUser: () => dispatch(logoutUser())
});

export default connect(
	mapStateToProps,
	mapActionsToProps
)(Navbar);