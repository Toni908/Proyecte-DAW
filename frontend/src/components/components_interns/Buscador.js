import React, { Component } from 'react';
import axios from "axios";

import './Buscador.css';

class App extends Component {
    state={
        etiquetas:[],
        municipios:[]
    }
    componentDidMount(){
        axios
            .get("http://127.0.0.1:8000/etiquetas")
            .then((response) => {
                console.log(response);
                
                this.setState({etiquetas: response.data});
            })
            .catch((error) => {
                console.log(error); 
            });
        
        axios
            .get("http://127.0.0.1:8000/localidad")
            .then((response) => {
                console.log(response);
                
                this.setState({municipios: response.data});
            })
            .catch((error) => {
                console.log(error); 
            });
    }

  render() {
    return (
        <div className="p-3 mb-3">
            <h1 className="text-center buscarTitulo"> Buscar Restaurante</h1>
            <div className="text-center mt-4">
                <form className="d-flex w-50 justify-content-center mx-auto">
                    <select name="labels" className="form-select mx-4 inputBuscador w-auto" aria-label="Default select example">
                        <option defaultValue>-- Etiquetas --</option>
                    {this.state.etiquetas.map(elemento=>( 
                            <option key={elemento.id_etiqueta} value={elemento.nombre}>{elemento.nombre}</option>
                        )

                        )}
                    </select>

                    <select name="municipality" className="form-select mx-4 inputBuscador w-auto" aria-label="Default select example">
                    <option  defaultValue>-- Lugares --</option>
                        {this.state.municipios.map(elemento=>( 
                            <option key={elemento.nombre_municipio} value={elemento.nombre_municipio}>{elemento.nombre_municipio}</option>
                        )

                        )}
                    </select>

                    <select name="price" className="form-select mx-4 inputBuscador w-auto" aria-label="Default select example">
                        <option defaultValue>Precio</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                    </select>
                </form>
            </div>
        </div>
    );
  }
}

export default App;