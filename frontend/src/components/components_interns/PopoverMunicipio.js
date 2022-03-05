import React, {Component} from "react";
import {UncontrolledPopover} from "reactstrap";
import {PopoverHeader} from "react-bootstrap";
import "./Popover.css";

class PopoverMunicipio extends Component {
    render() {
        return(
            <UncontrolledPopover
                placement="top"
                target={"municipio"+this.props.municipio.nombre_municipio}
                trigger="legacy"
            >
                <PopoverHeader>
                    {this.props.municipio.nombre_municipio}
                </PopoverHeader>
            </UncontrolledPopover>
        )
    }
}

export default PopoverMunicipio