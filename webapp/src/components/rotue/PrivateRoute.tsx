import { Route, Redirect } from "react-router";
import React from "react";

const PrivateRoute = ({component, context, ...rest}: any) => {
    const routeComponent = (props: any) => (
             context.authenticated
            ? React.createElement(component, props)
            : <Redirect to={{pathname: '/login'}}/>
    );
    return <Route {...rest} render={routeComponent}/>;
};

export default PrivateRoute;