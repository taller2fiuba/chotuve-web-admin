/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from "react";
import { Route, Redirect } from "react-router-dom";

import * as AuthServerService from "../comunications/AuthServerService";

function PrivateRoute({ children, ...rest }) {
  return AuthServerService.estaLogeado() ? (
    <Route {...rest}>{children}</Route>
  ) : (
    <Redirect to="/login" />
  );
}

export default PrivateRoute;
