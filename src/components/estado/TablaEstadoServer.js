import React, { Component } from "react";
import Table from 'react-bootstrap/Table';
import {FilaEstadoServer} from './FilaEstadoServer';
import authServerService from '../../comunications/AuthServerService';

// TODO: Mover a variable de ambiente
const AUTH_SERVER = 'https://chotuve-auth-server-g4.herokuapp.com';

export class TablaEstadoServer extends Component{
    constructor(props){
        super(props);
        this.state = {
            servers : [{nombre:"auth-server", url:AUTH_SERVER}],
        };

        this.handleApiResponse = this.handleApiResponse.bind(this);
    }
    
    componentDidMount() {   
        authServerService.getAppServers(this.handleApiResponse, (error) => console.log(error));
    }

    handleApiResponse(response) {
        const servers = this.state.servers;
        this.setState({
            servers: servers.concat(response),
        });
    }

    renderEstadoServers = () =>{
        const servers = this.state.servers;

        return servers.map(server => {
            const {nombre, url} = server;

            return(
                <FilaEstadoServer
                    key={nombre}
                    nombre={nombre}
                    url={url}
                />
            )
        })
    }

    render(){
        return(
            <Table  striped bordered hover>
                <thead>
                    <tr>
                        <th>Servidor</th>
                        <th>Estado</th>
                        <th>Url</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderEstadoServers()}
                </tbody>
            </Table>
        )
    }
}