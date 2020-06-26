import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

const ModalCrearServer = ({ onSubmit }) => {
  const [open, setOpen] = useState(false);
  const [server, setServer] = useState({
    nombre: "",
    url: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // eslint-disable-next-line no-shadow
    setServer((server) => ({ ...server, [name]: value }));
  };

  const saveAndClose = () => {
    setSubmitted(true);
    if (!server.nombre || !server.url) return;
    onSubmit(server);
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Agregar">
        <IconButton onClickCapture={handleClickOpen}>
          <AddCircleIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Agregar app server</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              autoFocus
              margin="dense"
              id="nombre"
              label="Nombre"
              type="text"
              name="nombre"
              value={server.nombre}
              onChange={handleChange}
              error={submitted && !server.nombre}
              helperText={submitted && !server.nombre && "Ingrese un nombre"}
            />
          </div>
          <div>
            <TextField
              autoFocus
              margin="dense"
              id="url"
              label="Url"
              type="text"
              name="url"
              value={server.url}
              onChange={handleChange}
              error={submitted && !server.url}
              helperText={submitted && !server.url && "Ingrese una url"}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={saveAndClose} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

ModalCrearServer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ModalCrearServer;
