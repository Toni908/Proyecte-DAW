import React, { Component } from 'react';
import axios from 'axios';
import CaruselRestaurant from "./CaruselRestaurant";
import ListRestaurant from "./ListRestaurant";
import './Buscador.css';
import './main.css';
import Buscador from "./Buscador";


class Main extends Component {
    constructor() {
        super();
        this.state = {
            BestRestaurants: [],
            EconomicRestaurants: [],
            isLoading: false,
            error: null,
        };
    }

    componentDidMount() {
        let ip = process.env.REACT_APP_API_URL;
        this.setState({ isLoading: true });

        const request1 = axios.get(ip+"/restaurants");
        const request2 = axios.get(ip+"/economic");

        axios.all([request1, request2]).then(axios.spread((...responses) => this.setState({
            BestRestaurants: responses[0].data,
            EconomicRestaurants: responses[1].data,
            isLoading: false
        }))).catch(error => this.setState({
            error: error,
        }))
    }

    render() {
        const { BestRestaurants, EconomicRestaurants, isLoading, error } = this.state;

        if (error) {
            return <p>{error.message}</p>;
        }
        if (isLoading) {
            return <p>Loading ...</p>;
        }

        return (
            <section>
                <div className={"d-md-block d-none"}>
                    <Buscador />
                </div>
                <div className={"d-flex flex-row justify-content-center w-100"}>
                    <div className={"d-flex flex-column main-width"}>
                        <CaruselRestaurant restaurants={BestRestaurants}/>
                        <section className={"w-100"}>
                            <section className={"w-100 m-0 p-0 max-w-full"}>
                                <ListRestaurant title={"Los Mejores Restaurantes"} restaurants={BestRestaurants}/>
                                <ListRestaurant title={"Los Mas Economicos"} restaurants={EconomicRestaurants}/>
                                {/*<ListRestaurant title={"Los Mejores Valorados"} restaurants={BestRestaurants}/>*/}
                            </section>
                        </section>
                    </div>
                </div>
            </section>

        )
    }
}

export default Main