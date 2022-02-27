import React, {Component} from 'react';
import axios from "axios";
import {HashLink} from "react-router-hash-link";

import Slider from "../components_interns/Slider";
import ModalShare from "../components_interns/ModalShare";
import ModalEtiquetas from "../components_interns/ModalEtiqutas";

import GalleryRestaurant from "../components_interns/GalleryRestaurant";
import HorarioRestaurant from "../components_interns/HorarioRestaurant";
import Loading from "../components_interns/Loading";
import Menu from "./Menu";
import HeaderRestaurant from "./HeaderRestaurant";
import reservas_anticipacion from "../components_interns/utilities/reservas_anticipacion";
import FullCalendarReservas from "../components_interns/FullCalendarReservas";
import SimpleMap from "../components_interns/SimpleMap";

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
            header: false,
            hideTop: true
        };
        // this.handleLoad = this.handleLoad.bind(this);
        this.handleResize = this.handleResize.bind(this);
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
        const request3 = axios.get(ip+"/carta/restaurant/"+id);
        const request4 = axios.get(ip+"/comments/restaurant/"+id);
        const request5 = axios.get(ip+"/reservas/restaurant/"+id);

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
        // window.addEventListener('load', this.handleLoad);
        // window.addEventListener("scroll", this.onScroll);
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        this._isMounted = false;
        // window.removeEventListener('load', this.handleLoad)
        // window.removeEventListener("scroll", this.onScroll);
        window.removeEventListener('resize', this.handleResize);
    }

    handleLoad() {
        window.addEventListener("scroll", this.onScroll);
    }

    handleResize() {
        if (window.innerWidth<1250) {
            this.setState({ hideBottom: false });
        } else {
            this.setState({ hideBottom: true });
        }
    }

    onScroll = () => {
        // HEIGHT DEL MENU DONDE TIENE QUE PARAR DE VERSE EL HORARIO
        var MenuHeight = document.getElementById('menu').offsetHeight;
        var InfoHeight = document.getElementById('info').offsetHeight;
        var startHeight = document.getElementById('start').offsetHeight;
        var galleryHeight = document.getElementById('photos').offsetHeight;

        // 600 ES HEIGHT DE LA IMAGEN Y EL HEADER JUNTOS
        if (window.scrollY>600) {
            this.setState({ header: true });
        } else {
            this.setState({ header: false });
        }

        let menu = MenuHeight-InfoHeight;

        // HORARIO TOP
        if (window.scrollY<(menu+galleryHeight+startHeight-100)) {
            if (window.innerWidth<1300){
                this.setState({ hideTop: false });
            } else {
                this.setState({hideTop: true});
            }
        } else {
            this.setState({ hideTop: false });
        }
    };

    render() {
        const {restaurant,infoAVG,comments,reservas,carta,isLoading, error,header,hideTop} = this.state;
        let reservas_dias = reservas_anticipacion.getDayAnticipacion(restaurant.dies_anticipacion_reservas);

        if (error) {
            return <p>{error.message}</p>;
        }
        if (isLoading) {
            return <Loading />;
        }

        return(
            <section className={"font-restaurant"} >
                {header && <HeaderRestaurant heightCarta={document.getElementById('menu').offsetHeight} restaurant={restaurant} />}
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
                                    {restaurant.localidad !== undefined && <div className={"px-1"}>{restaurant.localidad.nombre_localidad}</div>}
                                    ·
                                    {restaurant.localidad !== undefined && <div className={"ps-1"}>{restaurant.localidad.nombre_municipio}</div>}
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
                                    {restaurant.localidad !== undefined &&
                                    <div className={"information-grid p-4"}>
                                        {restaurant.direccion!=="" && <div className={"py-2 w-100 align-self-center"}><i className="bi bi-signpost pe-3"/>Direccion: {restaurant.direccion}</div>}
                                        <div className={"py-2 w-100"}><i className="bi bi-house-door pe-3"/>Localidad: {restaurant.localidad.nombre_localidad}</div>
                                        <div className={"py-2 w-100"}><i className="bi bi-building pe-3"/>Municipio: {restaurant.localidad.nombre_municipio}</div>
                                        <div className={"py-2 w-100"}><i className="bi bi-mailbox pe-3"/>Codigo Postal: {restaurant.localidad.codigo_postal}</div>
                                        <div className={"py-2 w-100"}><i className="bi bi-telephone-fill pe-3"/>Telefono: {restaurant.telefono_restaurante}</div>
                                        <div className={"py-2 w-100"}><i className="bi bi-people-fill pe-3"/>Aforo max:{restaurant.aforo}</div>
                                    </div>}
                                    <div className={"py-4"}>
                                        <ModalEtiquetas etiquetas={restaurant.etiquetas}/>
                                    </div>
                                </div>}
                            </div>}
                            <div className={header ? "col-lg-4 col-12 px-lg-0 px-3 w-20 position-relative" : "col-lg-4 col-12 px-lg-0 px-3 w-20"}>
                                <div className={hideTop ? "z-index-10" : "postion-restaurant-bottom"}>
                                    <div className={hideTop && header ? "postion-horario-restaurant":""}>
                                        <HorarioRestaurant isSimple={true} onlyHeader={false} restaurant={restaurant}/>
                                    </div>
                                </div>
                            </div>
                        </section>}
                        <hr className={"mx-3 mx-lg-0"}/>
                        <section className={"w-100 m-0 p-0 pb-5 pt-2 px-lg-0 px-5"}>
                            <h3 className={"text-center py-4"}>¿Quieres realizar una reserva?</h3>
                            <p className={"text-center"}>Haz click el dia en el que quieres hacer la reserva y rellena el formulario!</p>
                            <p className={"text-center"}>Ten encuenta que el restaurante solo acepta reservas desde el dia {reservas_dias}</p>
                            <FullCalendarReservas restaurant={restaurant} dia_minimo={reservas_dias}/>
                        </section>
                        <hr className={"mx-3 mx-lg-0"}/>
                        <section id={"location"} className={"w-100 m-0 p-0 row pb-5 pt-2 px-lg-0 px-5"}>
                            <h4 className={"py-4"}>¿Donde se encuentra el restaurante?</h4>
                            {<SimpleMap class={"w-100 map-height"} lat={restaurant.latitud} lng={restaurant.longitud} zoom={11}/>}
                        </section>
                        <hr className={"mx-3 mx-lg-0"}/>
                        <section id={"comments"} className={"w-100 m-0 p-0 pb-5 pt-2 px-lg-0 px-5"}>
                            <div className={"d-flex flex-row justify-content-lg-start justify-content-center align-self-center"}>
                                <i className="bi bi-star-fill fs-4 text-color-TYPE-1 pe-2"/>
                                <div className={"pe-1 fs-4"}>{valoraciones(infoAVG)}</div>
                                <div className={"fs-4 h-100 align-self-center"}>·</div>
                                <HashLink to="#comments" className="px-1 text-black fs-4">{infoAVG["count"]} valoraciones</HashLink>
                            </div>
                            <div className={"row fs-5 pt-3"}>
                                <div className={"col-lg-6 col-12"}>
                                    <div className={"d-flex flex-row justify-content-between px-2"}>
                                        Comida
                                        <Slider min={0} max={5} value={infoAVG["valoracion_comida"]}/>
                                    </div>
                                </div>
                                <div className={"col-lg-6 col-12"}>
                                    <div className={"d-flex flex-row justify-content-between px-2"}>
                                        Servicio
                                        <Slider min={0} max={5} value={infoAVG["valoracion_servicio"]}/>
                                    </div>
                                </div>
                                <div className={"col-lg-6 col-12"}>
                                    <div className={"d-flex flex-row justify-content-between px-2"}>
                                        Sitio
                                        <Slider min={0} max={5} value={infoAVG["valoracion_sitio"]}/>
                                    </div>
                                </div>
                            </div>
                            <div className={"row pt-5"}>
                                {comments.map(function (comment, key) {
                                    return(
                                        <div key={key} className={"col-lg-6 col-12"}>
                                            <div className={"d-flex flex-row px-2"}>
                                                <img className={"icon"} src={icon_person} alt={"Comment"}/>
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