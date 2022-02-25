import React, { Component } from 'react';
import {Carousel, Button} from "react-bootstrap";

class CaruselCaption extends Component {

    render() {
        if (this.props.restaurante.imgs.length>0) {
            return (
                <Carousel.Caption>
                    <h2>¿No tienes claro dónde ir?</h2>
                    <p>{this.props.restaurante.nombre}</p>
                    <Button className={"mb-3 login shadow-node"} href={"/restaurant/"+this.props.restaurante.id_restaurante}>Visitar</Button>
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