import React, {Component} from "react";
import {UncontrolledPopover} from "reactstrap";
import {PopoverBody, PopoverHeader} from "react-bootstrap";
import "./popover.css";

class PopoverRestaurant extends Component {
    render() {
        return(
            <UncontrolledPopover
                placement="top"
                target={"popover"+this.props.restaurant.id_restaurante}
                trigger="legacy"
            >
                <PopoverHeader>
                    {this.props.restaurant.nombre}
                </PopoverHeader>
                <section style={{ height: 'auto', width: '250px' }}>
                    <PopoverBody>
                        <div className={"d-flex flex-row gap-2 pb-2 paraf_info_card"}>
                            <i className="ps-1 bi bi-telephone-inbound-fill"/><div className={"text-black"}>{this.props.restaurant.telefono_restaurante}</div>
                        </div>
                        <div className={"d-flex flex-row pb-2 paraf_info_card"}>
                            <i className="ps-1 bi bi-geo-alt-fill"/>
                            <div className={"d-flex flex-column"}>
                                <div className={"ps-2 text-black"}>{this.props.restaurant.direccion}</div>
                                <div>{this.props.localidad.nombre_municipio}</div>
                                <div>{this.props.localidad.direccion}</div>
                            </div>
                        </div>
                        <div className={"d-flex flex-row pb-3 paraf_info_card"}>
                            <i className="ps-1 bi bi-people-fill"/><div className={"ps-2 text-black"}>Aforo max: {this.props.restaurant.aforo}</div>
                        </div>
                    </PopoverBody>
                </section>
            </UncontrolledPopover>
        )
    }
}

export default PopoverRestaurant