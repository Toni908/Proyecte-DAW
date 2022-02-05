import React, { Component } from 'react';
import defaultImage from "../../no_image_available.jpg"

class ImageRestaurant extends Component {
    constructor() {
        super();
    }

    render() {
        if (this.props.restaurante.imgs.length>0) {
            return (
                <img key={this.props.restaurante.id_restaurante}
                     className="d-block w-100 height-img object-cover"
                     src={"http://127.0.0.1:8080/restaurantes-photos/"+this.props.restaurante.imgs[0].id_restaurante+ "/"+this.props.restaurante.imgs[0].url}
                     alt="Image"
                />
            )
        } else {
            return (
                <img key={this.props.restaurante.id_restaurante}
                     className="d-block w-100 height-img object-cover"
                     src={defaultImage}
                     alt="Image"
                />
            )
        }
    }
}
export default ImageRestaurant