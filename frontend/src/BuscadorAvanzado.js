import React, { Component } from 'react';
import axios from "axios";

import Buscador from "./components/components_interns/Buscador";
import Resultados from "./components/components_interns/Resultados";
import './components/components_interns/Buscador.css';
import {useParams} from "react-router";

const BuscadorAvanzado = (props) => {
    return <BuscadorAva
        {...props}
        params={useParams()}
    />
};

class BuscadorAva extends Component {

    constructor() {

        super();

        this.state={
            restaurantes:[],
            etiqueta: null,
            sitio: null,
            precio: null
        }   

        this.changeEtiqueta = this.changeEtiqueta.bind(this);
        this.changeSitio = this.changeSitio.bind(this);
        this.changePrecio = this.changePrecio.bind(this);
        this.filter = this.filter.bind(this);

    }

    componentDidMount(){
        const { type, name } = this.props.params;

        if (type==="etiquetas" || type==="sitio" || type==="precio") {
            this.getFilter(type, name)
        }
    }

    changeEtiqueta(e){
        if(e.target.value === "null"){
            this.setState({etiqueta: null});
        }else{
            this.setState({etiqueta: e.target.value});
        }
    }
    changeSitio(e){
        if(e.target.value === "null"){
            this.setState({sitio: null});
        }else{
            this.setState({sitio: e.target.value});
        }
    }
    changePrecio(e){
        if(e.target.value === "null"){
            this.setState({precio: null});
        }else{
            this.setState({precio: e.target.value});
        }
    }

    getFilter(type, name) {
        var data = {
            etiqueta: this.state.etiqueta,
            lugar: this.state.sitio,
            precio: this.state.precio
        }

        if (type==="etiquetas") {
            data.etiqueta = name;
        }
        if (type==="sitio") {
            data.lugar = name;
        }
        if (type==="precio") {
            data.precio = name;
        }

        var ip = process.env.REACT_APP_API_URL;

        axios({
            method: 'post',
            url: ip + '/filtrar',
            data: data
        })
            .then((response) => {
                console.log(response);
                this.setState({restaurantes: response.data});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    filter(){
        var data = {
            etiqueta: this.state.etiqueta,
            lugar: this.state.sitio,
            precio: this.state.precio
        }

        var ip = process.env.REACT_APP_API_URL;

        axios({
            method: 'post',
            url: ip + '/filtrar',
            data: data
        })
        .then((response) => {
            console.log(response);
            this.setState({restaurantes: response.data});
        })
        .catch((error) => {
            console.log(error); 
        });
        
    }
    
    render() {
        return(

            <div className='BuscadorAvanzado'>

                <Buscador changeEtiqueta={this.changeEtiqueta.bind(this)} 
                changeSitio={this.changeSitio.bind(this)}
                changePrecio={this.changePrecio.bind(this)}
                filter={this.filter.bind(this)}/>

                <Resultados restaurants={this.state.restaurantes}/>

            </div>
        );
    }
}

export default BuscadorAvanzado;
