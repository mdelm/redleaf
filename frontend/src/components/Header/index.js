import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/actions";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from "reactstrap";
import logo from "../../assets/images/logo.png";
import "./style.css";

const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const { logoutUser, authUser } = props;

    const toggle = () => setIsOpen(!isOpen);

    const logout = (e) => {
        e.preventDefault();
        logoutUser();
    };

    return (
        <div>
            <Navbar color="dark" dark expand="md" id="navbar">
                <NavbarBrand href="/">
                    <Link to="/">
                        <img src={logo} className="logo" />
                    </Link>
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    {authUser ? (
                        <Fragment>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <Link to="/dashboard/" className="nav-link">
                                        Dashboard
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link
                                        to="/dashboard/createProject"
                                        className="nav-link"
                                    >
                                        Create Project
                                    </Link>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink>
                                        <i className="fas fa-user mr-2" />
                                        {authUser.firstName +
                                            " " +
                                            authUser.lastName}
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink onClick={logout}>
                                        <i className="fas fa-logout-alt mr-2" />
                                        Log Out
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Nav className="mr-auto" navbar></Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem className="ml-2">
                                    <Link
                                        to="/login/"
                                        className="nav-link btn btn-primary"
                                    >
                                        Log In
                                    </Link>
                                </NavItem>
                                <NavItem className="ml-2">
                                    <Link
                                        to="/register/"
                                        className="nav-link btn btn-success"
                                    >
                                        Sign Up
                                    </Link>
                                </NavItem>
                            </Nav>
                        </Fragment>
                    )}
                </Collapse>
            </Navbar>
        </div>
    );
};

const mapStateToProps = ({ auth }) => {
    const { user: authUser } = auth;
    return { authUser };
};

const mapActionsToProps = (dispatch) => ({
    logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapActionsToProps)(Header);
