import React, {Component} from "react";
import {Card} from "react-bootstrap";

class CardTextRestaurant extends Component {
    constructor() {
        super();
    }

    render() {
        let elements = isTodayOpen(this.props.horario);
        console.log(elements)
        return (
            <div>
                {elements}
            </div>
        )
    }
}

function isTodayOpen(horario) {
    var today = new Date();

    let text = "";
    // MORE THAN ONE
    if (Array.isArray(horario)) {
        horario.map(function (hora, key) {
            //SI ES HOY
            console.log(getDayNumber(hora.day) + " --- " + today.getDay() + (getDayNumber(hora.day) === today.getDay()))
            if (getDayNumber(hora.day) === today.getDay()) {
                console.log("enter")
                text =
                    <Card.Text key={key} className={"text-success"}>
                        <p>{hora.day}: {hora.hora_inicio}-{hora.hora_fin}</p>
                    </Card.Text>
            }
        })
        if (text==="") {
            text = <Card.Text className={"text-danger"}>
                <p>Cerrado</p>
            </Card.Text>
        }
    } else {
        text = <Card.Text className={"text-danger"}>
            <p>Cerrado</p>
        </Card.Text>
    }
    return (
        text
    )
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
            return 0;
        default:
            return null;
    }
}
export default CardTextRestaurant