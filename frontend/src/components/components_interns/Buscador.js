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
        axios
            .get( ip + "/etiquetas")
            .then((response) => {
                console.log(window.location.href);
                this.setState({etiquetas: response.data});
            })
            .catch((error) => {
                console.log(error); 
            });
        
        axios
            .get( ip + "/localidad")
            .then((response) => {
                //console.log(response);
                this.setState({municipios: response.data});
            })
            .catch((error) => {
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
                        <option value="null" defaultValue>-- Etiquetas --</option>
                    {this.state.etiquetas.map(elemento=>( 
                            <option key={elemento.id_etiqueta} value={elemento.nombre}>{elemento.nombre}</option>
                        )

                        )}
                    </select>

                    <select name="municipality" className="form-select mx-4 inputBuscador w-auto" aria-label="Default select example" onChange={this.props.changeSitio}>
                        <option value="null" defaultValue>-- Lugares --</option>
                        {this.state.municipios.map(elemento=>( 
                            <option key={elemento.nombre_municipio} value={elemento.nombre_municipio}>{elemento.nombre_municipio}</option>
                        )

                        )}
                    </select>

                    <select name="price" className="form-select mx-4 inputBuscador w-auto" aria-label="Default select example" onChange={this.props.changePrecio}>
                        <option value="null" defaultValue>Precio</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                    </select>

                </div>
                    <button className="text-center py-1 px-3 mt-4 bg-white buscarletra" onClick={this.props.filter}> Buscar </button>
            </div>
        </div>
    );
  }
}

export default Buscador;