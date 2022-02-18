import React, { Component } from 'react';

import Buscador from "./components/components_interns/Buscador";
import './components/components_interns/Buscador.css';

class BuscadorAvanzado extends Component {

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
    filter(){
        alert("dfs");
        var data = {
            etiqueta: this.state.precio,
            lugar: this.state.sitio,
            precio: this.state.etiqueta
        }
    }
    
    render() {
        return(

            <div className='BuscadorAvanzado'>

                <Buscador changeEtiqueta={this.changeEtiqueta.bind(this)} 
                changeSitio={this.changeSitio.bind(this)}
                changePrecio={this.changePrecio.bind(this)}
                filter={this.filter.bind(this)}/>

                <h1> Buscador Avanzado </h1>

            </div>
        );
    }
}

export default BuscadorAvanzado;