import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Estado from "../estado/Estado";
// import SideBarResponsive from "../components/SideBarResponsive";
import PantallaUsuarios from "../usuarios/PantallaUsuarios";
import PantallaVideos from "../videos/PantallaVideos";
import PantallaServers from "../servers/PantallaServers";
import Login from "../autenticacion/Login";

export default () => {
  return (
    <BrowserRouter key="router">
      <div style={{ display: "flex" }}>
        {/* <SideBarResponsive /> */}
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/" />
          <Route exact path="/estado">
            <Estado />
          </Route>
          <Route exact path="/usuario">
            <PantallaUsuarios />
          </Route>
          <Route exact path="/video">
            <PantallaVideos />
          </Route>
          <Route exact path="/server">
            <PantallaServers />
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
