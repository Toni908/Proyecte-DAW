import React, { Component } from 'react';
import axios from "axios";
import Translate from "../../locales/Translate";

import './Buscador.css';

class Buscador extends Component {

    constructor() {

        super();

        this.state={
            etiquetas:[],
            municipios:[]
        }   

    }

    onChange(){
        this.recharge();
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

        this.recharge();
    }

    recharge(){
        var et = document.getElementById('et').textContent;
        var lu = document.getElementById('lu').textContent;
        var pre = document.getElementById('pre').textContent;

        document.getElementById('oet').textContent = et;
        document.getElementById('olu').textContent = lu;
        document.getElementById('opre').textContent = pre;
    }

  render() {
    return (
        <div className="mb-3">
            <div className='d-none'>
                <span id="et"><Translate string={'etiquetas'}/></span>
                <span id="lu"><Translate string={'lugar'}/></span>
                <span id="pre"><Translate string={'preu'}/></span>
            </div>
            <h1 className="text-center buscarTitulo"> <Translate string={'buscar'}/></h1>
            <div className="text-center mt-4">
                <div className="d-flex w-50 justify-content-center mx-auto">
                    <select name="labels" className="form-select mx-4 inputBuscador w-auto" aria-label="Default select example" onChange={this.props.changeEtiqueta}>
                        <option id="oet" value="null" defaultValue></option>
                    {this.state.etiquetas.map(elemento=>( 
                            <option key={elemento.id_etiqueta} value={elemento.nombre}>{elemento.nombre}</option>
                        )

                        )}
                    </select>

                    <select name="municipality" className="form-select mx-4 inputBuscador w-auto" aria-label="Default select example" onChange={this.props.changeSitio}>
                        <option id="olu" value="null" defaultValue></option>
                        {this.state.municipios.map(elemento=>( 
                            <option key={elemento.nombre_municipio} value={elemento.nombre_municipio}>{elemento.nombre_municipio}</option>
                        )

                        )}
                    </select>

                    <select name="price" className="form-select mx-4 inputBuscador w-auto" aria-label="Default select example" onChange={this.props.changePrecio}>
                        <option  id="opre" value="null" defaultValue></option>
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