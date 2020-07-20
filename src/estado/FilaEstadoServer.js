import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import BeatLoader from "react-spinners/BeatLoader";
import Requester from "../comunications/Requester";

import { StyledTableCell, StyledTableRow } from "../components/StyledTable";

const FilaEstadoServer = ({ nombre, url }) => {
  const [estado, setEstado] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    const obtenerEstado = async () => {
      try {
        const response = await Requester.ping(url);
        setEstado(response.status === 200);
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };
    obtenerEstado();
  }, [url]);

  const renderEstado = () => {
    let valorEstado = (
      <BeatLoader size={10} margin={2} color="#298FDA" loading={cargando} />
    );

    if (!cargando) {
      valorEstado = estado ? (
        <FontAwesomeIcon icon="check" size="2x" style={{ color: "green" }} />
      ) : (
        <FontAwesomeIcon icon="times" size="2x" style={{ color: "red" }} />
      );
    }
    return valorEstado;
  };

  return (
    <StyledTableRow key={nombre}>
      <StyledTableCell>{nombre}</StyledTableCell>
      <StyledTableCell>{url}</StyledTableCell>
      <StyledTableCell>{renderEstado()}</StyledTableCell>
    </StyledTableRow>
  );
};

FilaEstadoServer.propTypes = {
  nombre: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default FilaEstadoServer;
