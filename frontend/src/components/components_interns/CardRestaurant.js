import {Button, Card} from "react-bootstrap";
import ImageRestaurant from "./ImageRestaurant";
import React, {Component} from "react";
import './image.css'
import HorarioRestaurant from "./HorarioRestaurant";

class CardRestaurant extends Component {
    constructor() {
        super();

        this.state = {
            horario: [],
            isLoading: false,
            error: null,
        };
    }

    render() {
        return (
            <Card className={"w-100"}>
                <ImageRestaurant height={'image-height'} restaurante={this.props.restaurant}/>
                <Card.Body>
                    <Card.Title className={"text-center"}>{this.props.restaurant.nombre}</Card.Title>
                    <Card.Text>
                        <div className={"d-flex flex-row gap-2"}>
                            Direccion: <div className={"text-black fw-bold text-decoration-none"}>{this.props.restaurant.direccion}</div>
                        </div>
                        <div className={"d-flex flex-row gap-2"}>
                            Telefono: <div className={"text-black fw-bold text-decoration-none"}>{this.props.restaurant.telefono_restaurante}</div>
                        </div>
                    </Card.Text>
                    <HorarioRestaurant restaurant={this.props.restaurant}/>
                    <div className={"mt-3"}>
                        <Button variant="outline-dark">Ver Restaurante</Button>
                        <Button className={"ms-3"} variant={"outline-dark"}>Reservar</Button>
                    </div>
                </Card.Body>
            </Card>
        )
    }
}

export default CardRestaurant
