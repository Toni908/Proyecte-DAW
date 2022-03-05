import React, { Component } from 'react';
import axios from 'axios';
import CaruselRestaurant from "./CaruselRestaurant";
import ListRestaurant from "./ListRestaurant";
import Buscador from "./Buscador";
import Loading from "./Loading";
import {Card} from "react-bootstrap";
import city1 from "../../img/city1.webp"
import city3 from "../../img/city2.webp"
import city2 from "../../img/city3.webp"
import city4 from "../../img/city4.webp"

import './Buscador.css';
import './Main.css';
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
            buscador: false,
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
        const request2 = axios.get(ip+"/cheapest");

        axios.all([request1, request2]).then(axios.spread((...responses) => this.setState({
            BestRestaurants: responses[0].data,
            EconomicRestaurants: responses[1].data,
            isLoading: false
        }))).catch(error => this.setState({
            error: error,
        }))
    }

    changeEtiqueta(e){
        if(e.target.value !== "null"){
            window.location.href = ("/search/etiquetas/"+e.target.value)
        }
    }
    changeSitio(e){
        if(e.target.value !== "null"){
            window.location.href = ("/search/sitio/"+e.target.value)
        }
    }
    changePrecio(e){
        if(e.target.value !== "null"){
            window.location.href = ("/search/precio/"+e.target.value)
        }
    }
    
    filter() {
        window.location.href = ("/search");
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
                <div className={"d-flex flex-row justify-content-center w-100"}>
                    <div className={"d-flex flex-column main-width"}>
                        <CaruselRestaurant restaurants={BestRestaurants}/>
                        <h3 className={"pt-5 mt-5 ps-1 title-principal"}>Municipos mas buscados</h3>
                        <section className={"w-100 pt-4"}>
                            <section className={"w-100 m-0 p-0 max-w-full"}>
                                <div className={"row w-100 m-0"}>
                                    <article className={"col-lg-3 col-12 p-2"}>
                                        <Link to={"/search/sitio/Manacor"} style={{ textDecoration: 'none' }}>
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
                                        <Link to={"/search/sitio/Palma"} style={{ textDecoration: 'none' }}>
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
                                        <Link to={"/search/sitio/Inca"} style={{ textDecoration: 'none' }}>
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
                                        <Link to={"/search/sitio/Pollença"} style={{ textDecoration: 'none' }}>
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
                </div>
            </section>

        )
    }
}

export default Main