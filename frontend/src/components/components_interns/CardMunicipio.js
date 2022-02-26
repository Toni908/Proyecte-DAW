import {Card} from "react-bootstrap";
import React, {Component} from "react";
import './image.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./cardrestaurant.css";
import Image from "../../img/restaurante2.jpg";
import PopoverMunicipio from "./PopoverMunicipio";
import SimpleMap from "./SimpleMap";

class CardMunicipio extends Component {
    render() {
        return (
            <Card className={"myCarusel rounded rounded-3 mb-xxl-0 mb-4 OxigenFont"}>
                <SimpleMap class={"w-100"}/>
                <p className={"position-name-municipio"}>{this.props.municipio.nombre_municipio}</p>

                <section className={"d-flex flex-row justify-content-between px-5 w-100 more-info-card py-3"}>
                    <div className={"text-center"}>
                        <a className={"text-black"} href={"/search?municipio="+this.props.municipio.nombre_municipio}><i className="bi bi-search fs-4"/></a>
                    </div>
                    <div className={"vertical-line"}/>
                    <div className={"text-center h-100"}>
                        <a className={"text-black align-self-center h-100"} href={"/search?municipio="+this.props.municipio.nombre_municipio}>{this.props.municipio.nombre_municipio}</a>
                    </div>
                </section>
            </Card>
        )
    }
}

export default CardMunicipio