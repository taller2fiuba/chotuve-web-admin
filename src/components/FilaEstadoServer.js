import React, { Component } from "react";
import requester from '../comunications/Requester'

// TODO: Tratar de mover
const servers = {
    authserver: 'http://localhost:28080',
    appserver: 'http://localhost:28080',
}

export class FilaEstadoServer extends Component{
    constructor(props){
        super(props)
        this.state = {
            estado: false,
        }

        this.handleApiResponse = this.handleApiResponse.bind(this);
    }

    componentDidMount() {
        this.getEstado(this.props.server);
    }

    render(){
        const nombreServidor = this.props.server;
        return(
            <tr>
                <td>{nombreServidor}</td>
                <td>{this.state.estado ? 'Ok' : 'Bad'}</td>
            </tr>
        )
    }

    handleApiResponse(response) {
        this.setState({estado: response['ping'] === 200})
    }

    getEstado(nombreServidor) {
        requester.getPing(servers[nombreServidor], this.handleApiResponse)
    }
}