import React, { useState, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Alert from "@material-ui/lab/Alert";

import * as AuthServerService from "../comunications/AuthServerService";
import ModalCrearServer from "./ModalCrearServer";
import ModalBorrarServer from "./ModalBorrarServer";
import AlertInformativa from "../components/AlertaInformativa";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const PantallaServers = () => {
  const [servers, setServers] = useState(null);
  const [error, setError] = useState({
    hayError: false,
    mensaje: "",
  });
  const [ultimoServer, setUltimoServer] = useState({ nombre: "", url: "" });
  const [informacionToken, setInformacionToken] = useState({
    hayToken: false,
    token: "",
  });

  const classes = useStyles();

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    obtenerServers();
  }, [ultimoServer]);

  const renderTableHeaders = () => {
    const headers = ["Nombre", "Url", "Acciones"];
    return (
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <StyledTableCell key={header}>{header}</StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const obtenerServers = async () => {
    try {
      const appServers = await AuthServerService.obtenerAppServers();
      setServers(appServers);
    } catch (exception) {
      setError({ hayError: true, mensaje: exception.message });
    }
  };

  const eliminarServer = async (serverId) => {
    try {
      await AuthServerService.eliminarServer(serverId);
      setUltimoServer({ nombre: "", url: "" });
    } catch (exception) {
      setError({ hayError: true, mensaje: exception.message });
    }
  };

  const handleCrearResponse = ({ token }) => {
    setInformacionToken({ hayToken: true, token });
  };

  const crearServer = async (server) => {
    try {
      const response = await AuthServerService.crearServer(server);
      setUltimoServer(server);
      handleCrearResponse(response);
    } catch (exception) {
      setError({ hayError: true, mensaje: exception.message });
    }
  };

  const renderTableBody = () => {
    return (
      <TableBody>
        {servers.map((server) => (
          <StyledTableRow key={server.id}>
            <StyledTableCell>{server.nombre}</StyledTableCell>
            <StyledTableCell>{server.url}</StyledTableCell>
            <StyledTableCell>
              <ModalBorrarServer onSubmit={() => eliminarServer(server.id)} />
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    );
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Servers
      </Typography>
      {error.hayError && <Alert severity="error">{error.mensaje}</Alert>}
      {informacionToken.hayToken && (
        <AlertInformativa
          onClose={() => setInformacionToken(false)}
          token={informacionToken.token}
        />
      )}
      <br />
      {servers && (
        <>
          <ModalCrearServer onSubmit={crearServer} />
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              {renderTableHeaders()}
              {renderTableBody()}
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
};

export default PantallaServers;
