import React, {Component} from "react";
import {UncontrolledPopover} from "reactstrap";
import {PopoverBody, PopoverHeader} from "react-bootstrap";

class PopoverRestaurant extends Component {
    render() {
        return(
            <UncontrolledPopover
                placement="bottom"
                target={"popover"+this.props.restaurant.id_restaurante}
                trigger="legacy"
            >
                <PopoverHeader>
                    Legacy Trigger
                </PopoverHeader>
                <PopoverBody>
                    <div className={"d-flex flex-row gap-2 pb-2 paraf_info_card"}>
                        <i className="ps-1 bi bi-telephone-inbound-fill"/><div className={"text-black fw-bold"}>{this.props.restaurant.telefono_restaurante}</div>
                    </div>
                    Legacy is a reactstrap special trigger value (outside of bootstrap's spec/standard). Before reactstrap correctly supported click and focus, it had a hybrid which was very useful and has been brought back as trigger="legacy". One advantage of the legacy trigger is that it allows the popover text to be selected while also closing when clicking outside the triggering element and popover itself.
                </PopoverBody>
            </UncontrolledPopover>
        )
    }
}

export default PopoverRestaurant