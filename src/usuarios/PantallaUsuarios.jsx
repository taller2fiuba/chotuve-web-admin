import React, { useState, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";

import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";

import ModalEditarUsuario from "./ModalComponents/ModalEditar";
import ModalDeshabilitarUsuario from "./ModalComponents/ModalDeshabilitar";

import * as AuthServerService from "../comunications/AuthServerService";

const PantallaUsuarios = () => {
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

  const renderTableBody = () => {
    return (
      <tbody>
        {usuarios.map((usuario) => (
          <tr key={usuario.id}>
            <td>{usuario.id}</td>
            <td>{usuario.nombre}</td>
            <td>{usuario.apellido}</td>
            <td>{usuario.email}</td>
            <td>{usuario.telefono}</td>
            <td>
              {usuario.id % 2 === 0 ? (
                <DoneIcon fontSize="large" />
              ) : (
                <ClearIcon fontSize="large" />
              )}
            </td>
            <td>
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
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  const cambiarEstadoUsuario = (usuarioId, estadoViejo) => {
    console.log(usuarioId);
    console.log(estadoViejo);
  };

  const editarUsuario = (usuarioId, usuario) => {
    console.log(usuario);
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
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
    );
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Estado
      </Typography>
      <div>
        <div className="row col-8">
          {error.hayError && <Alert variant="danger">{error.mensaje}</Alert>}
          {usuarios && (
            <Table striped bordered hover>
              {renderTableHeaders()}
              {renderTableBody()}
            </Table>
          )}
        </div>
      </div>
    </Container>
  );
};

export default PantallaUsuarios;
