import React, { useState, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Alert from "@material-ui/lab/Alert";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import TablePagination from "@material-ui/core/TablePagination";

import ModalDeshabilitar from "../components/ModalDeshabilitar";
import * as MediaServerService from "../comunications/MediaServerService";
import ModalEditarVideo from "./ModalEditarVideo";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const PantallaVideos = () => {
  const [videos, setVideos] = useState(null);
  const [error, setError] = useState({
    hayError: false,
    mensaje: "",
  });
  const [pagina, setPagina] = useState(0);
  const [filasPorPagina, setFilasPorPagina] = useState(5);
  const [videoEditado, setVideoEditado] = useState({
    titulo: "",
    descripcion: "",
    habilitado: false,
    ubicacion: "",
    duracion: 0,
  });

  const classes = useStyles();

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    obtenerVideos();
  }, [videoEditado]);

  const handleChangePage = (event, nuevaPagina) => {
    setPagina(nuevaPagina);
  };

  const handleChangeRowsPerPage = (event) => {
    setFilasPorPagina(parseInt(event.target.value, 10));
    setPagina(0);
  };

  const renderTableHeaders = () => {
    const headers = [
      "Título",
      "Descripción",
      "Ubicación",
      "Duración",
      "Visibilidad",
      "Habilitado",
      "Acciones",
    ];
    return (
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <StyledTableCell key={header}>{header}</StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const obtenerVideos = async () => {
    try {
      const videosResponse = await MediaServerService.obtenerVideos();
      setVideos(videosResponse);
    } catch (err) {
      setError({ hayError: true, mensaje: err.message });
    }
  };

  const cambiarEstado = (videoId, nuevoEstado) => {
    MediaServerService.cambiarEstado(videoId, nuevoEstado);
  };

  const editarVideo = async (videoId, video) => {
    try {
      await MediaServerService.editarVideo(videoId, video);
      setVideoEditado(video);
    } catch (excepcion) {
      setError({ hayError: true, mensaje: excepcion.message });
    }
  };

  const renderTableBody = () => {
    return (
      <TableBody>
        {videos
          .slice(
            pagina * filasPorPagina,
            pagina * filasPorPagina + filasPorPagina
          )
          .map((video) => (
            <StyledTableRow key={video._id}>
              <StyledTableCell>{video.titulo}</StyledTableCell>
              <StyledTableCell>{video.descripcion}</StyledTableCell>
              <StyledTableCell>{video.ubicacion}</StyledTableCell>
              <StyledTableCell>{video.duracion}</StyledTableCell>
              <StyledTableCell>{video.visibilidad}</StyledTableCell>
              <StyledTableCell>
                {video.habilitado ? (
                  <DoneIcon fontSize="large" />
                ) : (
                  <ClearIcon fontSize="large" />
                )}
              </StyledTableCell>
              <StyledTableCell>
                <ModalDeshabilitar
                  habilitado={video.habilitado}
                  entidad="video"
                  cambiarEstado={() =>
                    // eslint-disable-next-line no-use-before-define
                    cambiarEstado(video._id, !video.habilitado)
                  }
                />
                <ModalEditarVideo videoId={video._id} onSubmit={editarVideo} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
      </TableBody>
    );
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Estado
      </Typography>
      {error.hayError && <Alert severity="error">{error.mensaje}</Alert>}
      <br />
      {videos && (
        <>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              {renderTableHeaders()}
              {renderTableBody()}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={videos.length}
            page={pagina}
            onChangePage={handleChangePage}
            rowsPerPage={filasPorPagina}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            labelRowsPerPage="Videos por página"
            backIconButtonText="Página anterior"
            nextIconButtonText="Página siguiente"
          />
        </>
      )}
    </Container>
  );
};

export default PantallaVideos;
