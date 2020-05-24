import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import Requester from "../../comunications/Requester";

export default class FilaEstadoServer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      estado: false,
      cargando: true,
    };

    this.handleApiResponse = this.handleApiResponse.bind(this);
  }

  componentDidMount() {
    this.getEstado(this.props.url);
  }

  getEstado(url) {
    Requester.getPing(url, this.handleApiResponse);
  }

  handleApiResponse(response) {
    this.setState({ estado: response.ping === 200, cargando: false });
  }

  render() {
    const { estado, cargando } = this.state;
    let valorEstado = "cargando";
    if (!cargando) {
      valorEstado = estado ? (
        <FontAwesomeIcon icon="check" size="2x" style={{ color: "green" }} />
      ) : (
        <FontAwesomeIcon icon="times" size="2x" style={{ color: "red" }} />
      );
    }

    return (
      <tr>
        <td>{this.props.nombre}</td>
        <td>{valorEstado}</td>
        <td>{this.props.url}</td>
      </tr>
    );
  }
}

FilaEstadoServer.propTypes = {
  nombre: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
