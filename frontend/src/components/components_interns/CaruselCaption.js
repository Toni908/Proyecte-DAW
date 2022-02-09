import React, { Component } from 'react';
import {Carousel, Button} from "react-bootstrap";

class CaruselCaption extends Component {
    constructor() {
        super();
    }

    render() {
        if (this.props.restaurante.imgs.length>0) {
            return (
                <Carousel.Caption className={"text-color-general"}>
                    <h2>
                        ¿No tienes claro dónde ir?
                        <p>{this.props.restaurante.nombre}</p>
                    </h2>
                    <Button className={"mb-3"} variant="outline-light">Buscar</Button>
                </Carousel.Caption>
            )
        } else {
            return (
                <div className={"d-none"}>
                    No image Available
                </div>
            )
        }
    }
}
export default CaruselCaption