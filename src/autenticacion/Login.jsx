import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import LinearProgress from "@material-ui/core/LinearProgress";

import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import LogoTexto from "../assets/logo-texto.jpeg";
import { useStyles } from "../components/styles";

import * as AuthServerService from "../comunications/AuthServerService";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Chotuve-Grupo4 {new Date().getFullYear()}.
    </Typography>
  );
}

const Login = () => {
  const [credenciales, setCredenciales] = useState({
    usuario: "",
    clave: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const classes = useStyles();

  const history = useHistory();

  useEffect(() => {
    if (AuthServerService.estaLogeado()) {
      history.replace("/");
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredenciales({ ...credenciales, [name]: value });
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    setCargando(true);
    if (credenciales.usuario && credenciales.clave) {
      try {
        await AuthServerService.login(credenciales.usuario, credenciales.clave);
        history.replace("/");
        setCargando(false);
        // eslint-disable-next-line no-undef
        window.location.reload(false);
      } catch (excepcion) {
        setError(excepcion.response.data.error);
        setCargando(false);
      }
    }
  };

  return (
    <Grid container component="main" className={classes.rootLogin}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia className={classes.logo} image={LogoTexto} />
            </CardActionArea>
          </Card>
          <form className={classes.form} autoComplete="off">
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="usuario"
              label="Usuario"
              name="usuario"
              onChange={handleChange}
              autoFocus
              error={submitted && !credenciales.usuario}
              helperText={
                submitted && !credenciales.usuario && "Ingrese un usuario"
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="clave"
              label="Clave"
              type="password"
              id="clave"
              onChange={handleChange}
              error={submitted && !credenciales.clave}
              helperText={
                submitted && !credenciales.clave && "Ingrese una clave"
              }
            />
            {!cargando ? (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                Login
              </Button>
            ) : (
              <LinearProgress />
            )}
            <Copyright />
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
