import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import BlockSharpIcon from "@material-ui/icons/BlockSharp";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { green } from "@material-ui/core/colors";

const ModalDeshabilitar = (props) => {
  const { habilitado, entidad, cambiarEstado } = props;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveAndClose = () => {
    cambiarEstado();
    handleClose();
  };

  const accion = habilitado ? "Deshabilitar" : "Habilitar";

  return (
    <>
      <Tooltip title={accion}>
        <IconButton onClickCapture={handleClickOpen}>
          {habilitado ? (
            <BlockSharpIcon color="secondary" />
          ) : (
            <VerifiedUserIcon style={{ color: green[500] }} />
          )}
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{accion}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro/a de {habilitado ? "deshabilitar" : "habilitar"} el{" "}
            {entidad}?
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
    </>
  );
};

ModalDeshabilitar.propTypes = {
  cambiarEstado: PropTypes.func.isRequired,
  habilitado: PropTypes.bool.isRequired,
  entidad: PropTypes.string.isRequired,
};

export default ModalDeshabilitar;
