import './main.css';
import front from '../../img/imgFront.jpg';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import React, { Component } from 'react';
import axios from 'axios';
import CaruselRestaurant from "./CaruselRestaurant";
import ImageRestaurant from "./ImageRestaurant";
import CardRestaurant from "./CardRestaurant";

class Main extends Component {
    constructor() {
        super();
        this.state = {
            restaurants: [],
            isLoading: false,
            error: null,
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        axios.get("http://www.restaurantemallorca.me:8000/bestrestaurants")
            .then(result => this.setState({
                restaurants: result.data,
                isLoading: false
            }))
            .catch(error => this.setState({
                error,
                isLoading: false
            }));}

    render() {
        const { restaurants, isLoading, error } = this.state;

        if (error) {
            return <p>{error.message}</p>;
        }

        if (isLoading) {
            return <p>Loading ...</p>;
        }

        // MORE RESTAURANTS
        if (restaurants.length>1) {
            return (
                <main className={"w-100"}>
                    <CaruselRestaurant restaurants={restaurants}/>
                    <section className={"w-100"}>
                        <section className={"w-100 h-100 pb-5 p-0 d-flex flex-row justify-content-center background-gradial-general"}>
                            <div className={"position-relative w-80"}>
                                <h2 className={"position-absolute bottom-0 text-center w-100 pb-5 text-black text-color-general"}>
                                    ¿TIenes un restaurante?
                                    <p>¡Puedes añadirlo para que <br/>todo el mundo pueda ver tu negocio!</p>
                                    <Button variant="outline-light" size="lg">Creador</Button>
                                </h2>
                                <img className="principal w-100" src={front} alt="front"/>
                            </div>
                        </section>
                    </section>
                    <section className={"container w-100 m-0 p-0 background-general max-w-full"}>
                        <div className={"row w-100 px-5 m-0"}>
                            {restaurants.map(function(item, key) {
                                if (key<6) {
                                    return (
                                        <article key={key} className={"col-6 h-100 p-5"}>
                                            <CardRestaurant restaurant={item}/>
                                        </article>
                                    )
                                }
                            })}
                        </div>
                    </section>
                </main>
            );
        }


        // SINGLE RESTAURANT
        if (restaurants.nombre!=null) {
            return (
                <div>
                    {restaurants.nombre}
                </div>
            )
        }

        // NULL RESTAURANTE
        return (
            <div>
                There is no image
            </div>
        )
    }
}

export default Main