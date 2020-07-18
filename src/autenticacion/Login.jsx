import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import FondoLogin from "../assets/fondo-login.jpg";

import * as AuthServerService from "../comunications/AuthServerService";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Chotuve-Grupo5 {new Date().getFullYear()}.
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${FondoLogin})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const [credenciales, setCredenciales] = useState({
    usuario: "",
    clave: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

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
    if (credenciales.usuario && credenciales.clave) {
      try {
        await AuthServerService.login(credenciales.usuario, credenciales.clave);
        history.replace("/");
        // eslint-disable-next-line no-undef
        window.location.reload(false);
      } catch (excepcion) {
        setError(excepcion.message);
      }
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>
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
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Login
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
