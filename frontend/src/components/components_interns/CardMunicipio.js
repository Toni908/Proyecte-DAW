import {Card} from "react-bootstrap";
import React, {Component} from "react";
import './image.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./cardrestaurant.css";
import Image from "../../img/restaurante2.jpg";
import PopoverMunicipio from "./PopoverMunicipio";

class CardMunicipio extends Component {
    render() {
        return (
            <Card className={"myCarusel rounded rounded-3 mb-xxl-0 mb-4 OxigenFont"}>
                <img height={'image-height'} src={Image} alt={"Municipio"}/>
                <p className={"position-name-municipio"}>{this.props.municipio.nombre_municipio}</p>

                <section className={"d-flex flex-row justify-content-between px-5 w-100 more-info-card py-3"}>
                    <div className={"text-center"}>
                        <a className={"text-black"} href={"/search?municipio="+this.props.municipio.nombre_municipio}><i className="bi bi-geo-alt fs-4" /></a>
                    </div>
                    <div className={"vertical-line"}/>
                    <div className={"text-center"}>
                        <a className={"text-black"} href={"/search?municipio="+this.props.municipio.nombre_municipio}><i className="bi bi-eye fs-4"/></a>
                    </div>
                    <div className={"vertical-line"}/>
                    <div className={"text-center"}>
                        <i className="bi bi-info-circle fs-4" id={"municipio"+this.props.municipio.nombre_municipio}/>
                        <PopoverMunicipio municipio={this.props.municipio}/>
                    </div>
                </section>
            </Card>
        )
    }
}

export default CardMunicipio