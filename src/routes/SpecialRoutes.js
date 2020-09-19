import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, loggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return loggedIn ? <Component {...props} /> : <Redirect to="/" />;
      }}
    />
  );
};

export const RedirectRoute = ({ component: Component, loggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return loggedIn ? (
          <Redirect to="/dashboard/home" />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
};
