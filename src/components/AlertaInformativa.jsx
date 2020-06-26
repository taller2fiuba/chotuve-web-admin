import React from "react";
import PropTypes from "prop-types";

import { Alert, AlertTitle } from "@material-ui/lab";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const AlertInformativa = ({ onClose, token }) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    onClose();
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-info-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-info-title">Token de autorización</DialogTitle>
        <DialogContent>
          <Alert severity="info">
            <AlertTitle>Importante</AlertTitle>
            El siguiente token de autorización se mostrará una sola vez{" "}
            <strong>{token}</strong>
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AlertInformativa.propTypes = {
  onClose: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default AlertInformativa;