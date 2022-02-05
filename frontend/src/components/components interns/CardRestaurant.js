import {Button, Card} from "react-bootstrap";
import ImageRestaurant from "./ImageRestaurant";
import React, {Component} from "react";
import axios from "axios";
import CardTextRestaurant from "./CardTextRestaurant";

class CardRestaurant extends Component {
    constructor() {
        super();

        this.state = {
            horario: [],
            isLoading: false,
            error: null,
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        axios.get("http://www.restaurantemallorca.me:8000/horario/"+this.props.restaurant.id_restaurante)
            .then(result => this.setState({
                horario: result.data,
                isLoading: false
            }))
            .catch(error => this.setState({
                error,
                isLoading: false
            }));}

    render() {
        const { horario, isLoading, error } = this.state;

        if (error) {
            return <p>{error.message}</p>;
        }

        if (isLoading) {
            return <p>Loading ...</p>;
        }

        return (
            <Card className={"w-100"}>
                <ImageRestaurant restaurante={this.props.restaurant}/>
                <Card.Body>
                    <Card.Title>{this.props.restaurant.nombre}</Card.Title>
                    <CardTextRestaurant horario={horario}/>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        )
    }
}

export default CardRestaurant
