import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Logo from "../assets/logo.png";
import MediaCard from "../components/MediaCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    border: 0,
  },
}));

const PantallaEstadisticas = () => {
  const classes = useStyles();

  const historicoVideos = () => {
    console.log("videos");
    return 2365;
  };

  const historicoUsuarios = () => {
    console.log("usuarios");
    return 500;
  };

  const historicoReacciones = () => {
    console.log("reacciones");
    return 5000;
  };

  const historicoComentarios = () => {
    console.log("comentarios");
    return 4362;
  };

  return (
    <div className={classes.root}>
      <Typography variant="h3" gutterBottom>
        Estadísitcas
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper} variant="outlined">
            <MediaCard
              titulo="Videos"
              subtitulo="5000"
              imagen={Logo}
              colorFondo="#ffe699"
              obtenerTotal={() => historicoVideos()}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper} variant="outlined">
            <MediaCard
              titulo="Usuarios"
              subtitulo="465"
              imagen={Logo}
              colorFondo="#ccff99	"
              obtenerTotal={() => historicoUsuarios()}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper} variant="outlined">
            <MediaCard
              titulo="Reacciones"
              subtitulo="3800"
              imagen={Logo}
              colorFondo="#cc99ff"
              obtenerTotal={() => historicoReacciones()}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper} variant="outlined">
            <MediaCard
              titulo="Comentarios"
              subtitulo="2000"
              imagen={Logo}
              colorFondo="#ff9999"
              obtenerTotal={() => historicoComentarios()}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>grafico videos</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default PantallaEstadisticas;
