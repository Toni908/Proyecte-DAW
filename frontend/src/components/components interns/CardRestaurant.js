import {Button, Card} from "react-bootstrap";
import ImageRestaurant from "./ImageRestaurant";
import React, {Component} from "react";
import axios from "axios";
import './image.css'
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
                <ImageRestaurant height={'image-height'} restaurante={this.props.restaurant}/>
                <Card.Body>
                    <Card.Title className={"text-center"}>{this.props.restaurant.nombre}</Card.Title>
                    <Card.Text>
                        <div className={""}>
                            Direccion: <a className={"text-black fw-bold text-decoration-none"}>{this.props.restaurant.direccion}</a>
                        </div>
                        <div className={""}>
                            Telefono: <a className={"text-black fw-bold text-decoration-none"}>{this.props.restaurant.telefono_restaurante}</a>
                        </div>
                    </Card.Text>
                    <CardTextRestaurant horario={horario}/>
                    <div className={"mt-3"}>
                        <Button variant="outline-dark">Ver Restaurante</Button>
                        <Button className={"ms-3"} variant={"outline-dark"}>Reservar</Button>
                    </div>
                </Card.Body>
            </Card>
        )
    }
}

export default CardRestaurant
