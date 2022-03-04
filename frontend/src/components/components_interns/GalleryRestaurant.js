import React, {Component} from "react";
import {Gallery} from "react-photoswipe-gallery";
import GalleryItem from "./GalleryItem";

class GalleryRestaurant extends Component {
    render() {
        const {restaurant,imgs} = this.props;

        if (imgs!==undefined) {
            if (imgs.length===1) {
                return (
                    <section id={"photos"} className={"row m-0 pt-2"}>
                        {restaurant.id_restaurante!==undefined &&
                        <div className={"col-12"}>
                            {imgs[0]!==undefined &&
                            <Gallery>
                                <GalleryItem id_restaurante={restaurant.id_restaurante} img={imgs[0]} classes={"border-item1 w-100 p-0 px-2 px-lg-0 image-cover border-right-top border-right-bottom"}/>
                            </Gallery>}
                        </div>}
                    </section>
                )
            } else if (imgs.length===2) {
                return (
                    <section id={"photos"} className={"row m-0 pt-2"}>
                        {restaurant.id_restaurante!==undefined &&
                        <div className={"col-12"}>
                            {imgs[0]!==undefined &&
                            <Gallery>
                                <GalleryItem id_restaurante={restaurant.id_restaurante} img={imgs[0]} classes={"border-item1 w-50 p-0 px-2 px-lg-0 image-cover"}/>
                                <GalleryItem id_restaurante={restaurant.id_restaurante} img={imgs[1]} classes={"w-50 p-0 px-2 px-lg-0 image-cover border-right-top border-right-bottom"}/>
                            </Gallery>}
                        </div>}
                    </section>
                )
            } else  {
                return (
                    <section id={"photos"} className={"d-flex flex-column pt-2"}>
                        {restaurant.id_restaurante!==undefined &&
                        <div className={"w-100"}>
                            {imgs[0]!==undefined &&
                            <section className={"row p-0 m-0"}>
                                <div className={"col-lg-6 col-12 p-0 m-0"}>
                                    <Gallery>
                                        <GalleryItem id_restaurante={restaurant.id_restaurante} img={imgs[0]} classes={"border-item1 p-0 px-2 px-lg-0 width-image1 image-cover"}/>
                                    </Gallery>
                                </div>
                                <div className={"col-lg-6 col-12 row p-0 m-0"}>
                                    <Gallery>
                                        <div className={"p-0"}>
                                            {imgs.map(function(img, key) {
                                                if (key===0) {
                                                    return (
                                                        <div key={key} hidden>
                                                            <GalleryItem key={key}
                                                                         id_restaurante={restaurant.id_restaurante}
                                                                         img={img}
                                                                         classes={"pb-lg-1 px-lg-2 p-2 p-lg-0 image-cover width-image2"}/>
                                                        </div>
                                                    )
                                                } else {
                                                    if (key===1) {
                                                        return (
                                                            <span key={key}>
                                                            <GalleryItem key={key} id_restaurante={restaurant.id_restaurante} img={img} classes={"pb-lg-1 px-lg-2 p-2 p-lg-0 image-cover width-image2"}/>
                                                        </span>
                                                        )
                                                    } else if (key===2) {
                                                        return (
                                                            <span key={key}>
                                                            <GalleryItem key={key} id_restaurante={restaurant.id_restaurante} img={img} classes={"pb-lg-1 p-2 border-right-top image-cover p-lg-0 px-lg-1 width-image2"}/>
                                                        </span>
                                                        )
                                                    } else if (key===3) {
                                                        return (
                                                            <span key={key}>
                                                            <GalleryItem key={key} id_restaurante={restaurant.id_restaurante} img={img} classes={"pt-lg-1 p-2 px-lg-2 p-lg-0 image-cover width-image2"}/>
                                                        </span>
                                                        )
                                                    } else if (key===4) {
                                                        return (
                                                            <span key={key}>
                                                            <GalleryItem key={key} id_restaurante={restaurant.id_restaurante} img={img} classes={"border-right-bottom p-lg-0 image-cover pt-lg-1 p-2 px-lg-1 width-image2"}/>
                                                        </span>
                                                        )
                                                    } else {
                                                        return (
                                                            <span key={key}>
                                                            <GalleryItem key={key} id_restaurante={restaurant.id_restaurante} img={img} classes={"px-lg-1 pt-lg-1 p-lg-0 image-cover p-2 width-image2"}/>
                                                        </span>
                                                        )
                                                    }
                                                }
                                            })}
                                        </div>
                                    </Gallery>
                                </div>
                            </section>}
                        </div>}
                    </section>
                )
            }
        } else {
            return("<p id={\"photos\"}>Loading...</p>")
        }
    }
}

export default GalleryRestaurant