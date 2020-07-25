/* eslint-disable guard-for-in */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import BeatLoader from "react-spinners/BeatLoader";

import VideoImagen from "../assets/videos.png";
import UsuarioImagen from "../assets/usuarios.webp";
import ReaccionImagen from "../assets/reacciones.png";
import ComentarioImagen from "../assets/comentarios.png";

import MediaCard from "../components/MediaCard";
import ResponsiveLineChart from "../components/ResponsiveLineChart";

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
  chart: {
    height: 350,
    width: 700,
    textAlign: "center",
    backgroundColor: "#f0f5f5",
    padding: theme.spacing(2),
  },
  formControl: {
    minWidth: 120,
  },
}));

const PantallaEstadisticas = () => {
  const classes = useStyles();
  const [escala, setEscala] = useState(7);
  const [videos, setVideos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    cargarEstadisticas();
  }, [escala]);

  const armarDatos = (estadisticas, titulo, color) => {
    const datos = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const key in estadisticas) {
      datos.push({
        x: key,
        y: estadisticas[key],
      });
    }
    return { id: titulo, color, data: datos };
  };

  const cargarEstadisticas = async () => {
    try {
      let datos = {};
      const fechaFinal = new Date();
      const fechaInicio = new Date();
      fechaInicio.setDate(fechaFinal.getDate() - escala);
      let estadisticas = await MediaServerService.obtenerEstadisticas(
        fechaInicio.toISOString().substring(0, 10),
        fechaFinal.toISOString().substring(0, 10)
      );
      datos = armarDatos(estadisticas, "video", "hsl(17, 70%, 50%)");
      setVideos([datos]);
      estadisticas = await AuthServerService.obtenerEstadisticas(
        fechaInicio.toISOString().substring(0, 10),
        fechaFinal.toISOString().substring(0, 10)
      );
      datos = armarDatos(estadisticas, "usuarios", "hsl(800, 30%, 80%)");
      setUsuarios([datos]);
    } catch (error) {
      console.log("error");
    }
  };

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

  const handleChange = (event) => {
    setEscala(event.target.value);
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
          <Paper className={classes.paper} variant="outlined">
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Escala</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={escala}
                onChange={handleChange}
              >
                <MenuItem value={7}>Último Semana</MenuItem>
                <MenuItem value={14}>Últimas 2 semanas</MenuItem>
                <MenuItem value={30}>Último mes</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Grid>

        <Grid container direction="row" item xs={12} sm={6} justify="center">
          <Paper className={classes.chart}>
            {videos.length === 0 ? (
              <BeatLoader size={10} margin={2} color="#298FDA" loading />
            ) : (
              <ResponsiveLineChart data={videos} />
            )}
          </Paper>
        </Grid>
        <Grid container direction="row" item xs={12} sm={6} justify="center">
          <Paper className={classes.chart}>
            {videos.length === 0 ? (
              <BeatLoader size={10} margin={2} color="#298FDA" loading />
            ) : (
              <ResponsiveLineChart data={usuarios} />
            )}
          </Paper>
        </Grid>
        <Grid container direction="row" item xs={12} sm={6} justify="center">
          <Paper className={classes.chart}>
            {videos.length === 0 ? (
              <BeatLoader size={10} margin={2} color="#298FDA" loading />
            ) : (
              <ResponsiveLineChart data={videos} />
            )}
          </Paper>
        </Grid>
        <Grid container direction="row" item xs={12} sm={6} justify="center">
          <Paper className={classes.chart}>
            {videos.length === 0 ? (
              <BeatLoader size={10} margin={2} color="#298FDA" loading />
            ) : (
              <ResponsiveLineChart data={videos} />
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default PantallaEstadisticas;
