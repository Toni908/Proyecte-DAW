import './main.css';
import front from '../../img/imgFront.jpg';
import { Button } from 'react-bootstrap';
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
            <section className={"w-100"}>
                <CaruselRestaurant restaurants={restaurants}/>
                <section className={"w-100"}>
                    <section className={"w-100 m-0 p-0 max-w-full"}>
                        <div className={"row w-100 px-5 m-0 pt-lg-0 pt-5"}>
                            {restaurants.map(function(item, key) {
                                if (key<6) {
                                    return (
                                        <article key={key} className={"col-xxl-4 col-lg-6 col-12 p-lg-5 h-100"}>
                                            <CardRestaurant restaurant={item}/>
                                        </article>
                                    )
                                }
                                return("")
                            })}
                        </div>
                    </section>
                </section>
            </section>
        )
    }
}

export default Main