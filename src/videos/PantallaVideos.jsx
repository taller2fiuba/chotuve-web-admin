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

  const classes = useStyles();

  const renderTableHeaders = () => {
    const headers = [
      "Id",
      "Título",
      "Descripción",
      "Ubicación",
      "Duración",
      "Visibilidad",
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

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    obtenerVideos();
  }, []);

  const obtenerVideos = () => {
    setVideos([
      {
        id: "asd54da",
        titulo: "Mi primer video",
        descripcion: "Una descripción muy buena",
        ubicacion: "En mi casa",
        duracion: 600,
        visibilidad: "privado",
      },
    ]);
  };

  const renderTableBody = () => {
    return (
      <TableBody>
        {videos.map((video) => (
          <StyledTableRow key={video.id}>
            <StyledTableCell>{video.id}</StyledTableCell>
            <StyledTableCell>{video.titulo}</StyledTableCell>
            <StyledTableCell>{video.descripcion}</StyledTableCell>
            <StyledTableCell>{video.ubicacion}</StyledTableCell>
            <StyledTableCell>{video.duracion}</StyledTableCell>
            <StyledTableCell>{video.visibilidad}</StyledTableCell>
            <StyledTableCell />
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
      <br />
      <TableContainer component={Paper}>
        {videos && (
          <Table className={classes.table}>
            {renderTableHeaders()}
            {renderTableBody()}
          </Table>
        )}
      </TableContainer>
    </Container>
  );
};

export default PantallaVideos;
