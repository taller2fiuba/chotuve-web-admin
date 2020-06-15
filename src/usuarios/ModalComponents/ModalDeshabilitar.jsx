import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const ModalDeshabilitar = (props) => {
  const { habilitado, cambiarEstadoUsuario } = props;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveAndClose = () => {
    cambiarEstadoUsuario();
    handleClose();
  };

  const accion = habilitado ? "Deshabilitar" : "Habilitar";

  return (
    <div>
      <Button
        variant="contained"
        color={habilitado ? "secondary" : "primary"}
        onClick={handleClickOpen}
      >
        {accion}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{accion}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro/a de {habilitado ? "deshabilitar" : "habilitar"} el
            usuario?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={saveAndClose} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ModalDeshabilitar.propTypes = {
  cambiarEstadoUsuario: PropTypes.func.isRequired,
  habilitado: PropTypes.bool.isRequired,
};

export default ModalDeshabilitar;
