import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  authenticated,
  authenticate,
  logout,
  user,
  ...rest
}) => {
  return (
    <Route
      render={(props) =>
        authenticated ? (
          <Component
            {...props}
            user={user}
            authenticate={authenticate}
            logout={logout}
          />
        ) : (
          <Redirect to="/" />
        )
      }
      {...rest}
    />
  );
};
export default PrivateRoute;
