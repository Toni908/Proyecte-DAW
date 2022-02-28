import React, {Component} from "react";
import {Item} from "react-photoswipe-gallery";

class GalleryItem extends Component {
    render() {
            return (
                <Item
                    original={process.env.REACT_APP_API_URL+"/image/"+this.props.id_restaurante+"/"+this.props.img.url}
                    thumbnail={process.env.REACT_APP_API_URL+"/image/"+this.props.id_restaurante+"/"+this.props.img.url}
                    width="1024"
                    height="768"
                >
                    {({ ref, open }) => (
                        <img className={this.props.classes} height={"500"}
                             ref={ref}
                             onClick={open}
                             src={process.env.REACT_APP_API_URL+"/image/"+this.props.id_restaurante+"/"+this.props.img.url}
                             alt={"is a item"}
                        />
                    )}
                </Item>
            );
    }
}

export default GalleryItem;