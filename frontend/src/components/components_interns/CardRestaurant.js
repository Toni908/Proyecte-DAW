import {Button, Card} from "react-bootstrap";
import ImageRestaurant from "./ImageRestaurant";
import React, {Component} from "react";
import './image.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import HorarioRestaurant from "./HorarioRestaurant";
import "./cardrestaurant.css";
import PopoverRestaurant from "./PopoverRestaurant";

class CardRestaurant extends Component {
    constructor() {
        super();

        this.state = {
            isShown: false
        };

        this.visible = this.visible.bind(this);
        this.noVisible = this.noVisible.bind(this);
    }

    visible(){
        this.setState({isShown: true});
    }

    noVisible() {
        this.setState({isShown: false});
    }

    render() {
        return (
            <Card className={"myCarusel rounded rounded-3 mb-xxl-0 mb-4"} onMouseEnter={this.visible} onMouseLeave={this.noVisible}>
                <ImageRestaurant height={'image-height'} restaurante={this.props.restaurant}/>
                <Card.Body>
                    <div className={"position-relative"}>
                        <Card.Title className={"text-center p-2 pb-0"}>{this.props.restaurant.nombre}</Card.Title>
                        <div className={"d-flex flex-row pb-3 paraf_info_card"}>
                            <i className="ps-1 bi bi-geo-alt-fill"/><div className={"ps-2 text-black fw-bold"}>{this.props.restaurant.direccion}</div><div className={"text-black fw-bold d-flex flex-row gap-1"}><div>/</div>{this.props.localidad.nombre_municipio}</div>
                        </div>
                    </div>
                    <HorarioRestaurant restaurant={this.props.restaurant}/>
                    {this.state.isShown && (
                        <div className={"d-flex flex-row gap-2 pt-2 paraf_info_card"}>
                            <div className={"text-warning"}>Disponible las reservas desde el {getDayAnticipacion(this.props.restaurant.dies_anticipacion_reservas)}</div>
                        </div>
                    )}
                    <div className={"mt-3"}>
                        <Button variant="outline-dark">Ver Restaurante</Button>
                        <Button type={"button"} className={"ms-3"} id={"popover"+this.props.restaurant.id_restaurante} variant={"outline-dark"} >Reservar</Button>
                    </div>
                    <PopoverRestaurant restaurant={this.props.restaurant}/>
                </Card.Body>
            </Card>
        )
    }
}

function getDayAnticipacion(day) {
    var date = new Date();
    date.setDate(date.getDate() + day);
    return date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()
}

export default CardRestaurant
