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
            restaurants: [],
            isLoading: false,
            error: null,
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        axios.get("http://127.0.0.1:8000/restaurants")
            .then(result => this.setState({
                restaurants: result.data,
                isLoading: false
            }))
            .catch(error => this.setState({
                error: error,
                isLoading: false
            }));
    }

    render() {
        const { restaurants, isLoading, error } = this.state;

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
                        <CaruselRestaurant restaurants={restaurants}/>
                        <section className={"w-100"}>
                            <section className={"w-100 m-0 p-0 max-w-full"}>
                                <ListRestaurant title={"Los Mejores Restaurantes"} restaurants={restaurants}/>
                                <ListRestaurant title={"Los Mas Economicos"} restaurants={restaurants}/>
                                <ListRestaurant title={"Los Mejores Valorados"} restaurants={restaurants}/>
                            </section>
                        </section>
                    </div>
                </div>
            </section>

        )
    }
}

export default Main