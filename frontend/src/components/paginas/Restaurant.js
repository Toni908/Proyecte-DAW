import React, {Component} from 'react';
import axios from "axios";
import {HashLink} from "react-router-hash-link";

import Slider from "../components_interns/Slider";
import ModalShare from "../components_interns/ModalShare";
import ModalEtiquetas from "../components_interns/ModalEtiqutas";
import ModalUser from "../components_interns/ModalUser";
import FullCalendarReservas from "../components_interns/FullCalendarReservas";
import {useParams} from "react-router";

import icon_person from "../../img/icon_person.webp";
import schedule from "../components_interns/utilities/schedule";
import GalleryRestaurant from "../components_interns/GalleryRestaurant";
import Loading from "../components_interns/Loading";
import Menu from "./Menu";
import HeaderRestaurant from "./HeaderRestaurant";
import reservas_anticipacion from "../components_interns/utilities/reservas_anticipacion";
import SimpleMap from "../components_interns/SimpleMap";
import ImageRestaurant from "../components_interns/ImageRestaurant";
import HorarioScroll from "../components_interns/HorarioScroll";
import Translate from "../../locales/Translate";

import 'bootstrap/dist/css/bootstrap.min.css';
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import "./Restaurant.css";
import "./Menu.css";

const Restaurant = (props) => {
    return <Restaurante
        {...props}
        params={useParams()}
    />
};

class Restaurante extends Component {
    _isMounted = false;

    constructor() {
        super();

        this.state = {
            id: null,
            restaurant: {},
            infoAVG: [],
            comments: [],
            reservas: [],
            carta: [],
            horario: [],
            periodo: [],
            isLoading: false,
            error: null,
        };

        this.changeId = this.changeId.bind(this);
    }

    async changeId(id) {
        await this.setState({id: id});
    }

