import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import VideoImagen from "../assets/videos.png";
import UsuarioImagen from "../assets/usuarios.webp";
import ReaccionImagen from "../assets/reacciones.png";
import ComentarioImagen from "../assets/comentarios.png";

import MediaCard from "../components/MediaCard";

import * as MediaServerService from "../comunications/MediaServerService";
import * as AuthServerService from "../comunications/AuthServerService";
import * as Requester from "../comunications/Requester";
import { APP_SERVER_API } from "../utils/constant";

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

  const historicoVideos = async () => {
    const total = await MediaServerService.totalVideos();
    return total;
  };

  const historicoUsuarios = async () => {
    const total = await AuthServerService.totalUsuarios();
    return total;
  };

  const historicoReacciones = async () => {
    const total = await Requester.totalReacciones(APP_SERVER_API);
    return total;
  };

  const historicoComentarios = async () => {
    const total = await Requester.totalComentarios(APP_SERVER_API);
    return total;
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
              imagen={VideoImagen}
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
              imagen={UsuarioImagen}
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
              imagen={ReaccionImagen}
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
              imagen={ComentarioImagen}
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
