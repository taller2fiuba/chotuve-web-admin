import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalDeshabilitar = (props) => {
  const { habilitado, deleteTrainer } = props;
  // Component state
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const saveAndClose = () => {
    deleteTrainer();
    setShow(false);
  };

  const accion = habilitado ? "Deshabilitar" : "Habilitar";

  return (
    <>
      <Button
        variant={habilitado ? "success" : "danger"}
        className="mr-2"
        onClick={handleShow}
      >
        {accion}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{accion}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro/a de {habilitado ? "deshabilitar" : "habilitar"} el
          usuario?
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

ModalDeshabilitar.propTypes = {
  deleteTrainer: PropTypes.func.isRequired,
  habilitado: PropTypes.bool.isRequired,
};

export default ModalDeshabilitar;
