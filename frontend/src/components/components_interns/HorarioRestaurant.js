import React, {Component} from "react";
import {Accordion} from "react-bootstrap";
import axios from "axios";
import schedule from "./utilities/schedule.js";
import "./horariosrestaurant.css";

class HorarioRestaurant extends Component {
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
        axios.get("http://127.0.0.1:8000/horario/"+this.props.restaurant.id_restaurante)
            .then(result => this.setState({
                horario: result.data,
                isLoading: false
            }))
            .catch(error => this.setState({
                error,
                isLoading: false
            }));}

    render() {
        const {horario, isLoading, error } = this.state;

        if (error) {
            return <p>{error.message}</p>;
        }

        if (isLoading) {
            return <p>Loading ...</p>;
        }

        let header = schedule.textHeader(horario);
        let body = schedule.isTodayOpen(horario);
        return (
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{header}</Accordion.Header>
                    <Accordion.Body>
                        {body.map(function (item, key) {
                            return (<div key={key} className={"text-black"}>{item}</div>)
                        })}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        )
    }
}

export default HorarioRestaurant