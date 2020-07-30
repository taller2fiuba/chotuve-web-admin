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
    padding: theme.spacing(2),
  },
  formControl: {
    minWidth: 120,
  },
}));

const PantallaEstadisticas = () => {
  const classes = useStyles();
  const [escala, setEscala] = useState(7);
  const [videos, setVideos] = useState(null);
  const [usuarios, setUsuarios] = useState(null);
  const [reacciones, setReacciones] = useState(null);
  const [comentarios, setComentarios] = useState(null);

  useEffect(() => {
    const fechaFinal = new Date();
    const fechaInicio = new Date();
    fechaInicio.setDate(fechaFinal.getDate() - escala);
    // eslint-disable-next-line no-use-before-define
    cargarVideos(fechaInicio, fechaFinal);
    // eslint-disable-next-line no-use-before-define
    cargarUsuarios(fechaInicio, fechaFinal);
    // eslint-disable-next-line no-use-before-define
    cargarReaccionesYComentarios(fechaInicio, fechaFinal);
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
    return { id: titulo, color, data: datos.sort((a, b) => (a.x <= b.x) * -1) };
  };

  const cargarVideos = async (fechaInicio, fechaFinal) => {
    try {
      const estadisticas = await MediaServerService.obtenerEstadisticas(
        fechaInicio.toISOString().substring(0, 10),
        fechaFinal.toISOString().substring(0, 10)
      );
      const datos = armarDatos(estadisticas, "Videos", "hsl(13, 70%, 50%)");
      setVideos([datos]);
    } catch (error) {
      console.log("error videos");
      setVideos([]);
    }
  };

  const cargarUsuarios = async (fechaInicio, fechaFinal) => {
    try {
      const estadisticas = await AuthServerService.obtenerEstadisticas(
        fechaInicio.toISOString().substring(0, 10),
        fechaFinal.toISOString().substring(0, 10)
      );
      const datos = armarDatos(estadisticas, "Usuarios", "hsl(13, 70%, 50%)");
      setUsuarios([datos]);
    } catch (error) {
      console.log("error usuarios");
      setUsuarios([]);
    }
  };

  const cargarReaccionesYComentarios = async (fechaInicio, fechaFinal) => {
    try {
      const estadisticas = await Requester.obtenerEstadisticas(
        APP_SERVER_API,
        fechaInicio.toISOString().substring(0, 10),
        fechaFinal.toISOString().substring(0, 10)
      );
      let datos = armarDatos(
        estadisticas.comentarios,
        "Comentarios",
        "hsl(13, 70%, 50%)"
      );
      setComentarios([datos]);
      datos = armarDatos(
        estadisticas.reacciones,
        "Reacciones",
        "hsl(13, 70%, 50%)"
      );
      setReacciones([datos]);
    } catch (error) {
      console.log("error usuarios");
      setUsuarios([]);
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

  const mostrarGrafico = (datos, colorSchema) => {
    let result = <BeatLoader size={10} margin={2} color="#298FDA" loading />;
    if (datos !== null) {
      if (datos.length === 0) {
        result = <div>No se pudo cargar</div>;
      } else if (datos.length > 0) {
        result = (
          <ResponsiveLineChart
            data={datos}
            colorSchema={colorSchema}
            tick={`every ${Math.round(escala / 7)} days`}
          />
        );
      }
    }
    return result;
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
              colorFondo="#003f5c"
              icono="video_library"
              colorIcono="#789fba"
              obtenerTotal={() => historicoVideos()}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper} variant="outlined">
            <MediaCard
              titulo="Usuarios"
              subtitulo="465"
              colorFondo="#463c6b"
              icono="group"
              colorIcono="#a498c1"
              obtenerTotal={() => historicoUsuarios()}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper} variant="outlined">
            <MediaCard
              titulo="Reacciones"
              subtitulo="3800"
              colorFondo="#7d2f58"
              icono="thumb_up_alt"
              colorIcono="#ca91ad"
              obtenerTotal={() => historicoReacciones()}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper} variant="outlined">
            <MediaCard
              titulo="Comentarios"
              subtitulo="2000"
              colorFondo="#91362a"
              icono="chat"
              colorIcono="#d59587"
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
                <MenuItem value={7}>Última Semana</MenuItem>
                <MenuItem value={14}>Últimas 2 semanas</MenuItem>
                <MenuItem value={30}>Último mes</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Grid>

        <Grid container direction="row" item xs={12} sm={6} justify="center">
          <Paper
            className={classes.chart}
            style={{ backgroundColor: "#c2e7ff" }}
          >
            {mostrarGrafico(videos, "category10")}
          </Paper>
        </Grid>
        <Grid container direction="row" item xs={12} sm={6} justify="center">
          <Paper
            className={classes.chart}
            style={{ backgroundColor: "#e8ddff" }}
          >
            {mostrarGrafico(usuarios, "purpleRed_green")}
          </Paper>
        </Grid>
        <Grid container direction="row" item xs={12} sm={6} justify="center">
          <Paper
            className={classes.chart}
            style={{ backgroundColor: "#ffd6ea" }}
          >
            {mostrarGrafico(reacciones, "spectral")}
          </Paper>
        </Grid>
        <Grid container direction="row" item xs={12} sm={6} justify="center">
          <Paper
            className={classes.chart}
            style={{ backgroundColor: "#ffd7cd" }}
          >
            {mostrarGrafico(comentarios, "set1")}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default PantallaEstadisticas;
