import React, { Component } from "react";
import requester from '../../comunications/Requester';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


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

    handleApiResponse(response) {
        this.setState({estado: response['ping'] === 200})
    }

    getEstado(url) {
        requester.getPing(url, this.handleApiResponse)
    }

    render(){
        return(
            <tr>
                <td>{this.props.nombre}</td>
                <td>{
                    this.state.estado ? 
                    <FontAwesomeIcon icon="check" size="2x" style={{color: 'green'}} /> :
                    <FontAwesomeIcon icon="times" size="2x" style={{color: 'red'}}/>
                    }
                </td>
                <td>{this.props.url}</td>
            </tr>
        )
    }
}