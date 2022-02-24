import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import axios from "axios";
import Loading from "../components_interns/Loading";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import { Gallery } from "react-photoswipe-gallery";
import "./restaurant.css";
import GalleryItem from "../components_interns/GalleryItem";
import ModalShare from "../components_interns/ModalShare";

class Restaurant extends Component {
    constructor() {
        super();

        this.state = {
            restaurant: {},
            comments: [],
            carta: [],
            id: 0,
            isLoading: false,
            error: null,
            show: false
        };
    }

    componentDidMount() {
        let ip = process.env.REACT_APP_API_URL;
        this.setState({ isLoading: true });
        let url = window.location.href;
        let l = url.split('/');
        let d = l.length-1;
        let id = l[d];

        const request1 = axios.get(ip+"/restaurant/"+id);
        const request2 = axios.get(ip+"/comments/restaurant/"+id);
        const request3 = axios.get(ip+"/carta/restaurant/"+id);

        axios.all([request1, request2,request3]).then(axios.spread((...responses) => this.setState({
            restaurant: responses[0].data,
            comments: responses[1].data["info"],
            carta: responses[2].data,
            id: responses[0].data.id_restaunrate,
            isLoading: false
        }))).catch(error => this.setState({
            error: error,
        }))
    }

    render() {
        const {restaurant,comments,carta,isLoading, error } = this.state;

        if (error) {
            return <p>{error.message}</p>;
        }
        if (isLoading) {
            return <Loading />;
        }

        return(
            <section className={"font-restaurant"}>
                <div className={"d-flex flex-row justify-content-center w-100"}>
                    <div className={"d-flex flex-column main-width-restaurant ps-lg-0 m-0"}>
                        <section className={"d-flex flex-column text-lg-start text-center pb-3"}>
                            <h3 className={"w-100"}><i className="bi bi-building pe-3"/>{restaurant.nombre}</h3>
                            <div className={"d-flex flex-lg-row flex-column justify-content-lg-between justify-content-center"}>
                                <div className={"d-flex flex-row justify-content-lg-start justify-content-center"}>
                                    <i className="bi bi-star-fill text-color-TYPE-1 pe-2"/>
                                    <div className={"pe-1"}>{valoraciones(comments)}</div>
                                    ·
                                    <a className={"px-1 text-black"} href={"#comentarios"}>{comments["count"]}  valoraciones</a>
                                    ·
                                    {restaurant.localidad !== undefined && <div className={"px-1"}>{restaurant.localidad.nombre_localidad}</div>}
                                    ·
                                    {restaurant.localidad !== undefined && <div className={"ps-1"}>{restaurant.localidad.nombre_municipio}</div>}
                                </div>
                                <div className={"pe-lg-5 p-lg-0 pt-2"}>
                                    <ModalShare restaurant={restaurant}/>
                                </div>
                            </div>
                        </section>
                        {restaurant.imgs!==undefined &&
                        <section className={"d-flex flex-column pt-2"}>
                            {restaurant.id_restaurante!==undefined &&
                            <div className={"w-100"}>
                                {restaurant.imgs[0]!==undefined &&
                                <section className={"row p-0 m-0"}>
                                    <div className={"col-lg-6 col-12 p-0 m-0"}>
                                        <Gallery>
                                            <GalleryItem id_restaurante={restaurant.id_restaurante} img={restaurant.imgs[0]} classes={"border-item1 p-0 px-2 px-lg-0 width-image1 image-cover"}/>
                                        </Gallery>
                                    </div>
                                    <div className={"col-lg-6 col-12 row p-0 m-0"}>
                                        <Gallery>
                                            <div className={"p-0"}>
                                                {restaurant.imgs.map(function(img, key) {
                                                    if (img.id_img===restaurant.imgs[0].id_img) {
                                                        return (
                                                            <div key={key} hidden>
                                                                <GalleryItem key={key} id_restaurante={restaurant.id_restaurante} img={img} classes={"pb-lg-1 px-lg-2 p-2 p-lg-0 image-cover width-image2"}/>
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
                                                                    <GalleryItem unique_key={key} id_restaurante={restaurant.id_restaurante} img={img} classes={"border-right-bottom p-lg-0 image-cover pt-lg-1 p-2 px-lg-1 width-image2"}/>
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
                        </section>}
                        <section>
                            // CARTAS
                        </section>
                    </div>
                </div>
            </section>
        );
    }
}

function valoraciones(comments) {
    let sitio = parseFloat(comments["valoracion_sitio"]);
    let servicio = parseFloat(comments["valoracion_servicio"]);
    let comida = parseFloat(comments["valoracion_comida"]);
    return ((sitio+servicio+comida)/3).toPrecision(3);
}

export default Restaurant