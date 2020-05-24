import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import FilaEstadoServer from "./FilaEstadoServer";
import authServerService from "../../comunications/AuthServerService";

// TODO: Mover a variable de ambiente
const AUTH_SERVER = "https://chotuve-auth-server-g4.herokuapp.com";
const MEDIA_SERVER = "https://chotuve-media-server-g4.herokuapp.com/";

export default class TablaEstadoServer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servers: [
        { nombre: "auth-server", url: AUTH_SERVER },
        { nombre: "media-server", url: MEDIA_SERVER },
      ],
    };

    this.handleApiResponse = this.handleApiResponse.bind(this);
  }

  componentDidMount() {
    authServerService.getAppServers(this.handleApiResponse, (error) =>
      console.log(error)
    );
  }

  handleApiResponse(response) {
    const { servers } = this.state;
    this.setState({
      servers: servers.concat(response),
    });
  }

  renderEstadoServers() {
    const { servers } = this.state;

    return servers.map((server) => {
      const { nombre, url } = server;

      return <FilaEstadoServer key={nombre} nombre={nombre} url={url} />;
    });
  }

  render() {
    return (
      <div className="row col-8">
        <Table striped bordered hover responsive className="text-center">
          <thead>
            <tr>
              <th>Servidor</th>
              <th>Estado</th>
              <th>Url</th>
            </tr>
          </thead>
          <tbody>{this.renderEstadoServers()}</tbody>
        </Table>
      </div>
    );
  }
}
