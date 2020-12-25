import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { loginUserStart } from "../../../redux/actions";
import classnames from "classnames";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Form,
    Input,
    FormGroup,
    InputGroup,
    Label,
    InputGroupAddon,
    InputGroupText,
} from "reactstrap";
import "./style.css";

class Login extends Component {
    constructor() {
        super();

        this.state = {
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
        const { loginUserStart, history } = this.props;

        loginUserStart(user, history);
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
                <Card className="login-form">
                    <CardHeader>
                        <h4>Log In</h4>
                    </CardHeader>
                    <CardBody>
                        {errors.badCredentials && (
                            <div className="alert alert-danger">
                                {errors.badCredentials}
                            </div>
                        )}

                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="firstName">Email</Label>
                                <InputGroup>
                                    
                                    <Input
                                        type="email"
                                        className={classnames(
                                            "form-control form-control-lg",
                                            {
                                                "is-invalid": errors.username,
                                            }
                                        )}
                                        placeholder="Email Address"
                                        name="email"
                                        onChange={this.onChange}
                                        value={this.state.email}
                                    />
                                    <InputGroupAddon addonType="append">
                                        <InputGroupText><i className="fas fa-user" /></InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                                {errors.username && (
                                    <div className="invalid-feedback">
                                        {errors.username}
                                    </div>
                                )}
                            </FormGroup>

                            <FormGroup>
                                <Label for="password">Password</Label>
                                <InputGroup>
                                    
                                    <Input
                                        type="password"
                                        className={classnames(
                                            "form-control form-control-lg",
                                            {
                                                "is-invalid": errors.password,
                                            }
                                        )}
                                        placeholder="Password"
                                        name="password"
                                        onChange={this.onChange}
                                        value={this.state.password}
                                    />
                                    <InputGroupAddon addonType="append">
                                        <InputGroupText><i className="fas fa-lock" /></InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                                {errors.password && (
                                    <div className="invalid-feedback">
                                        {errors.password}
                                    </div>
                                )}
                            </FormGroup>

                            <Button color="info" className="btn-block mt-4">
                                LOG IN
                            </Button>
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
    loginUserStart: (user, history) => dispatch(loginUserStart(user, history)),
});

export default connect(mapStateToProps, mapActionsToProps)(Login);
