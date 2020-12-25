import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const AuthRoute = ({ component: Component, authUser, ...rest }) => {
    return (
        <Route 
            {...rest}
            render={props => 
                authUser || true ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={ {pathname: "/", state: {from: props.location} } } />
                )
            }
        />
    );
};

export default AuthRoute;