import React, { Component } from 'react';
import axios from 'axios';
import CaruselRestaurant from "./CaruselRestaurant";
import ListRestaurant from "./ListRestaurant";
import Buscador from "./Buscador";
import Loading from "./Loading";
import Resultados from "./Resultados";
import {Card} from "react-bootstrap";
import city1 from "../../img/city1.jpeg"
import city3 from "../../img/city2.jpg"
import city2 from "../../img/city3.jpg"
import city4 from "../../img/city4.jpg"

import './Buscador.css';
import './main.css';
import {Link} from "react-router-dom";

class Main extends Component {
    constructor() {
        super();
        this.state = {
            BestRestaurants: [],
            EconomicRestaurants: [],
            bestCapitals: [],
            isLoading: false,
            error: null,
            buscador: 0,
            restaurantes:[],
            etiqueta: null,
            sitio: null,
            precio: null
        };
    }

    componentDidMount() {
        let ip = process.env.REACT_APP_API_URL;
        this.setState({ isLoading: true });

        const request1 = axios.get(ip+"/restaurants");
        const request2 = axios.get(ip+"/economic");

        axios.all([request1, request2]).then(axios.spread((...responses) => this.setState({
            BestRestaurants: responses[0].data,
            EconomicRestaurants: responses[1].data,
            isLoading: false
        }))).catch(error => this.setState({
            error: error,
        }))
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
        this.setState({buscador: 1});
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
        const { BestRestaurants, EconomicRestaurants, isLoading, error } = this.state;

        if (error) {
            return <p>{error.message}</p>;
        }
        if (isLoading) {
            return <Loading />;
        }

        return (
            <section className={"font-main"}>
                <div className={"d-md-block d-none"}>
                    <Buscador changeEtiqueta={this.changeEtiqueta.bind(this)} 
                    changeSitio={this.changeSitio.bind(this)}
                    changePrecio={this.changePrecio.bind(this)}
                    filter={this.filter.bind(this)}/>
                </div>
                {this.state.buscador === 0 &&
                <div className={"d-flex flex-row justify-content-center w-100"}>
                    <div className={"d-flex flex-column main-width"}>
                        <CaruselRestaurant restaurants={BestRestaurants}/>
                        <h3 className={"pt-5 mt-5 ps-1 title-principal"}>Municipos mas buscados</h3>
                        <section className={"w-100 pt-4"}>
                            <section className={"w-100 m-0 p-0 max-w-full"}>
                                <div className={"row w-100 m-0"}>
                                    <article className={"col-lg-3 col-12 p-2"}>
                                        <Link to={"/search?name=Manacor"} style={{ textDecoration: 'none' }}>
                                            <Card className={"border-0"}>
                                                <img className={'card-section-municipio w-100 round-card-top object-cover'} src={city1} alt={"Municipio"}/>
                                                <section className={"round-card card-section-municipio background-TYPE-2 w-100 ps-4 pt-4"}>
                                                    <h3 className={"text-white"}>Manacor</h3>
                                                    <p className={"text-white"}>Busca tu restaurante en Manacor</p>
                                                </section>
                                            </Card>
                                        </Link>
                                    </article>
                                    <article className={"col-lg-3 col-12 p-2"}>
                                        <Link to={"/search?name=Palma"} style={{ textDecoration: 'none' }}>
                                            <Card className={"border-0"}>
                                                <img className={'card-section-municipio w-100 round-card-top object-cover'} src={city2} alt={"Municipio"}/>
                                                <section className={"round-card card-section-municipio background-TYPE-4 w-100 ps-4 pt-4"}>
                                                    <h3 className={"text-white"}>Palma</h3>
                                                    <p className={"text-white"}>Busca tu restaurante en Palma</p>
                                                </section>
                                            </Card>
                                        </Link>
                                    </article>
                                    <article className={"col-lg-3 col-12 p-2"}>
                                        <Link to={"/search?name=Inca"} style={{ textDecoration: 'none' }}>
                                            <Card className={"border-0"}>
                                                <img className={'card-section-municipio w-100 round-card-top object-cover'} src={city3} alt={"Municipio"}/>
                                                <section className={"round-card card-section-municipio background-TYPE-1 w-100 ps-4 pt-4"}>
                                                    <h3 className={"text-white"}>Inca</h3>
                                                    <p className={"text-white"}>Busca tu restaurante en Inca</p>
                                                </section>
                                            </Card>
                                        </Link>
                                    </article>
                                    <article className={"col-lg-3 col-12 p-2"}>
                                        <Link to={"/search?name=Arta"} style={{ textDecoration: 'none' }}>
                                            <Card className={"border-0"}>
                                                <img className={'card-section-municipio w-100 round-card-top object-cover'} src={city4} alt={"Municipio"}/>
                                                <section className={"round-card card-section-municipio background-TYPE-3 w-100 ps-4 pt-4"}>
                                                    <h3 className={"text-white"}>Arta</h3>
                                                    <p className={"text-white"}>Busca tu restaurante en Arta</p>
                                                </section>
                                            </Card>
                                        </Link>
                                    </article>
                                </div>
                                <h2 className={"pt-5 mt-5 ps-1 title-principal fw-bold text-center w-100"}>Descubre Restaurantes</h2>
                                <ListRestaurant idList={"1"} title={"Los Mejores Restaurantes"} restaurants={BestRestaurants}/>
                                <ListRestaurant idList={"2"} title={"Los Mas Economicos"} restaurants={EconomicRestaurants}/>
                            </section>
                        </section>
                    </div>
                </div>}
                {this.state.buscador === 1 &&
                    <Resultados restaurants={this.state.restaurantes}/>
                }
            </section>

        )
    }
}

export default Main