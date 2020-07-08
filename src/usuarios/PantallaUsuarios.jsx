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

import ModalDeshabilitar from "../components/ModalDeshabilitar";
import ModalEditarUsuario from "./ModalEditarUsuario";

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
  const [usuarioEditado, setUsuarioEditado] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
  });

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    obtenerUsuarios();
  }, [usuarioEditado]);

  const obtenerUsuarios = async () => {
    try {
      const response = await AuthServerService.obtenerUsuarios();
      setUsuarios(response);
    } catch (excepcion) {
      setError({ hayError: true, mensaje: excepcion.message });
    }
  };

  const editarUsuario = async (usuarioId, usuario) => {
    try {
      await AuthServerService.editarUsuario(usuarioId, usuario);
      setUsuarioEditado(usuario);
    } catch (excepcion) {
      setError({ hayError: true, mensaje: excepcion.message });
    }
  };

  const cambiarEstadoUsuario = async (usuarioId, nuevoEstado) => {
    try {
      await AuthServerService.cambiarEstadoUsuario(usuarioId, nuevoEstado);
      setUsuarioEditado({
        nombre: "",
        apellido: "",
        telefono: "",
      });
    } catch (excepcion) {
      setError({ hayError: true, mensaje: excepcion.message });
    }
  };

  const renderTableHeaders = () => {
    const headers = [
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
            <StyledTableCell>{usuario.nombre}</StyledTableCell>
            <StyledTableCell>{usuario.apellido}</StyledTableCell>
            <StyledTableCell>{usuario.email}</StyledTableCell>
            <StyledTableCell>{usuario.telefono}</StyledTableCell>
            <StyledTableCell>
              {usuario.habilitado ? (
                <DoneIcon fontSize="large" />
              ) : (
                <ClearIcon fontSize="large" />
              )}
            </StyledTableCell>
            <StyledTableCell>
              <ModalDeshabilitar
                entidad="usuario"
                cambiarEstado={() =>
                  // eslint-disable-next-line no-use-before-define
                  cambiarEstadoUsuario(usuario.id, !usuario.habilitado)
                }
                habilitado={usuario.habilitado}
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
          <Table className={classes.table}>
            {renderTableHeaders()}
            {renderTableBody()}
          </Table>
        )}
      </TableContainer>
    </Container>
  );
};

export default PantallaUsuarios;
