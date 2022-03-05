import {Card} from "react-bootstrap";
import ImageRestaurant from "./ImageRestaurant";
import React, {Component} from "react";
import './image.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import HorarioRestaurant from "./HorarioRestaurant";
import "./cardrestaurant.css";
import {Link} from "react-router-dom";

class CardRestaurant extends Component {
    render() {
        return (
                <Card className={this.props.className}>
                    <Link to={"/restaurant/"+this.props.restaurant.nombre} style={{ textDecoration: 'none' }}>
                        <ImageRestaurant class={'border-image d-block w-100 object-cover image-height'} restaurante={this.props.restaurant}/>
                        {this.props.restaurant.etiquetas!==undefined &&
                        <Card.Body>
                            <div className={"position-relative"}>
                                <Card.Title className={"fw-bold text-black h-auto"}>{this.props.restaurant.nombre}</Card.Title>
                                <div className={"d-flex flex-row pb-2"}>
                                    <HorarioRestaurant isSimple={true} onlyHeader={true} restaurant={this.props.restaurant}/>
                                </div>
                                <div className={"d-flex flex-row pb-3 paraf_info_card w-100"}>
                                    <i className="ps-1 bi bi-geo-alt-fill"/><div className={"ps-2 text-black fw-bold"}>{this.props.restaurant.direccion}</div><div className={"text-black fw-bold d-flex flex-row gap-1"}><div>/</div>{this.props.localidad.nombre_municipio}</div>
                                </div>
                            </div>
                        </Card.Body>}
                    </Link>
                </Card>
        )
    }
}

export default CardRestaurant
