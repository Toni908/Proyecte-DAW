import React, {Component} from 'react';
import axios from "axios";
import {HashLink} from "react-router-hash-link";

import Slider from "../components_interns/Slider";
import ModalShare from "../components_interns/ModalShare";
import ModalEtiquetas from "../components_interns/ModalEtiqutas";
import ModalUser from "../components_interns/ModalUser";

import GalleryRestaurant from "../components_interns/GalleryRestaurant";
import Loading from "../components_interns/Loading";
import Menu from "./Menu";
import HeaderRestaurant from "./HeaderRestaurant";
import reservas_anticipacion from "../components_interns/utilities/reservas_anticipacion";
import FullCalendarReservas from "../components_interns/FullCalendarReservas";
import SimpleMap from "../components_interns/SimpleMap";
import ImageRestaurant from "../components_interns/ImageRestaurant";
import HorarioScroll from "../components_interns/HorarioScroll";

import 'bootstrap/dist/css/bootstrap.min.css';
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import "./restaurant.css";
import "./menu.css";

import icon_person from "../../img/icon_person.png";


class Restaurant extends Component {
    _isMounted = false;

    constructor() {
        super();

        this.state = {
            restaurant: {},
            infoAVG: [],
            comments: [],
            reservas: [],
            carta: [],
            isLoading: false,
            error: null,
        };
    }

