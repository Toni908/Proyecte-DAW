import React, { Component } from 'react';
import defaultImage from "../../no-photo-available.jpg"

class ImageRestaurant extends Component {
    constructor() {
        super();
    }

    render() {
        if (this.props.restaurante.imgs.length>0) {
            return (
                <img key={this.props.restaurante.id_restaurante}
                     className="d-block w-100 height-img object-cover"
                     src={"/restaurantes-photos/"+this.props.restaurante.id_restaurante+ "/"+this.props.restaurante.imgs[0].url}
                     alt="First slide"
                />
            )
        } else {
            return (
                <img key={this.props.restaurante.id_restaurante}
                     className="d-block w-100 height-img object-cover"
                     src={defaultImage}
                     alt="First slide"
                />
            )
        }
    }
}
export default ImageRestaurant