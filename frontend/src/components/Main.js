import './main.css';
import restaurant1 from '../img/restaurante2.jpg';
import restaurant2 from '../img/restaurante3.jpg';
import restaurant3 from '../img/restaurante4.jpg';
import front from '../img/imgFront.jpg';
import {Carousel} from "react-bootstrap";
import { Button } from 'react-bootstrap';
import React, { Component } from 'react';
import axios from 'axios';

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
        axios.get("http://www.restaurantemallorca.me:8000/restaurants")
            .then(result => this.setState({
                restaurants: result.data.restaurants,
                isLoading: false
            }))
            .catch(error => this.setState({
                error,
                isLoading: false
            }));
    }

    render() {
        const { restaurants, isLoading, error } = this.state;

        if (error) {
            return <p>{error.message}</p>;
        }

        if (isLoading) {
            return <p>Loading ...</p>;
        }
        return (
            <main className={"w-100"}>
                <Carousel className={"text-color-general height-Carousel p-4 py-0 mt-4"}>
                    {restaurants.map(function(item, key) {
                        return (
                            <Carousel.Item>
                                <img
                                    className="d-block w-100 height-img object-cover"
                                    src={restaurant1}
                                    alt="First slide"
                                />
                                <Carousel.Caption className={"text-color-general"}>
                                    <h2>{item.id_restaurant}
                                        ¿No tienes claro dónde ir?
                                        <p>¡Te ayudamos a encontrarlo!</p>
                                    </h2>
                                    <Button className={"mb-3"} variant="outline-light">Buscar</Button>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                    })}

                    <Carousel.Item>
                        <img
                            className="d-block w-100 height-img object-cover"
                            src={restaurant2}
                            alt="Second slide"
                        />

                        <Carousel.Caption className={"text-color-general"}>
                            <h2>
                                ¿No tienes claro dónde ir?
                                <p>¡Te ayudamos a encontrarlo!</p>
                            </h2>
                            <Button className={"mb-3"} variant="outline-light">Buscar</Button>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 height-img object-cover"
                            src={restaurant3}
                            alt="Third slide"
                        />

                        <Carousel.Caption className={"text-color-general"}>
                            <h2>
                                ¿No tienes claro dónde ir?
                                <p>¡Te ayudamos a encontrarlo!</p>
                            </h2>
                            <Button className={"mb-3"} variant="outline-light">Buscar</Button>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <section className={"w-100"}>
                    <section className={"w-100 h-100 pb-5 p-0 d-flex flex-row justify-content-center background-gradial-general"}>
                        <div className={"position-relative w-80"}>
                            <h2 className={"position-absolute bottom-0 text-center w-100 pb-5 text-color-general"}>
                                ¿TIenes un restaurante?
                                <p>¡Puedes añadirlo para que <br/>todo el mundo pueda ver tu negocio!</p>
                                <Button variant="outline-light" size="lg">Creador</Button>
                            </h2>
                            <img className="principal w-100" src={front} alt="front"/>
                        </div>
                    </section>
                </section>
            </main>
        );
    }
}

export default Main