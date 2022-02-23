import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import axios from "axios";
import "./restaurant.css";
import Loading from "../components_interns/Loading";

class Restaurant extends Component {
    constructor() {
        super();

        this.state = {
            restaurant: {},
            comments: [],
            carta: [],
            isLoading: false,
            error: null,
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
            <section>
                <div className={"d-flex flex-row justify-content-center w-100"}>
                    <div className={"d-flex flex-column main-width-restaurant"}>
                        <section className={"d-flex flex-column"}>
                            <h3 className={"w-100"}><i className="bi bi-building pe-3"/>{restaurant.nombre}</h3>
                            <div className={"d-flex flex-row"}>
                                <i className="bi bi-star-fill text-color-TYPE-1 pe-2"/>
                                <div className={"pe-1"}>{valoraciones(comments)}</div>
                                de
                                <div className={"ps-1 pe-1"}>{comments["count"]}  valoraciones</div>
                                ·
                            </div>
                        </section>

                        <section>
                            //IMG
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