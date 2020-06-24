import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";

import * as MediaServerService from "../comunications/MediaServerService";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const ModalEditarVideo = (props) => {
  // props
  const { onSubmit, videoId } = props;
  // Component state
  const [open, setOpen] = useState(false);
  const [video, setVideo] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const classes = useStyles();

  const handleClickOpen = () => {
    // eslint-disable-next-line no-use-before-define
    if (videoId) obtenerVideo(videoId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const obtenerVideo = () => {
    const response = MediaServerService.obtenerVideo(videoId);
    setVideo(response);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // eslint-disable-next-line no-shadow
    setVideo((video) => ({ ...video, [name]: value }));
  };

  const saveAndClose = () => {
    setSubmitted(true);
    if (!video.titulo) return;
    onSubmit(videoId, video);
    setOpen(false);
  };

  const opcionesVisbilidad = ["publico", "privado"];

  const renderOpcionesVibilidad = () => {
    return opcionesVisbilidad.map((option) => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ));
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
        <DialogTitle id="form-dialog-title">Editar video</DialogTitle>
        <DialogContent>
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <TextField
                required
                id="titulo"
                label="Titulo"
                name="titulo"
                value={video.titulo}
                onChange={handleChange}
                error={submitted && !video.titulo}
                helperText={submitted && !video.titulo && "Ingrese un título"}
              />
              <TextField
                id="descripcion"
                label="Descripción"
                name="descripcion"
                value={video.descripcion}
                onChange={handleChange}
              />
            </div>
            <div />
            <div>
              <TextField
                id="ubicacion"
                label="Ubicación"
                name="ubicacion"
                value={video.ubicacion}
                onChange={handleChange}
              />
              <TextField
                id="visibilidad"
                select
                label="Visibilidad"
                value={video.visibilidad}
                onChange={handleChange}
                name="visibilidad"
              >
                {renderOpcionesVibilidad()}
              </TextField>
            </div>
          </form>
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

ModalEditarVideo.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  videoId: PropTypes.string.isRequired,
};

export default ModalEditarVideo;
