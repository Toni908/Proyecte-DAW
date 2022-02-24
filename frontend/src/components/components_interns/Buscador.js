import React, { Component } from 'react';
import axios from "axios";

import './Buscador.css';

class Buscador extends Component {

    constructor() {

        super();

        this.state={
            etiquetas:[],
            municipios:[]
        }   

    }

    componentDidMount(){
        var ip = process.env.REACT_APP_API_URL;
        const request1 = axios.get( ip + "/etiquetas");
        const request2 = axios.get( ip + "/localidad");

        axios.all([request1, request2]).then(axios.spread((...responses) => this.setState({
            etiquetas: responses[0].data,
            municipios: responses[1].data,
        }))).catch((error) => {
            console.log(error); 
        });
    }

  render() {
    return (
        <div className="mb-3">
            <h1 className="text-center buscarTitulo"> Buscar Restaurante</h1>
            <div className="text-center mt-4">
                <div className="d-flex w-50 justify-content-center mx-auto">
                    <select name="labels" className="form-select mx-4 inputBuscador w-auto" aria-label="Default select example" onChange={this.props.changeEtiqueta}>
                        <option value="null" defaultValue>Buscar por Etiqueta</option>
                    {this.state.etiquetas.map(elemento=>( 
                            <option key={elemento.id_etiqueta} value={elemento.nombre}>{elemento.nombre}</option>
                        )

                        )}
                    </select>

                    <select name="municipality" className="form-select mx-4 inputBuscador w-auto" aria-label="Default select example" onChange={this.props.changeSitio}>
                        <option value="null" defaultValue>Buscar por lugar</option>
                        {this.state.municipios.map(elemento=>( 
                            <option key={elemento.nombre_municipio} value={elemento.nombre_municipio}>{elemento.nombre_municipio}</option>
                        )

                        )}
                    </select>

                    <select name="price" className="form-select mx-4 inputBuscador w-auto" aria-label="Default select example" onChange={this.props.changePrecio}>
                        <option value="null" defaultValue>Precio medio</option>
                        <option value="15">$</option>
                        <option value="60">$$</option>
                        <option value="9999">$$$</option>
                    </select>

                </div>
                    <button className="text-center py-1 px-3 mt-4 buscarletra" onClick={this.props.filter}> Buscar </button>
            </div>
        </div>
    );
  }
}

export default Buscador;