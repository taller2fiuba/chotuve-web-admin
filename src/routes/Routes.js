import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Estado from "../estado/Estado";
import SideBarResponsive from "../components/SideBarResponsive";
import PantallaUsuarios from "../usuarios/PantallaUsuarios";
import PantallaVideos from "../videos/PantallaVideos";
import PantallaServers from "../servers/PantallaServers";
import PantallaEstadisticas from "../estadisticas/PantallaEstadisticas";
import Login from "../autenticacion/Login";
import PrivateRoute from "../autenticacion/PrivateRoute";
import * as AuthServerService from "../comunications/AuthServerService";

export default () => {
  const handleLogout = () => {
    AuthServerService.logout();
    // eslint-disable-next-line no-undef
    window.location.reload();
  };

  return (
    <BrowserRouter key="router">
      <div style={{ display: "flex" }}>
        {AuthServerService.estaLogeado() && (
          <SideBarResponsive handleLogout={handleLogout} />
        )}
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <PrivateRoute exact path="/">
            <PantallaEstadisticas />
          </PrivateRoute>
          <PrivateRoute exact path="/estado">
            <Estado />
          </PrivateRoute>
          <PrivateRoute exact path="/usuario">
            <PantallaUsuarios />
          </PrivateRoute>
          <PrivateRoute exact path="/video">
            <PantallaVideos />
          </PrivateRoute>
          <PrivateRoute exact path="/server">
            <PantallaServers />
          </PrivateRoute>
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
