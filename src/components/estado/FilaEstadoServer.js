import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import Requester from "../../comunications/Requester";

export default class FilaEstadoServer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      estado: false,
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
    this.setState({ estado: response.ping === 200 });
  }

  render() {
    return (
      <tr>
        <td>{this.props.nombre}</td>
        <td>
          {this.state.estado ? (
            <FontAwesomeIcon
              icon="check"
              size="2x"
              style={{ color: "green" }}
            />
          ) : (
            <FontAwesomeIcon icon="times" size="2x" style={{ color: "red" }} />
          )}
        </td>
        <td>{this.props.url}</td>
      </tr>
    );
  }
}

FilaEstadoServer.propTypes = {
  nombre: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
