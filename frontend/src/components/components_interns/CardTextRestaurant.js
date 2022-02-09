import React, {Component} from "react";
import {Accordion} from "react-bootstrap";

class CardTextRestaurant extends Component {
    constructor() {
        super();
    }

    render() {
        let header = textHeader(this.props.horario);
        let body = isTodayOpen(this.props.horario);
        return (
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>{header}</Accordion.Header>
                        <Accordion.Body>
                            {body}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
        )
    }
}

function isTodayOpen(horario) {
    // Lunes a domingo
    var week = [false,false,false,false,false,false,false]
    let days = [];
    let arrayHorario = [];

    // MORE THAN ONE
    if (Array.isArray(horario)) {
        textMake(week,horario,arrayHorario,days);
    } else {
        horario = Object.values(horario)
        textMake(week,horario,arrayHorario,days);
    }
    arrayHorario = orderWeek(arrayHorario,days);
    return (
        arrayHorario
    )
}

function textHeader(horario) {
    var today = new Date();
    let header = (<div className={"d-flex flex-row gap-2"}>Horario: <div className={"text-danger"}>Cerrado</div></div>);

    if (!Array.isArray(horario)) {
        horario = Object.values(horario)
    }
    horario.map(function (hora, key) {
        //SI ES HOY
        if (getDayNumber(hora.day) === today.getDay()) {
            header = (<div key={key} className={"d-flex flex-row gap-2"}>Horario: <div className={"text-success"}>Abierto</div> - Cierra a las {fixedDate(hora.hora_fin)}</div>);
        }
    })

    return header;
}

function textMake(week, horario, array,days) {
    var today = new Date();

    while (hasFalse(week)) {
        horario.map(function (hora, key) {
            //SI ES HOY
            if (getDayNumber(hora.day) === today.getDay()) {
                days.push(hora.day);
                array.push(<div key={key} className={"text-success"}>{hora.day}: {fixedDate(hora.hora_inicio)}-{fixedDate(hora.hora_fin)}</div>);
            } else {
                days.push(hora.day);
                array.push(<div key={key} className={"text-dark"}>{hora.day}: {fixedDate(hora.hora_inicio)}-{fixedDate(hora.hora_fin)}</div>);
            }
            changeWeekStatus(hora.day,week);
        })
        pushOnTextDay(week,array,days);
    }
}

function hasFalse(week) {
    for (let i = 0; i < week.length; i++) {
        if (week[i]===false) {
            return true;
        }
    }
    return false;
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

function changeWeekStatus(number,week) {
    switch (number) {
        case 'Lunes':
            week[0] = true;
            break;
        case 'Martes':
            week[1] = true;
            break;
        case 'Miercoles':
            week[2] = true;
            break;
        case 'Jueves':
            week[3] = true;
            break;
        case 'Viernes':
            week[4] = true;
            break;
        case 'Sabado':
            week[5] = true;
            break;
        default:
            week[6] = true;
            break;
    }
}

function pushOnTextDay(week, text,days) {
    if (week[0]===false) {
        days.push("Lunes");
        text.push(<div className={"text-danger"}>Lunes cerrado</div>);
        week[0] = true;
    }
    if (week[1]===false) {
        days.push("Martes");
        text.push(<div className={"text-danger"}>Martes cerrado</div>);
        week[1] = true;
    }
    if (week[2]===false) {
        days.push("Miercoles");
        text.push(<div className={"text-danger"}>Miercoles cerrado</div>);
        week[2] = true;
    }
    if (week[3]===false) {
        days.push("Jueves");
        text.push(<div className={"text-danger"}>Jueves cerrado</div>);
        week[3] = true;
    }
    if (week[4]===false) {
        days.push("Viernes");
        text.push(<div className={"text-danger"}>Viernes cerrado</div>);
        week[4] = true;
    }
    if (week[5]===false) {
        days.push("Sabado");
        text.push(<div className={"text-danger"}>Sabado cerrado</div>);
        week[5] = true;
    }
    if (week[6]===false) {
        days.push("Domingo");
        text.push(<div className={"text-danger"}>Domingo cerrado</div>);
        week[6] = true;
    }
}

function orderWeek(week,days) {
    let array = [];
    for (let i = 0; i < days.length; i++) {
        switch (days[i]) {
            case 'Lunes':
                array[0] = week[i];
                break;
            case 'Martes':
                array[1] = week[i];
                break;
            case 'Miercoles':
                array[2] = week[i];
                break;
            case 'Jueves':
                array[3] = week[i];
                break;
            case 'Viernes':
                array[4] = week[i];
                break;
            case 'Sabado':
                array[5] = week[i];
                break;
            case 'Domingo':
                array[6] = week[i];
                break;
        }
    }
    return array;
}

function fixedDate(date) {
    return date.toString().slice(0,5);
}

export default CardTextRestaurant