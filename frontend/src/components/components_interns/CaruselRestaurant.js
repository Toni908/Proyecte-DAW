import React, { Component } from 'react';
import {Carousel} from "react-bootstrap";
import './image.css'
import ImageRestaurant from "./ImageRestaurant";
import CaruselCaption from "./CaruselCaption";

class CaruselRestaurant extends Component {

    render() {
        return (
            <Carousel className={"text-color-general height-Carousel mt-4 ps-lg-0 pe-lg-0 ps-2 pe-2"}>
                {this.props.restaurants.map(function(item, key) {
                    if (key<6) {
                        return (
                            <Carousel.Item key = {key}>
                                <ImageRestaurant height={"height-img"} restaurante={item}/>
                                <CaruselCaption restaurante={item}/>
                            </Carousel.Item>
                        )
                    }
                    return("")
                })}
            </Carousel>
        );
    }
}

export default CaruselRestaurant