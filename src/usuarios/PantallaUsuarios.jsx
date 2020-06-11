import React from "react";
import { Container, Typography } from "@material-ui/core";

const PantallaUsuarios = () => {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Usuarios
      </Typography>
      <Typography variant="body1" gutterBottom>
        <div>Tabla usuarios</div>
      </Typography>
    </Container>
  );
};

export default PantallaUsuarios;
