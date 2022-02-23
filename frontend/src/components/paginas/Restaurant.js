import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import axios from "axios";
import Loading from "../components_interns/Loading";
import Buscador from "../components_interns/Buscador";
import CaruselRestaurant from "../components_interns/CaruselRestaurant";
import ListRestaurant from "../components_interns/ListRestaurant";
import ListMunicipios from "../components_interns/ListMunicipios";

class Restaurant extends Component {
    constructor() {
        super();

        this.state = {
            restaurant: [],
            price: 0,
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
        const request2 = axios.get(ip+"/avg/restaurant/"+id);
        const request3 = axios.get(ip+"/capitales");

        axios.all([request1, request2,request3]).then(axios.spread((...responses) => this.setState({
            restaurant: responses[0].data,
            price: responses[1].data,
            CapitalesRestaurants: responses[2].data,
            isLoading: false
        }))).catch(error => this.setState({
            error: error,
        }))
    }

    render() {
        const {restaurant, isLoading, error } = this.state;

        if (error) {
            return <p>{error.message}</p>;
        }
        if (isLoading) {
            return <Loading />;
        }

        return(
            <section>
                <div className={"d-flex flex-row justify-content-center w-100"}>
                    <div className={"d-flex flex-column main-width"}>
                        <section className={"d-flex flex-column"}>
                            <h3 className={"w-100"}><i className="bi bi-building pe-3"/>{restaurant.nombre}</h3>
                            <div className={"d-flex flex-row"}>
                                {}
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

export default Restaurant