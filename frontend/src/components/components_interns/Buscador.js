import React, { Component } from 'react';
import axios from "axios";
import Translate from "../../locales/Translate";

import './Buscador.css';
import Loading from "./Loading";

class Buscador extends Component {
    _isMounted = false;

    constructor() {

        super();

        this.state={
            etiquetas:[],
            municipios:[],
            isLoading: false,
            error: null
        }   

    }

    onChange(){
        this.recharge();
    }

    componentDidMount(){
        this._isMounted = true;
        var ip = process.env.REACT_APP_API_URL;
        const request1 = axios.get( ip + "/etiquetas");
        const request2 = axios.get( ip + "/localidad");

        axios.all([request1, request2])
            .then(axios.spread((...responses) =>
            {if (this._isMounted) {this.setState({
                etiquetas: responses[0].data,
                municipios: responses[1].data,
                isLoading: false
            })}}))
            .catch(error => this.setState({
                error: error,
            }))

        this.recharge();
    }

    componentWillUnmount() {
        this._isMounted = false;
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
      const {etiquetas,municipios,isLoading,error} = this.state;

      if (error) {
          return <p>{error.message}</p>;
      }
      if (isLoading) {
          return <Loading />;
      }

      return (
        <div className="mb-3 prueba">
            <div className='d-none'>
                <span id="et"><Translate string={'etiquetas'}/></span>
                <span id="lu"><Translate string={'lugar'}/></span>
                <span id="pre"><Translate string={'preu'}/></span>
            </div>
            <h1 className="text-center buscarTitulo"> <Translate string={'buscar'}/></h1>
            <div className="text-center mt-4">
                <div className="container">
                <div className='row'>
                <div className="d-flex w-auto justify-content-center mx-auto">
                <div className="container">
                <div className='row'>
                <div className="d-flex flex-row flex-wrap">
                    <div className='col-12 col-sm-12 col-md-4 p-2'>
                    <select name="labels" className="form-select inputBuscador w-80" aria-label="Default select example" onChange={this.props.changeEtiqueta}>
                        <option id="oet" value="null" defaultValue></option>
                    {etiquetas.map(elemento=>(
                            <option className="prueba" key={elemento.id_etiqueta} value={elemento.nombre}>{elemento.nombre}</option>
                        )

                        )}
                    </select>
                    </div>

                    <div className='col-12 col-sm-12 col-md-4 p-2'>
                    <select name="municipality" className="form-select inputBuscador w-80" aria-label="Default select example" onChange={this.props.changeSitio}>
                        <option id="olu" value="null" defaultValue></option>
                        {municipios.map(elemento=>(
                            <option key={elemento.nombre_municipio} value={elemento.nombre_municipio}>{elemento.nombre_municipio}</option>
                        )

                        )}
                    </select>
                    </div>

                    <div className='col-12 col-sm-12 col-md-4 p-2'>
                    <select name="price" className="form-select inputBuscador w-80" aria-label="Default select example" onChange={this.props.changePrecio}>
                        <option  id="opre" value="null" defaultValue></option>
                        <option value="1">0€ - 15€</option>
                        <option value="2">15€ - 60€</option>
                        <option value="3">60€+</option>
                    </select>
                    </div>
                    </div>
                    </div>

                </div>
                </div>
                </div>
                    </div>
                    <button className="text-center py-1 px-3 mt-4 w-auto buscarletra" onClick={this.props.filter}> Buscar </button>
            </div>
            </div>
            
    );
  }
}

export default Buscador;