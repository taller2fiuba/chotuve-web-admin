import React, { useState, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";

import ModalDeshabilitarUsuario from "./ModalComponents/ModalDeshabilitar";
import ModalEditarUsuario from "./ModalComponents/ModalEditar";

import * as AuthServerService from "../comunications/AuthServerService";

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

const PantallaUsuarios = () => {
  const classes = useStyles();

  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState({
    hayError: false,
    mensaje: "",
  });

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const response = await AuthServerService.obtenerUsuarios();
      setUsuarios(response);
    } catch (excepcion) {
      setError({ hayError: true, mensaje: excepcion.message });
    }
  };

  const editarUsuario = (usuarioId, usuario) => {
    console.log(usuario);
  };

  const cambiarEstadoUsuario = (usuarioId, estadoViejo) => {
    console.log(usuarioId);
    console.log(estadoViejo);
  };

  const renderTableHeaders = () => {
    const headers = [
      "Id",
      "Nombre",
      "Apellido",
      "Email",
      "Teléfono",
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

  const renderTableBody = () => {
    return (
      <TableBody>
        {usuarios.map((usuario) => (
          <StyledTableRow key={usuario.id}>
            <StyledTableCell>{usuario.id}</StyledTableCell>
            <StyledTableCell>{usuario.nombre}</StyledTableCell>
            <StyledTableCell>{usuario.apellido}</StyledTableCell>
            <StyledTableCell>{usuario.email}</StyledTableCell>
            <StyledTableCell>{usuario.telefono}</StyledTableCell>
            <StyledTableCell>
              {usuario.id % 2 === 0 ? (
                <DoneIcon fontSize="large" />
              ) : (
                <ClearIcon fontSize="large" />
              )}
            </StyledTableCell>
            <StyledTableCell>
              <ModalDeshabilitarUsuario
                cambiarEstadoUsuario={() =>
                  // eslint-disable-next-line no-use-before-define
                  cambiarEstadoUsuario(usuario.id, usuario.id % 2 === 0)
                }
                habilitado={usuario.id % 2 === 0}
              />
              {usuarios && (
                <ModalEditarUsuario
                  usuarioId={usuario.id}
                  // eslint-disable-next-line no-use-before-define
                  onSubmit={editarUsuario}
                />
              )}
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
      <TableContainer component={Paper}>
        {usuarios && (
          <Table className={classes.table} aria-label="customized table">
            {renderTableHeaders()}
            {renderTableBody()}
          </Table>
        )}
      </TableContainer>
    </Container>
  );
};

export default PantallaUsuarios;
