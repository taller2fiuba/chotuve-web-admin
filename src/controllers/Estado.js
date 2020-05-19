import React, {Component} from 'react';
import {TablaEstadoServer} from '../components/estado/TablaEstadoServer'

export class Estado extends Component{
    render(){
        return(
            <div>
                <h1>Estado de los servidores</h1>
                <TablaEstadoServer/>
            </div>
        )
    }
}
