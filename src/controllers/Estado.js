import React, {Component} from 'react';
import {FilaEstadoServer} from '../components/FilaEstadoServer'
import Table from 'react-bootstrap/Table'

export class Estado extends Component{
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
                        </tr>
                    </thead>
                    <tbody>
                        <FilaEstadoServer server="authserver"></FilaEstadoServer>
                        <FilaEstadoServer server="appserver"></FilaEstadoServer>
                    </tbody>
                </Table>
            </div>
        )
    }
}
