import './main.css';
import React, { Component } from 'react';
import axios from 'axios';
import CaruselRestaurant from "./CaruselRestaurant";
import CardRestaurant from "./CardRestaurant";

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
            <section className={"d-flex flex-row justify-content-center w-100 background-color-general"}>
                <div className={"d-flex flex-column main-width"}>
                    <CaruselRestaurant restaurants={restaurants}/>
                    <section className={"w-100"}>
                        <section className={"w-100 m-0 p-0 max-w-full"}>
                            <div className={"w-100 text-center pt-5 pb-2"}>
                                <h2>Mejores Restaurantes</h2>
                            </div>
                            <div className={"row w-100 m-0 pt-xxl-0 pt-5 mb-5 mt-5"}>
                                {restaurants.map(function(item, key) {
                                    return (
                                        <article key={key} className={"col-xxl-3 col-xl-4 col-lg-6 col-12 h-100 p-0 pe-2"}>
                                            <CardRestaurant restaurant={item}/>
                                        </article>
                                    )
                                })}
                            </div>
                        </section>
                    </section>
                </div>
            </section>
        )
    }
}

export default Main