import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { registerUserStart } from "../../../redux/actions";
import classnames from "classnames";
import {
    Card,
    CardBody,
    CardHeader,
    Form,
    Input,
    FormGroup,
    Label,
} from "reactstrap";
import "./style.css";

class Register extends Component {
    constructor() {
        super();

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
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
                <Card className="register-form">
                    <CardHeader>
                        <h4>Register</h4>
                    </CardHeader>
                    <CardBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="firstName">First Name</Label>
                                <Input
                                    type="text"
                                    className={classnames(
                                        "form-control form-control-lg",
                                        { "is-invalid": errors.firstName }
                                    )}
                                    placeholder="First name"
                                    name="firstName"
                                    onChange={this.onChange}
                                    value={this.state.firstName}
                                />
                                {errors.firstName && (
                                    <div className="invalid-feedback">
                                        {errors.firstName}
                                    </div>
                                )}
                            </FormGroup>

                            <FormGroup>
                                <Label for="lastName">Last Name</Label>
                                <Input
                                    type="text"
                                    className={classnames(
                                        "form-control form-control-lg",
                                        { "is-invalid": errors.lastName }
                                    )}
                                    placeholder="Last name"
                                    name="lastName"
                                    onChange={this.onChange}
                                    value={this.state.lastName}
                                />
                                {errors.lastName && (
                                    <div className="invalid-feedback">
                                        {errors.lastName}
                                    </div>
                                )}
                            </FormGroup>

                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                    type="text"
                                    className={classnames(
                                        "form-control form-control-lg",
                                        { "is-invalid": errors.email }
                                    )}
                                    placeholder="Email"
                                    name="email"
                                    onChange={this.onChange}
                                    value={this.state.email}
                                />
                                {errors.lastName && (
                                    <div className="invalid-feedback">
                                        {errors.email}
                                    </div>
                                )}
                            </FormGroup>

                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    className={classnames(
                                        "form-control form-control-lg",
                                        { "is-invalid": errors.password }
                                    )}
                                    placeholder="Password"
                                    name="password"
                                    onChange={this.onChange}
                                    value={this.state.password}
                                />
                                {errors.password && (
                                    <div className="invalid-feedback">
                                        {errors.password}
                                    </div>
                                )}
                            </FormGroup>

                            <Input
                                type="submit"
                                className="btn btn-info btn-block mt-4"
                                value="REGISTER"
                            />
                        </Form>
                    </CardBody>
                </Card>
            </Suspense>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { user: authUser, errors } = auth;
    return { authUser, errors };
};

const mapActionsToProps = (dispatch) => ({
    registerUserStart: (user, history) =>
        dispatch(registerUserStart(user, history)),
});

export default connect(mapStateToProps, mapActionsToProps)(Register);
