import React, { Component } from 'react';

import Buscador from "./components/components_interns/Buscador";
import './components/components_interns/Buscador.css';

class BuscadorAvanzado extends Component {
    
    render() {
        return(

            <div className='BuscadorAvanzado'>

                <Buscador />

                <h1> Buscador Avanzado </h1>

            </div>
        );
    }
}

export default BuscadorAvanzado;