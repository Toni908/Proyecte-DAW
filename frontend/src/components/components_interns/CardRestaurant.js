import {Card} from "react-bootstrap";
import ImageRestaurant from "./ImageRestaurant";
import React, {Component} from "react";
import './image.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import HorarioRestaurant from "./HorarioRestaurant";
import "./cardrestaurant.css";
import PopoverRestaurant from "./PopoverRestaurant";
import PopMapRestaurant from "./PopMapRestaurant";
import reservas_anticipacion from "./utilities/reservas_anticipacion";

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
        let reservas = reservas_anticipacion.getDayAnticipacion(this.props.restaurant.dies_anticipacion_reservas);

        return (
            <Card className={"myCarusel rounded rounded-3 mb-xxl-0 mb-4 OxigenFont"} onMouseEnter={this.visible} onMouseLeave={this.noVisible}>
                <ImageRestaurant height={'image-height'} restaurante={this.props.restaurant}/>
                {this.props.restaurant.etiquetas!==undefined &&
                <Card.Body>
                    <div className={"position-relative"}>
                        <Card.Title className={"text-center p-2 pb-0  fw-bold"}>{this.props.restaurant.nombre}</Card.Title>
                        <div className={"d-flex flex-row pb-3 paraf_info_card"}>
                            <i className="ps-1 bi bi-geo-alt-fill"/><div className={"ps-2 text-black fw-bold"}>{this.props.restaurant.direccion}</div><div className={"text-black fw-bold d-flex flex-row gap-1"}><div>/</div>{this.props.localidad.nombre_municipio}</div>
                        </div>
                    </div>
                    <HorarioRestaurant isSimple={false} restaurant={this.props.restaurant}/>
                    {this.props.restaurant.etiquetas.length>0 &&
                        <div className={"row m-0 pt-2 p-0"}>
                            {this.props.restaurant.etiquetas.map(function(item, key) {
                                return (
                                    <div className={"col-4 border-color-TYPE-1 text-center rounded-pill"} key={key}>
                                        <a className={"text-decoration-none"} href={"/search?etiqueta="+item.nombre}>{item.nombre}</a>
                                    </div>
                                )
                            })}
                        </div>
                    }
                    {this.state.isShown && (
                        <div className={"d-flex flex-row gap-2 pt-2 paraf_info_card"}>
                            <div className={"text-warning"}>Disponible las reservas desde el {reservas}</div>
                        </div>
                    )}
                </Card.Body>}
                <section className={"d-flex flex-row justify-content-between px-5 w-100 more-info-card py-3"}>
                    <div className={"text-center"}>
                        <i className="bi bi-geo-alt fs-4" id={"popmap"+this.props.restaurant.id_restaurante}/>
                        <PopMapRestaurant restaurant={this.props.restaurant}/>
                    </div>
                    <div className={"vertical-line"}/>
                    <div className={"text-center"}>
                        <a className={"text-black"} href={"/restaurant/"+this.props.restaurant.id_restaurante}><i className="bi bi-eye fs-4"/></a>
                    </div>
                    <div className={"vertical-line"}/>
                    <div className={"text-center"}>
                        <i className="bi bi-info-circle fs-4" id={"popover"+this.props.restaurant.id_restaurante}/>
                        <PopoverRestaurant localidad={this.props.localidad} restaurant={this.props.restaurant}/>
                    </div>
                </section>
            </Card>
        )
    }
}

export default CardRestaurant
