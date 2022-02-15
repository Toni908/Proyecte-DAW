import {Button, Card} from "react-bootstrap";
import ImageRestaurant from "./ImageRestaurant";
import React, {Component} from "react";
import './image.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import HorarioRestaurant from "./HorarioRestaurant";
import AforoIcon from "./AforoIcon";

class CardRestaurant extends Component {
    constructor() {
        super();

        this.state = {
            horario: [],
            isLoading: false,
            error: null,
            showButtons: false
        };
    }

    render() {
        return (
            <Card className={"w-100 rounded rounded-3 mb-xxl-0 mb-4"}>
                <ImageRestaurant height={'image-height'} restaurante={this.props.restaurant}/>
                <AforoIcon restaurant={this.props.restaurant}/>
                <Card.Body>
                    <Card.Title className={"text-center p-2"}>{this.props.restaurant.nombre}</Card.Title>
                    <Card.Text>
                        <div className={"d-flex flex-row gap-4 pb-3"}>
                            <i className="ps-3 bi bi-geo-alt-fill"/><div className={"text-black fw-bold"}>{this.props.restaurant.direccion}</div><div className={"text-black fw-bold d-flex flex-row gap-2"}><div>/</div>{this.props.restaurant.localidad.nombre_municipio}</div>
                        </div>
                        <div className={"d-flex flex-row gap-4"}>
                            <i className="ps-3 bi bi-telephone-inbound-fill"/><div className={"text-black fw-bold"}>{this.props.restaurant.telefono_restaurante}</div>
                        </div>
                    </Card.Text>
                    <HorarioRestaurant restaurant={this.props.restaurant}/>
                    <div className={"d-flex flex-row gap-4 pt-2"}>
                        <div className={"text-warning"} id={this.props.restaurant.id_restaurante}>Displonible las reservas desde el {getDayAnticipacion(this.props.restaurant.dies_anticipacion_reservas)}</div>
                    </div>
                    <div className={"mt-3"}>
                        <Button variant="outline-dark">Ver Restaurante</Button>
                        <Button type={"button"} className={"ms-3"} variant={"outline-dark"}>Reservar</Button>
                    </div>
                </Card.Body>
            </Card>
        )
    }
}

function getDayAnticipacion(day) {
    var date = new Date().addDays(day);
    return date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

export default CardRestaurant
