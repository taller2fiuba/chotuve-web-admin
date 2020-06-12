import React, { useState, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
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
            <td />
          </tr>
        ))}
      </tbody>
    );
  };

  const renderTableHeaders = () => {
    const headers = [
      "Id",
      "Nombre",
      "Apellido",
      "Email",
      "Teléfono",
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
