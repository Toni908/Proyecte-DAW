import React, { Component } from 'react';
import {Carousel, Button} from "react-bootstrap";
import "./CaruselCaption.css";
import Translate from "../../locales/Translate";

class CaruselCaption extends Component {

    render() {
        if (this.props.restaurante.imgs.length>0) {
            return (
                <Carousel.Caption>
                    <h2 className={"title-no-where"}><Translate string={"carusel-title"}/></h2>
                    <p className={"sub-title-no-where"}>{this.props.restaurante.nombre}</p>
                    <Button className={"mb-3 login shadow-node"} href={"/restaurant/"+this.props.restaurante.nombre}><Translate string={"carusel-button"}/></Button>
                </Carousel.Caption>
            )
        } else {
            return (
                <div hidden>
                    No image Available
                </div>
            )
        }
    }
}
export default CaruselCaption