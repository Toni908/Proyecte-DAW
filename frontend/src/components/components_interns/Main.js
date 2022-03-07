import React, { Component } from 'react';
import axios from 'axios';
import {Card} from "react-bootstrap";

import {Link} from "react-router-dom";

import CaruselRestaurant from "./CaruselRestaurant";
import ListRestaurant from "./ListRestaurant";
import Buscador from "./Buscador";
import Loading from "./Loading";
import city1 from "../../img/city1.webp"
import city3 from "../../img/city2.webp"
import city2 from "../../img/city3.webp"
import city4 from "../../img/city4.webp"
import Translate from "../../locales/Translate";

import './Buscador.css';
import './Main.css';
import ErrorNotFound from "./ErrorNotFound";

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
            etiquetas: null,
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

        if(!Array.isArray(this.state.BestRestaurants)){
            this.setState({BestRestaurants: Array.from(this.state.BestRestaurants)}); 
        }
    }

    async changeEtiqueta(e){
        if(e.target.value !== "null"){
            document.getElementById('click_redirect').hidden = false;
            await this.setState({etiquetas: e.target.value})
            document.getElementById('etiquetas').click();
        }
    }
    async changeSitio(e){
        if(e.target.value !== "null"){
            document.getElementById('click_redirect').hidden = false;
            await this.setState({sitio: e.target.value})
            document.getElementById('sitio').click();
        }
    }
    async changePrecio(e){
        if(e.target.value !== "null"){
            document.getElementById('click_redirect').hidden = false;
            await this.setState({precio: e.target.value})
            document.getElementById('precio').click();
        }
    }

    filter() {
        document.getElementById('click_redirect').hidden = false;
        document.getElementById('buscar').click();
    }

    render() {
        const { BestRestaurants, EconomicRestaurants, isLoading, error } = this.state;

        if (error) {
            return <ErrorNotFound error={error}/>;
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
                        <h3 className={"pt-5 mt-5 ps-1 title-principal"}><Translate string={"list-municipality"}/></h3>
                        <section className={"w-100 pt-4"}>
                            <section className={"w-100 m-0 p-0 max-w-full"}>
                                <div className={"row w-100 m-0"}>
                                    <article className={"col-lg-3 col-12 p-2 px-lg-2 px-4"}>
                                        <Link to={"/search/sitio/Manacor"} style={{ textDecoration: 'none' }}>
                                            <Card className={"border-0"}>
                                                <img className={'card-section-municipio w-100 round-card-top object-cover'} src={city1} alt={"Municipio"}/>
                                                <section className={"round-card card-section-municipio background-TYPE-2 w-100 ps-4 pt-4"}>
                                                    <h3 className={"text-white"}>Manacor</h3>
                                                    <p className={"text-white"}><Translate string={"search-municipality"}/> Manacor</p>
                                                </section>
                                            </Card>
                                        </Link>
                                    </article>
                                    <article className={"col-lg-3 col-12 p-2 px-lg-2 px-4"}>
                                        <Link to={"/search/sitio/Palma"} style={{ textDecoration: 'none' }}>
                                            <Card className={"border-0"}>
                                                <img className={'card-section-municipio w-100 round-card-top object-cover'} src={city2} alt={"Municipio"}/>
                                                <section className={"round-card card-section-municipio background-TYPE-4 w-100 ps-4 pt-4"}>
                                                    <h3 className={"text-white"}>Palma</h3>
                                                    <p className={"text-white"}><Translate string={"search-municipality"}/> Palma</p>
                                                </section>
                                            </Card>
                                        </Link>
                                    </article>
                                    <article className={"col-lg-3 col-12 p-2 px-lg-2 px-4"}>
                                        <Link to={"/search/sitio/Inca"} style={{ textDecoration: 'none' }}>
                                            <Card className={"border-0"}>
                                                <img className={'card-section-municipio w-100 round-card-top object-cover'} src={city3} alt={"Municipio"}/>
                                                <section className={"round-card card-section-municipio background-TYPE-1 w-100 ps-4 pt-4"}>
                                                    <h3 className={"text-white"}>Inca</h3>
                                                    <p className={"text-white"}><Translate string={"search-municipality"}/> Inca</p>
                                                </section>
                                            </Card>
                                        </Link>
                                    </article>
                                    <article className={"col-lg-3 col-12 p-2 px-lg-2 px-4"}>
                                        <Link to={"/search/sitio/Pollença"} style={{ textDecoration: 'none' }}>
                                            <Card className={"border-0"}>
                                                <img className={'card-section-municipio w-100 round-card-top object-cover'} src={city4} alt={"Municipio"}/>
                                                <section className={"round-card card-section-municipio background-TYPE-3 w-100 ps-4 pt-4"}>
                                                    <h3 className={"text-white"}>Arta</h3>
                                                    <p className={"text-white"}><Translate string={"search-municipality"}/> Arta</p>
                                                </section>
                                            </Card>
                                        </Link>
                                    </article>
                                </div>
                                <h2 className={"pt-5 mt-5 ps-1 title-principal fw-bold text-center w-100"}><Translate string={"title-of-list-restaurants"}/></h2>
                                <ListRestaurant idList={"1"} title={<Translate string={"best-restaurants"}/>} restaurants={BestRestaurants}/>
                                <ListRestaurant idList={"2"} title={<Translate string={"cheapest-restaurants"}/>} restaurants={EconomicRestaurants}/>
                            </section>
                        </section>
                    </div>
                </div>
                <div id={"click_redirect"} hidden>
                    <Link id={"etiquetas"} to={"/search/etiquetas/"+this.state.etiquetas}>Redirect</Link>
                    <Link id={"sitio"} to={"/search/sitio/"+this.state.sitio}>Redirect</Link>
                    <Link id={"precio"} to={"/search/precio/"+this.state.precio}>Redirect</Link>
                    <Link id={"buscar"} to={"/search"}>Redirect</Link>
                </div>
            </section>
        )
    }
}

export default Main