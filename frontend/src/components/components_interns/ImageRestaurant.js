import React, { Component } from 'react';
import defaultImage from "../../no_image_available.jpg"

class ImageRestaurant extends Component {
    render() {
        if (this.props.restaurante.imgs.length>0) {
            return (
                <img key={this.props.restaurante.id_restaurante}
                     className={this.props.class}
                     src={process.env.REACT_APP_API_URL+"/image/"+this.props.restaurante.imgs[0].id_restaurante+ "/"+this.props.restaurante.imgs[0].url}
                     alt="Restaurant"
                />
            )
        } else {
            return (
                <img key={this.props.restaurante.id_restaurante}
                     className={this.props.class}
                     src={defaultImage}
                     alt="Restaurant"
                />
            )
        }
    }
}
export default ImageRestaurant