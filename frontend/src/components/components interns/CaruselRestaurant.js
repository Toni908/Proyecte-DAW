import React, { Component } from 'react';
import {Carousel, Button} from "react-bootstrap";
import ImageRestaurant from "./ImageRestaurant";
import CaruselCaption from "./CaruselCaption";

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
                                <ImageRestaurant height={"height-img"} restaurante={item}/>
                                <CaruselCaption restaurante={item}/>
                            </Carousel.Item>
                        )
                    }
                })}
            </Carousel>
        );
    }
}

export default CaruselRestaurant