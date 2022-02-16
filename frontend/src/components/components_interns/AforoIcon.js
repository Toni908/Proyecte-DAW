import React, {Component} from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './aforo.css'

class AforoIcon extends Component {

    render() {
        return(
            <section className={'position-aforo fs-5'}>
                <div className={'aforo-color'}><i className="bi bi-person-fill"/>{this.props.restaurant.aforo}</div>
            </section>
        )
    }
}

export default AforoIcon;