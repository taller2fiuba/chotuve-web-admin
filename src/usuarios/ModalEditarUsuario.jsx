import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import * as AuthServerService from "../comunications/AuthServerService";

const ModalEditarUsuario = (props) => {
  // props
  const { onSubmit, usuarioId } = props;
  // Component state
  const [open, setOpen] = useState(false);
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
  });

  const handleClickOpen = () => {
    // eslint-disable-next-line no-use-before-define
    if (usuarioId) obtenerUsuario(usuarioId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const obtenerUsuario = async () => {
    const response = await AuthServerService.obtenerUsuario(usuarioId);
    setUsuario(response);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // eslint-disable-next-line no-shadow
    setUsuario((usuario) => ({ ...usuario, [name]: value }));
  };

  const saveAndClose = () => {
    onSubmit(usuarioId, usuario);
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Editar">
        <IconButton onClickCapture={handleClickOpen}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar usuario</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              autoFocus
              margin="dense"
              id={usuario.nombre}
              label="Nombre"
              type="text"
              name="nombre"
              value={usuario.nombre}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              autoFocus
              margin="dense"
              id={usuario.apellido}
              label="Apellido"
              type="text"
              name="apellido"
              value={usuario.apellido}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              autoFocus
              margin="dense"
              id={usuario.telefono}
              label="Teléfono"
              type="text"
              name="telefono"
              value={usuario.telefono}
              onChange={handleChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={saveAndClose} color="primary">
            Editar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

ModalEditarUsuario.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  usuarioId: PropTypes.number.isRequired,
};

export default ModalEditarUsuario;
