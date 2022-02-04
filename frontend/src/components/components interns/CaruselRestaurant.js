import React, { Component } from 'react';
import {Carousel, Button} from "react-bootstrap";
import ImageRestaurant from "./ImageRestaurant";

class CaruselRestaurant extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Carousel className={"text-color-general height-Carousel p-4 py-0 mt-4"}>
                {this.props.restaurants.map(function(item, key) {
                    if (key<6) {
                        return (
                            <Carousel.Item key = {key}>
                                <ImageRestaurant restaurante={item}/>
                                <Carousel.Caption className={"text-color-general"}>
                                    <h2>
                                        ¿No tienes claro dónde ir?
                                        <p>{item.nombre}</p>
                                    </h2>
                                    <Button className={"mb-3"} variant="outline-light">Buscar</Button>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                    }
                })}
            </Carousel>
        );
    }
}

export default CaruselRestaurant