    componentDidMount() {
        this._isMounted = true;

        let ip = process.env.REACT_APP_API_URL;
        this.setState({ isLoading: true });
        let url = window.location.href;
        let l = url.split('/');
        let d = l.length-1;
        let id = l[d];

        const request1 = axios.get(ip+"/restaurant/"+id);
        const request2 = axios.get(ip+"/reservas/avg/"+id);
        const request3 = axios.get(ip+"/carta/"+id);
        const request4 = axios.get(ip+"/comments/"+id);
        const request5 = axios.get(ip+"/reservas/"+id);

        axios.all([request1, request2,request3,request4,request5])
            .then(axios.spread((...responses) =>
                {if (this._isMounted) {this.setState({
                    restaurant: responses[0].data,
                    infoAVG: responses[1].data["info"],
                    carta: responses[2].data,
                    comments: responses[3].data,
                    reservas: responses[4].data,
                    isLoading: false
                })}}))
            .catch(error => this.setState({
                error: error,
            }))
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    render() {
        const {restaurant,infoAVG,comments,reservas,carta,isLoading, error} = this.state;
        let reservas_dias = reservas_anticipacion.getDayAnticipacion(restaurant.dies_anticipacion_reservas);

        if (error) {
            return <p>{error.message}</p>;
        }
        if (isLoading) {
            return <Loading />;
        }

        return(
            <section className={"font-restaurant"} >
                <HeaderRestaurant restaurant={restaurant} />
                <div className={"d-flex flex-row justify-content-center w-100"}>
                    <div className={"d-flex flex-column main-width-restaurant ps-lg-0 m-0"}>
                        <section id={"start"} className={"d-flex flex-column text-lg-start text-center pb-3"}>
                            <h3 className={"w-100"}><i className="bi bi-building pe-3"/>{restaurant.nombre}</h3>
                            <div className={"d-flex flex-lg-row flex-column justify-content-lg-between justify-content-center"}>
                                <div className={"d-flex flex-row justify-content-lg-start justify-content-center"}>
                                    <i className="bi bi-star-fill text-color-TYPE-1 pe-2"/>
                                    <div className={"pe-1"}>{valoraciones(infoAVG)}</div>
                                    ·
                                    <HashLink to="#comments" className="px-1 text-black">{infoAVG["count"]} valoraciones</HashLink>
                                    ·
                                    <div className={"px-1"}>{restaurant.nombre_localidad}</div>
                                    ·
                                    <div className={"ps-1"}>{restaurant.nombre_municipio}</div>
                                </div>
                                <div className={"pe-lg-5 p-lg-0 pt-2"}>
                                    <ModalShare restaurant={restaurant}/>
                                </div>
                            </div>
                        </section>
                        <GalleryRestaurant restaurant={restaurant} imgs={restaurant.imgs}/>
                        {restaurant.id_restaurante!==undefined &&
                        <section id={"menu"} className={"w-100 p-0 m-0 row pt-5 px-lg-0 px-5"}>
                            {carta["carta"]!==undefined &&
                            <div className={"col-lg-8 col-12"}>
                                <h2 className={"text-center pb-2"}>{carta["carta"].nombre}</h2>
                                {!carta["carta"].usa_img && <Menu carta={carta}/>}
                                {carta["carta"].usa_img===1 && <img className={"w-100 h-auto p-2"} src={process.env.REACT_APP_API_URL+"/image/"+restaurant.id_restaurante+"/"+carta["carta"].url_img} alt={carta["carta"].nombre}/>}
                                <hr className={"mx-3 mx-lg-0"}/>
                                {restaurant.etiquetas!==undefined &&
                                <div id={"info"} className={"py-2"}>
                                    <h3>Que necesitas saber de {restaurant.nombre}</h3>
                                    <div className={"row w-100 p-4"}>
                                        {restaurant.direccion!=="" && <div className={"py-2 col-lg-6 col-12 align-self-center"}><i className="bi bi-signpost pe-3"/>Direccion: {restaurant.direccion}</div>}
                                        <div className={"py-2 col-lg-6 col-12"}><i className="bi bi-house-door pe-3"/>Localidad: {restaurant.nombre_localidad}</div>
                                        <div className={"py-2 col-lg-6 col-12"}><i className="bi bi-building pe-3"/>Municipio: {restaurant.nombre_municipio}</div>
                                        <div className={"py-2 col-lg-6 col-12"}><i className="bi bi-mailbox pe-3"/>Codigo Postal: {restaurant.codigo_postal}</div>
                                        <div className={"py-2 col-lg-6 col-12"}><i className="bi bi-telephone-fill pe-3"/>Telefono: {restaurant.telefono_restaurante}</div>
                                        <div className={"py-2 col-lg-6 col-12"}><i className="bi bi-people-fill pe-3"/>Aforo max:{restaurant.aforo}</div>
                                    </div>
                                    <div className={"py-4"}>
                                        <ModalEtiquetas etiquetas={restaurant.etiquetas}/>
                                    </div>
                                </div>}
                            </div>}
                            <HorarioScroll restaurant={restaurant} />
                        </section>}
                        <hr className={"mx-3 mx-lg-0"}/>
                        <section className={"w-100 m-0 p-0 pb-5 pt-2 px-lg-0 px-5"}>
                            <h3 className={"text-center py-4"}>¿Quieres realizar una reserva?</h3>
                            <div className={"text-center pb-3"}>Haz click el dia en el que quieres hacer la reserva y rellena el formulario!<br/> Ten encuenta que el restaurante <div className={"text-warning"}>solo acepta reservas desde el dia {reservas_dias}</div></div>
                            {restaurant.dies_anticipacion_reservas !==undefined && restaurant.aforo !==undefined && restaurant.id_restaurante !==undefined && <FullCalendarReservas reservas={reservas} dia_minimo={restaurant.dies_anticipacion_reservas} aforo={restaurant.aforo} id_restaurante={restaurant.id_restaurante}/>}
                        </section>
                        <hr className={"mx-3 mx-lg-0"}/>
                        <section id={"location"} className={"w-100 m-0 p-0 row pb-5 pt-2 px-lg-0 px-5"}>
                            <h4 className={"pt-4"}>¿Donde se encuentra el restaurante?</h4>
                            <div className={"d-flex flex-row justify-content-lg-start justify-content-center pb-4"}>
                                <div className={"px-1"}>{restaurant.nombre_localidad}</div>
                                ·
                                <div className={"ps-1"}>{restaurant.nombre_municipio}</div>
                            </div>
                            {<SimpleMap class={"w-100 map-height"} lat={restaurant.latitud} lng={restaurant.longitud} zoom={11}/>}
                        </section>
                        <hr className={"mx-3 mx-lg-0"}/>
                        <section id={"comments"} className={"w-100 m-0 px-lg-4 px-4 pb-5 pt-2"}>
                            <div className={"d-flex flex-row justify-content-lg-start justify-content-center align-self-center"}>
                                <i className="bi bi-star-fill fs-4 text-color-TYPE-1 pe-2"/>
                                <div className={"pe-1 fs-4"}>{valoraciones(infoAVG)}</div>
                                <div className={"fs-4 h-100 align-self-center"}>·</div>
                                <HashLink to="#comments" className="px-1 text-black fs-4">{infoAVG["count"]} valoraciones</HashLink>
                            </div>
                            <div className={"row w-100 px-3 fs-5 pt-3"}>
                                <div className={"col-lg-6 col-12"}>
                                    <div className={"d-flex flex-row justify-content-between px-2"}>
                                        Comida
                                        <div className={"w-100 d-flex flex-row justify-content-end align-self-center h-100"}>
                                            <Slider min={0} max={5} value={infoAVG["valoracion_comida"]}/>
                                            <div className={"ps-2 align-self-center text-secondary fw-bold font-avg"}>{infoAVG["valoracion_comida"]}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={"col-lg-6 col-12"}>
                                    <div className={"d-flex flex-row justify-content-between px-2"}>
                                        Servicio
                                        <div className={"w-100 d-flex flex-row justify-content-end align-self-center h-100"}>
                                            <Slider min={0} max={5} value={infoAVG["valoracion_servicio"]}/>
                                            <div className={"ps-2 align-self-center text-secondary fw-bold font-avg"}>{infoAVG["valoracion_servicio"]}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={"col-lg-6 col-12"}>
                                    <div className={"d-flex flex-row justify-content-between px-2 align-self-center h-100"}>
                                        Sitio
                                        <div className={"w-100 d-flex flex-row justify-content-end"}>
                                            <Slider min={0} max={5} value={infoAVG["valoracion_sitio"]}/>
                                            <div className={"ps-2 align-self-center text-secondary fw-bold font-avg"}>{infoAVG["valoracion_sitio"]}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={"row w-100 pt-5"}>
                                {comments.map(function (comment, key) {
                                    return(
                                        <div key={key} className={"col-lg-6 col-12"}>
                                            <div className={"d-flex flex-row px-2"}>
                                                <img className={"icon rounded-circle"} src={icon_person} alt={"Comment"}/>
                                                <div className={"ps-3 pt-2 d-flex flex-column"}>
                                                    <div className={"fw-bold"}>{comment.nombre}</div>
                                                    <div className={"text-secondary"} style={{fontSize: "13px"}}>{formatDate(comment.fecha)}</div>
                                                </div>
                                            </div>
                                            <div className={"pt-2 pb-4 ps-2"}>
                                                {comment.comentario}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </section>
                        <hr className={"mx-3 mx-lg-0"}/>
                        <section id={"user"} className={"w-100 m-0 p-0 pb-5 pt-2 px-lg-0 px-5"}>
                            <div className={"d-flex flex-row fs-5 pb-4"}>
                                <ImageRestaurant class={"icon rounded-circle"} restaurante={restaurant}/>
                                <div className={"d-flex flex-column ps-3 align-self-center h-100"}>
                                    <div className={"fw-bold text-start"}>Gerente: {restaurant.username}</div>
                                    <div className={"text-secondary text-start"}>Telefono: {restaurant.userphone}</div>
                                </div>
                            </div>
                            <div className={"py-4"}>
                                <ModalUser user={restaurant.username} restaurant={restaurant.nombre} email={restaurant.usercorreo}/>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        );
    }
}

function formatDate(fecha) {
    let date = new Date(fecha);
    return getMonthString(date.getMonth())+" del "+date.getFullYear();
}

function getMonthString(month) {
    switch (month) {
        case 0:
            return 'enero';
        case 1:
            return 'febrero';
        case 2:
            return 'marzo';
        case 3:
            return 'abril';
        case 4:
            return 'mayo';
        case 5:
            return 'junio';
        case 6:
            return 'julio';
        case 7:
            return 'agosto';
        case 8:
            return 'septiembre';
        case 9:
            return 'octubre';
        case 10:
            return 'noviembre';
        case 11:
            return 'diciembre';
        default:
            return null;
    }
}

function valoraciones(comments) {
    let sitio = parseFloat(comments["valoracion_sitio"]);
    let servicio = parseFloat(comments["valoracion_servicio"]);
    let comida = parseFloat(comments["valoracion_comida"]);
    return ((sitio+servicio+comida)/3).toPrecision(3);
}

export default Restaurant