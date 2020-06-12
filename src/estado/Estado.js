import React from "react";
import { Container, Typography } from "@material-ui/core";
import TablaEstadoServer from "./TablaEstadoServer";

export default () => {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Estados
      </Typography>
      <TablaEstadoServer />
    </Container>
  );
};
