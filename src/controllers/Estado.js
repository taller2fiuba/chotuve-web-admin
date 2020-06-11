import React from "react";
import { Container, Typography } from "@material-ui/core";
import TablaEstadoServer from "../components/estado/TablaEstadoServer";

export default () => {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Estado
      </Typography>
      <Typography variant="body1" gutterBottom>
        <TablaEstadoServer />
      </Typography>
    </Container>
  );
};
