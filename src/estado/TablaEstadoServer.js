import React, { useState, useEffect } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import * as AuthServerService from "../comunications/AuthServerService";
import FilaEstadoServer from "./FilaEstadoServer";
import ProgresoCircular from "../components/ProgresoCircular";

import { useStyles } from "../components/styles";
import { StyledTableCell } from "../components/StyledTable";

const AUTH_SERVER = "https://chotuve-auth-server-g4.herokuapp.com";
const MEDIA_SERVER = "https://chotuve-media-server-g4.herokuapp.com";

const TablaEstadoServer = () => {
  const classes = useStyles();
  const [servidores, setServidores] = useState([
    { nombre: "auth-server", url: AUTH_SERVER },
    { nombre: "media-server", url: MEDIA_SERVER },
  ]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    obtenerAppServers();
  }, []);

  const obtenerAppServers = async () => {
    try {
      const response = await AuthServerService.obtenerAppServers();
      setServidores(servidores.concat(response));
    } catch (excepcion) {
      console.log(excepcion);
    }
    setCargando(false);
  };

  const renderTableHeaders = () => {
    const headers = ["Servidor", "Url", "Estado"];
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

  const renderTableBody = () => {
    return (
      <TableBody>
        {servidores.map(({ nombre, url }) => (
          <FilaEstadoServer key={nombre} nombre={nombre} url={url} />
        ))}
      </TableBody>
    );
  };

  return cargando ? (
    <ProgresoCircular />
  ) : (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        {renderTableHeaders()}
        {renderTableBody()}
      </Table>
    </TableContainer>
  );
};

export default TablaEstadoServer;
