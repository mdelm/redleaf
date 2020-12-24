import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { registerUserStart } from "../../redux/actions";
import classnames from "classnames";

class Register extends Component {

    constructor() {
        super();

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();

        const user = { ...this.state };
        const { registerUserStart, history } = this.props;

        registerUserStart(user, history);
    }

    componentDidMount() {
        const { authUser, history } = this.props;
        if (authUser) {
            history.push("/dashboard");
        }
    }

    render() {

        const { errors } = this.props;

        return (
            <Suspense fallback={<div className="loading" />}>
                <div className="register">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h1 className="display-4 text-center">Sign Up</h1>
                                <p className="lead text-center">Create your Account</p>
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input 
                                            type="text" 
                                            className={classnames("form-control form-control-lg", { "is-invalid": errors.firstName })} 
                                            placeholder="First name" 
                                            name="firstName"
                                            onChange={this.onChange}
                                            value={this.state.firstName} />
                                            { errors.firstName && ( <div className="invalid-feedback">{errors.firstName}</div>) }
                                    </div>
                                    <div className="form-group">
                                        <input 
                                            type="text" 
                                            className={classnames("form-control form-control-lg", { "is-invalid": errors.lastName })} 
                                            placeholder="Last name" 
                                            name="lastName"
                                            onChange={this.onChange}
                                            value={this.state.lastName} />
                                            { errors.lastName && ( <div className="invalid-feedback">{errors.lastName}</div>) }
                                    </div>
                                    <div className="form-group">
                                        <input 
                                            type="email" 
                                            className={classnames("form-control form-control-lg", { "is-invalid": errors.email })}
                                            placeholder="Email Address"
                                            name="email"
                                            onChange={this.onChange}
                                            value={this.state.email} />
                                            { errors.email && ( <div className="invalid-feedback">{errors.email}</div>) }
                                    </div>
                                    <div className="form-group">
                                        <input 
                                            type="password" 
                                            className={classnames("form-control form-control-lg", { "is-invalid": errors.password })}
                                            placeholder="Password" 
                                            name="password"
                                            onChange={this.onChange}
                                            value={this.state.password} />
                                            { errors.password && ( <div className="invalid-feedback">{errors.password}</div>) }
                                    </div>
                                    <input type="submit" className="btn btn-info btn-block mt-4" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Suspense>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    const { user: authUser, errors } = auth;
    return { authUser, errors };
}

const mapActionsToProps = dispatch => ({
    registerUserStart: (user, history) => dispatch(registerUserStart(user, history))
});

export default connect(
    mapStateToProps,
    mapActionsToProps
)(Register);
