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
        this.setState({ isLoading: true });
        axios.get("http://127.0.0.1:8000/restaurants")
            .then(result => this.setState({
                BestRestaurants: result.data,
                isLoading: false
            }))
            .catch(error => this.setState({
                error: error,
                isLoading: false
            }));
        axios.get("http://127.0.0.1:8000/economic")
            .then(result => this.setState({
                EconomicRestaurants: result.data,
                isLoading: false
            }))
            .catch(error => this.setState({
                error: error,
                isLoading: false
            }));
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
                <div className={"d-flex flex-row justify-content-center w-100 background-color-general"}>
                    <div className={"d-flex flex-column main-width"}>
                        <CaruselRestaurant restaurants={BestRestaurants}/>
                        <section className={"w-100"}>
                            <section className={"w-100 m-0 p-0 max-w-full"}>
                                <ListRestaurant title={"Los Mejores Restaurantes"} restaurants={BestRestaurants}/>
                                <ListRestaurant title={"Los Mas Economicos"} restaurants={EconomicRestaurants}/>
                                <ListRestaurant title={"Los Mejores Valorados"} restaurants={BestRestaurants}/>
                            </section>
                        </section>
                    </div>
                </div>
            </section>

        )
    }
}

export default Main