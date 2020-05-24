import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Estado from "../controllers/Estado";

export default () => {
  return (
    <Router key="router">
      <Route exact path="/" component={Estado} />
    </Router>
  );
};
