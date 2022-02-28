import React, { Component } from 'react';
import {Carousel} from "react-bootstrap";
import './image.css'
import ImageRestaurant from "./ImageRestaurant";
import CaruselCaption from "./CaruselCaption";

class CaruselRestaurant extends Component {

    render() {
        return (
            <Carousel className={"height-Carousel shadow-text-black w-100 mt-4 ps-lg-0 pe-lg-0 ps-2 pe-2"}>
                {this.props.restaurants.map(function(item, key) {
                    return (
                        <Carousel.Item key = {key}>
                            <ImageRestaurant class={"border-image d-block w-100 object-cover height-img"} restaurante={item}/>
                            <CaruselCaption restaurante={item}/>
                        </Carousel.Item>
                    )
                })}
            </Carousel>
        );
    }
}

export default CaruselRestaurant