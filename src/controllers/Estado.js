import React, {Component} from 'react';
import {FilaEstadoServer} from '../components/FilaEstadoServer';
import Table from 'react-bootstrap/Table';
import authServerService from '../comunications/AutServerService';


// TODO: Mover a variable de ambiente
const AUTH_SERVER = 'https://chotuve-auth-server-g4.herokuapp.com';

export class Estado extends Component{
    constructor(props){
        super(props);
        this.state = {
            appservers : [],
        };

        this.handleApiResponse = this.handleApiResponse.bind(this);
    }

    componentDidMount() {   
        authServerService.getAppServers(this.handleApiResponse, (error) => console.log(error));
    }

    handleApiResponse(response) {
        this.setState({
            appservers: response,
        });
    }

    renderEstadoServers = () =>{
        const appservers = this.state.appservers;

        return appservers.map(server => {
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
            <div>
                <h1>Estado de los servidores</h1>
                <br></br>
                <Table  striped bordered hover>
                    <thead>
                        <tr>
                            <th>Servidor</th>
                            <th>Estado</th>
                            <th>Url</th>
                        </tr>
                    </thead>
                    <tbody>
                        <FilaEstadoServer nombre="authserver" url={AUTH_SERVER}></FilaEstadoServer>
                        {this.renderEstadoServers()}
                    </tbody>
                </Table>
            </div>
        )
    }
}