    async componentDidMount() {
        this._isMounted = true;

        let ip = process.env.REACT_APP_API_URL;
        this.setState({ isLoading: true });
        const { name } = this.props.params;

        const url = ip+"/restaurant/name/" + name;
        await axios.get(url)
            .then(result => this.changeId(result.data))
            .catch((error) => console.log(error))

        const request1 = axios.get(ip+"/restaurant/"+this.state.id);
        const request2 = axios.get(ip+"/reservas/avg/"+this.state.id);
        const request3 = axios.get(ip+"/card/"+this.state.id);
        const request4 = axios.get(ip+"/comments/"+this.state.id);
        const request5 = axios.get(ip+"/reservas/"+this.state.id);
        const request6 = axios.get(ip+"/horario/"+this.state.id)
        const request7 = axios.get(ip+"/periodo/"+this.state.id)

        axios.all([request1, request2,request3,request4,request5,request6,request7])
            .then(axios.spread((...responses) =>
                this.setState({
                    restaurant: responses[0].data,
                    infoAVG: responses[1].data["info"],
                    carta: responses[2].data,
                    comments: responses[3].data,
                    reservas: responses[4].data,
                    horario: responses[5].data,
                    periodo: responses[6].data,
                    isLoading: false
                })
            ))
            .catch(error => this.setState({
                error: error,
            }))
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    render() {
        const {restaurant,infoAVG,comments,reservas,carta,horario,periodo,isLoading,error} = this.state;
        let reservas_dias = reservas_anticipacion.getDayAnticipacion(restaurant.dies_anticipacion_reservas);

        let avg = null;
        if (infoAVG!==null || true) {
            avg = infoAVG;
        }

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
                            <div className={avg ? "d-flex flex-lg-row flex-column justify-content-lg-between justify-content-center" : "d-flex flex-lg-row flex-column justify-content-lg-end justify-content-center"}>
                                {avg!==null && <div className={"d-flex flex-row justify-content-lg-start justify-content-center"}>
                                    <i className="bi bi-star-fill color-TYPE-3 pe-2"/>
                                    <div className={"pe-1"}>{valoraciones(avg)}</div>
                                    ·
                                    <HashLink to="#comments" className="px-1 text-black">{avg["count"]} <Translate string={"ratings"}/></HashLink>
                                    ·
                                    <div className={"px-1"}>{restaurant.nombre_localidad}</div>
                                    ·
                                    <div className={"ps-1"}>{restaurant.nombre_municipio}</div>
                                </div>}
                                <div className={"pe-lg-5 p-lg-0 pt-2"}>
                                    <ModalShare restaurant={restaurant}/>
                                </div>
                            </div>
                        </section>
                        <GalleryRestaurant restaurant={restaurant} imgs={restaurant.imgs}/>
                        {/*TRADUCIDO DESDE AQUI PARA ARRIBA*/}
                        {restaurant.id_restaurante!==undefined &&
                        <section id={"menu"} className={"w-100 p-0 m-0 row pt-5 px-lg-0 px-5"}>
                            {carta["carta"]!==undefined &&
                            <div className={"col-lg-8 col-12"}>
                                <h2 className={"text-center py-2"}>{carta["carta"].nombre}</h2>
                                {!carta["carta"].usa_img && <Menu carta={carta["carta"]}/>}
                                {carta["carta"].usa_img===1 && <img className={"w-100 h-auto p-2"} src={process.env.REACT_APP_API_URL+"/image/"+restaurant.id_restaurante+"/"+carta["carta"].url_img} alt={carta["carta"].nombre}/>}
                                <hr className={"mx-3 mx-lg-0"}/>
                                {restaurant.etiquetas!==undefined &&
                                <div id={"info"} className={"py-2"}>
                                    <h3><Translate string={"information-title"}/>{restaurant.nombre}</h3>
                                    <div className={"row w-100 p-4"}>
                                        {restaurant.direccion!=="" && <div className={"py-2 col-lg-6 col-12 align-self-center"}><i className="bi bi-signpost pe-3"/><Translate string={"address"}/>: {restaurant.direccion_restaurante}</div>}
                                        <div className={"py-2 col-lg-6 col-12"}><i className="bi bi-house-door pe-3"/><Translate string={"locality"}/>: {restaurant.nombre_localidad}</div>
                                        <div className={"py-2 col-lg-6 col-12"}><i className="bi bi-building pe-3"/><Translate string={"municipality"}/>: {restaurant.nombre_municipio}</div>
                                        <div className={"py-2 col-lg-6 col-12"}><i className="bi bi-mailbox pe-3"/><Translate string={"postal-code"}/>: {restaurant.codigo_postal}</div>
                                        <div className={"py-2 col-lg-6 col-12"}><i className="bi bi-telephone-fill pe-3"/><Translate string={"phone"}/>: {restaurant.telefono_restaurante}</div>
                                        <div className={"py-2 col-lg-6 col-12"}><i className="bi bi-people-fill pe-3"/><Translate string={"capacity-max"}/>: {restaurant.aforo}</div>
                                    </div>
                                    <div className={"py-4"}>
                                        <ModalEtiquetas etiquetas={restaurant.etiquetas}/>
                                    </div>
                                </div>}
                            </div>}
                            <HorarioScroll restaurant={restaurant} />
                        </section>}
                        <hr id={"bookings"} className={"mx-3 mx-lg-0"}/>
                        <section className={"w-100 m-0 p-0 pb-5 pt-4 px-lg-0 px-5"}>
                            <h3 className={"text-center py-4"}><Translate string={"bookings-title"}/></h3>
                            <div className={"text-center pb-3"}>
                                <Translate string={"bookings-info"}/>
                                <br/>
                                <Translate string={"bookings-info-2"}/>
                                {reservas_dias}
                            </div>
                            {restaurant.dies_anticipacion_reservas !==undefined && restaurant.aforo !==undefined && restaurant.id_restaurante !==undefined && <FullCalendarReservas reservas={reservas} dia_minimo={restaurant.dies_anticipacion_reservas} aforo={restaurant.aforo} periodo={periodo} horario={horario} restaurant={restaurant}/>}
                        </section>
                        <hr id={"location"} className={"mx-3 mx-lg-0"}/>
                        <section className={"w-100 m-0 p-0 row pb-5 pt-4 px-lg-0 px-5"}>
                            <h4 className={"pt-4"}><Translate string={"location-restaurant"}/></h4>
                            <div className={"d-flex flex-row justify-content-lg-start justify-content-center pb-4"}>
                                <div className={"px-1"}>{restaurant.nombre_localidad}</div>
                                ·
                                <div className={"ps-1"}>{restaurant.nombre_municipio}</div>
                            </div>
                            {<SimpleMap class={"w-100 map-height"} lat={restaurant.latitud} lng={restaurant.longitud} zoom={11}/>}
                        </section>
                        <hr id={"comments"} className={"mx-3 mx-lg-0"}/>
                        {avg!==null && <section className={"w-100 m-0 px-lg-4 px-4 py-5"}>
                             <div className={"d-flex flex-row justify-content-lg-start justify-content-center align-self-center"}>
                                <i className="bi bi-star-fill fs-4 text-color-TYPE-1 pe-2"/>
                                <div className={"pe-1 fs-4"}>{valoraciones(avg)}</div>
                                <div className={"fs-4 h-100 align-self-center"}>·</div>
                                <HashLink to="#comments" className="px-1 text-black fs-4">{avg["count"]} <Translate string={"ratings"}/></HashLink>
                            </div>
                            {/*TRADUCIDO DESDE AQUI PARA ARRIBA*/}
                            <div className={"row w-100 px-3 fs-5 pt-3"}>
                                <div className={"col-lg-6 col-12"}>
                                    <div className={"d-flex flex-row justify-content-between px-2"}>
                                        <Translate string={"ratings-eat"}/>
                                        <div className={"w-100 d-flex flex-row justify-content-end align-self-center h-100"}>
                                            <Slider min={0} max={5} value={avg["valoracion_comida"]}/>
                                            <div className={"ps-2 align-self-center text-secondary fw-bold font-avg"}>{avg["valoracion_comida"]}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={"col-lg-6 col-12"}>
                                    <div className={"d-flex flex-row justify-content-between px-2"}>
                                        <Translate string={"ratings-service"}/>
                                        <div className={"w-100 d-flex flex-row justify-content-end align-self-center h-100"}>
                                            <Slider min={0} max={5} value={avg["valoracion_servicio"]}/>
                                            <div className={"ps-2 align-self-center text-secondary fw-bold font-avg"}>{avg["valoracion_servicio"]}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={"col-lg-6 col-12"}>
                                    <div className={"d-flex flex-row justify-content-between px-2 align-self-center h-100"}>
                                        <Translate string={"ratings-location"}/>
                                        <div className={"w-100 d-flex flex-row justify-content-end"}>
                                            <Slider min={0} max={5} value={avg["valoracion_sitio"]}/>
                                            <div className={"ps-2 align-self-center text-secondary fw-bold font-avg"}>{avg["valoracion_sitio"]}</div>
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
                        </section>}
                        {avg === null &&
                        <div className={"fw-bold pb-3"}>
                            <i className="bi bi-info-circle pe-2 fw-bold text-danger"/>
                            <Translate string={"no-comments"}/>
                        </div>
                        }
                        <hr className={"mx-3 mx-lg-0"}/>
                        <section id={"user"} className={"w-100 m-0 p-0 pb-5 pt-2 px-lg-0 px-5"}>
                            <div className={"d-flex flex-row fs-5 pb-4"}>
                                <ImageRestaurant class={"icon rounded-circle"} restaurante={restaurant}/>
                                <div className={"d-flex flex-column ps-3 align-self-center h-100"}>
                                    <div className={"fw-bold text-start"}><Translate string={"manager"}/> {restaurant.username}</div>
                                    <div className={"text-secondary text-start"}><Translate string={"form-booking-phone"}/> {restaurant.userphone}</div>
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
    return <div>{schedule.getMonthString(date.getMonth())} del {date.getFullYear()}</div>
}

function valoraciones(comments) {
    if (comments!==null) {
        let sitio = parseFloat(comments["valoracion_sitio"]);
        let servicio = parseFloat(comments["valoracion_servicio"]);
        let comida = parseFloat(comments["valoracion_comida"]);
        return ((sitio+servicio+comida)/3).toPrecision(3);
    } else {
        return 0;
    }
}

export default Restaurant
