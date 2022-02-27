import React, {Component} from 'react';
import axios from "axios";
import ModalShare from "../components_interns/ModalShare";
import GalleryRestaurant from "../components_interns/GalleryRestaurant";
import HorarioRestaurant from "../components_interns/HorarioRestaurant";
import Loading from "../components_interns/Loading";
import Menu from "./Menu";

import 'bootstrap/dist/css/bootstrap.min.css';
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import "./restaurant.css";
import "./menu.css";
import HeaderRestaurant from "./HeaderRestaurant";
import reservas_anticipacion from "../components_interns/utilities/reservas_anticipacion";
import ModalEtiquetas from "../components_interns/ModalEtiqutas";
import FullCalendarReservas from "../components_interns/FullCalendarReservas";

class Restaurant extends Component {
    _isMounted = false;

    constructor() {
        super();

        this.state = {
            restaurant: {},
            comments: [],
            carta: [],
            isLoading: false,
            error: null,
            header: false,
            hideTop: true
        };
        this.handleLoad = this.handleLoad.bind(this);
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
        const request2 = axios.get(ip+"/comments/restaurant/"+id);
        const request3 = axios.get(ip+"/carta/restaurant/"+id);

        axios.all([request1, request2,request3])
            .then(axios.spread((...responses) =>
                {if (this._isMounted) {this.setState({
                    restaurant: responses[0].data,
                    comments: responses[1].data["info"],
                    carta: responses[2].data,
                    isLoading: false
                })}}))
            .catch(error => this.setState({
                error: error,
            }))
        window.addEventListener('load', this.handleLoad);
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        this._isMounted = false;
        window.removeEventListener('load', this.handleLoad)
        window.removeEventListener("scroll", this.onScroll);
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
        const {restaurant,comments,carta,isLoading, error,header,hideTop} = this.state;
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
                        <section className={"w-100 m-0 p-0 row pb-5 pt-2 px-lg-0 px-5"}>
                            <h3 className={"text-center py-4"}>¿Quieres realizar una reserva?</h3>
                            <p className={"text-center"}>Haz click el dia en el que quieres hacer la reserva y rellena el formulario!</p>
                            <p className={"text-center"}>Ten encuenta que el restaurante solo acepta reservas desde el dia {reservas_dias}</p>
                            <FullCalendarReservas restaurant={restaurant} dia_minimo={reservas_dias}/>
                        </section>
                        <hr className={"mx-3 mx-lg-0"}/>
                        <section id={"location"} className={"w-100 m-0 p-0 row pb-5 pt-2 px-lg-0 px-5"}>
                            GOOGLE MAP
                        </section>
                        <hr className={"mx-3 mx-lg-0"}/>
                        <section id={"comments"} className={"w-100 m-0 p-0 row pb-5 pt-2 px-lg-0 px-5"}>
                            COMENTARIOS RESTAURANTE
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