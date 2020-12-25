import React, { Component, Suspense } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Jumbotron, Container } from "reactstrap";

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
                <Container className="mt-2">
                    <Jumbotron>
                        <h1 className="display-4">Personal Project Management Tool</h1>
                        <p className="lead">
							Create your account to join active projects or start you own.
                        </p>
                        <hr className="my-2" />
                        <p className="lead">
							<Link className="btn btn-primary mr-2" to="/register">Sign Up</Link>
							<Link className="btn btn-secondary" to="/login">Log In</Link>
                        </p>
                    </Jumbotron>
                </Container>
            </Suspense>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { user: authUser } = auth;
    return { authUser };
};

export default connect(mapStateToProps, null)(Main);
