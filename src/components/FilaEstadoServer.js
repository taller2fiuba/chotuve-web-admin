import React, { Component } from "react";
import requester from '../comunications/Requester';

export class FilaEstadoServer extends Component{
    constructor(props){
        super(props)
        this.state = {
            estado: false,
        }

        this.handleApiResponse = this.handleApiResponse.bind(this);
    }

    componentDidMount() {
        this.getEstado(this.props.url);
    }

    render(){
        return(
            <tr>
                <td>{this.props.nombre}</td>
                <td>{this.state.estado ? 'Ok' : 'Bad'}</td>
                <td>{this.props.url}</td>
            </tr>
        )
    }

    handleApiResponse(response) {
        this.setState({estado: response['ping'] === 200})
    }

    getEstado(url) {
        requester.getPing(url, this.handleApiResponse)
    }
}