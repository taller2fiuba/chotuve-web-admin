import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Estado from "../estado/Estado";
import SideBarResponsive from "../components/SideBarResponsive";

export default () => {
  return (
    <Router key="router">
      <div style={{ display: "flex" }}>
        <SideBarResponsive />
        <Switch>
          <Route exact path="/" />
          <Route exact path="/estado">
            <Estado />
          </Route>
          <Route exact path="/about" />
        </Switch>
      </div>
    </Router>
  );
};
