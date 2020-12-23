import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { loginUserStart } from "../../redux/actions";
import classnames from "classnames";

class Login extends Component {

    constructor() {
        super();

        this.state = {
            email: "",
            password: ""
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = { ...this.state };
        const { loginUserStart, history } = this.props;

        loginUserStart(user, history);
    }

    render() {

        const { errors } = this.props;

        return (
            <Suspense fallback={<div className="loading" />}>
                <div className="login">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h1 className="display-4 text-center">Log In</h1>

                                { errors.badCredentials && (<div className="alert alert-danger">{errors.badCredentials}</div>) }

                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input 
                                            type="email" 
                                            className={classnames("form-control form-control-lg", { "is-invalid": errors.email })}
                                            placeholder="Email Address" 
                                            name="email"
                                            onChange={this.onChange}
                                            value={this.state.email} />
                                        { errors.email && (<div className="invalid-feedback">{errors.email}</div>) }
                                    </div>
                                    <div className="form-group">
                                        <input 
                                            type="password" 
                                            className={classnames("form-control form-control-lg", { "is-invalid": errors.password})} 
                                            placeholder="Password" 
                                            name="password"
                                            onChange={this.onChange}
                                            value={this.state.password} />
                                        { errors.password && (<div className="invalid-feedback">{errors.password}</div>) }
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
    const { errors } = auth;
    return { errors };
};

const mapActionsToProps = dispatch => ({
    loginUserStart: (user, history) => dispatch(loginUserStart(user, history))
});

export default connect(
    mapStateToProps,
    mapActionsToProps
)(Login);
