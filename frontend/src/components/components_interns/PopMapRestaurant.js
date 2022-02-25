import React, {Component} from "react";
import {UncontrolledPopover} from "reactstrap";
import {PopoverBody, PopoverHeader} from "react-bootstrap";
import SimpleMap from "./SimpleMap";

class PopMapRestaurant extends Component {
    render() {
        return(
            <UncontrolledPopover
                placement="top"
                target={"popmap"+this.props.restaurant.id_restaurante}
                trigger="legacy"
            >
                <PopoverHeader className={"text-center"}>
                    {this.props.restaurant.nombre}
                </PopoverHeader>
                <PopoverBody className={"p-0 rounded-3"}>
                    <SimpleMap />
                </PopoverBody>
            </UncontrolledPopover>
        )
    }
}

export default PopMapRestaurant