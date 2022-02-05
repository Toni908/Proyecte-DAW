import React, {Component} from "react";
import {Card} from "react-bootstrap";

class CardTextRestaurant extends Component {
    constructor() {
        super();
    }

    render() {
        var today = new Date();

        // MORE THAN ONE
        if (this.props.horario.length >= 2) {
            this.props.horario.map(function (hora, key) {
                //SI ES HOY
                if (getDayNumber(hora.day) === today.getDay()) {
                    return (
                        <Card.Text key={key}>
                            {hora.hora_inicio}
                        </Card.Text>
                    )
                }
            })
        }

        // SINGLE HORARIO
        if (this.props.horario.id_horario!=null) {
            // SI ES HOY
            if (getDayNumber(this.props.horario.day)===today.getDay()) {
                return (
                    <Card.Text>
                        {this.props.horario.hora_inicio}
                    </Card.Text>
                )
            }
        }

        return (
            <Card.Text className={"text-danger"}>
                Today is closed
            </Card.Text>
        )
    }
}

function getDayNumber(number) {
    switch (number) {
        case 'Lunes':
            return 1;
        case 'Martes':
            return 2;
        case 'Miercoles':
            return 3;
        case 'Jueves':
            return 4;
        case 'Viernes':
            return 5;
        case 'Sabado':
            return 6;
        case 'Domingo':
            return 7;
        default:
            return null;
    }
}
export default CardTextRestaurant