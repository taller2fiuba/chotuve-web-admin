import React, { useState } from "react";
import PropTypes from "prop-types";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import * as AuthServerService from "../../comunications/AuthServerService";

const ModalEditarUsuario = (props) => {
  // props
  const { onSubmit, usuarioId } = props;
  // Component state
  const [isOpen, setIsOpen] = useState(false);
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
  });

  const obtenerUsuario = () => {
    const response = AuthServerService.obtenerUsuario(usuarioId);
    setUsuario(response);
  };

  const handleShow = () => {
    if (usuarioId) obtenerUsuario(usuarioId);
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  const saveAndClose = () => {
    onSubmit(usuarioId, usuario);
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // eslint-disable-next-line no-shadow
    setUsuario((usuario) => ({ ...usuario, [name]: value }));
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Editar
      </Button>
      <Modal show={isOpen} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="nameId">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                onChange={handleChange}
                value={usuario.nombre}
              />
            </Form.Group>
            <Form.Group controlId="apellidoId">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                onChange={handleChange}
                value={usuario.apellido}
              />
            </Form.Group>
            <Form.Group controlId="telefonoId">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                onChange={handleChange}
                value={usuario.telefono}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={saveAndClose}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ModalEditarUsuario.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  usuarioId: PropTypes.number.isRequired,
};

export default ModalEditarUsuario;
