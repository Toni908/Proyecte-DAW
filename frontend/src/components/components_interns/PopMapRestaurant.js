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
                <PopoverHeader>
                    {this.props.restaurant.nombre}
                </PopoverHeader>
                <PopoverBody>
                    <SimpleMap />
                </PopoverBody>
            </UncontrolledPopover>
        )
    }
}

export default PopMapRestaurant