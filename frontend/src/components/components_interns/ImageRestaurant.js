import React, { Component } from 'react';
import defaultImage from "../../no_image_available.jpg"

class ImageRestaurant extends Component {
    render() {
        if (this.props.restaurante.imgs.length>0) {
            if (this.props.height!=null) {
                return (
                    <img key={this.props.restaurante.id_restaurante}
                         className={"d-block w-100 object-cover "+this.props.height}
                         src={"http://127.0.0.1:8080/restaurantes-photos/"+this.props.restaurante.imgs[0].id_restaurante+ "/"+this.props.restaurante.imgs[0].url}
                         alt="Restaurant"
                    />
                )
            } else {
                return (
                    <img key={this.props.restaurante.id_restaurante}
                         className={"d-block w-100 h-100 object-cover"}
                         src={"http://127.0.0.1:8080/restaurantes-photos/"+this.props.restaurante.imgs[0].id_restaurante+ "/"+this.props.restaurante.imgs[0].url}
                         alt="Restaurant"
                    />
                )
            }
        } else {
            if (this.props.height!=null) {
                return (
                    <img key={this.props.restaurante.id_restaurante}
                         className={"d-block w-100 object-cover "+this.props.height}
                         src={defaultImage}
                         alt="Restaurant"
                    />
                )
            } else {
                return (
                    <img key={this.props.restaurante.id_restaurante}
                         className="d-block w-100 image-height object-cover"
                         src={defaultImage}
                         alt="Restaurant"
                    />
                )
            }
        }
    }
}
export default ImageRestaurant