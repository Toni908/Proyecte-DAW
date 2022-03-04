import React from "react";
import Translate from "../../../locales/Translate";

class schedule {
    static isTodayOpen(horario) {
        return isTodayOpen(horario);
    }
    static textHeader(horario) {
        return textHeader(horario);
    }

    static getDayNumber(number) {
        return getDayNumber(number);
    }

    static getMonthString(month) {
        return getMonthString(month);
    }
}
function isTodayOpen(horario) {
    // Lunes a domingo
    var week = [false, false, false, false, false, false, false]
    let days = [];
    let arrayHorario = [];

    // MORE THAN ONE
    if (Array.isArray(horario)) {
        textMake(week, horario, arrayHorario, days);
    } else {
        horario = Object.values(horario)
        textMake(week, horario, arrayHorario, days);
    }
    arrayHorario = orderWeek(arrayHorario, days);
    return (
        arrayHorario
    )
}

function textHeader(horario) {
    let today = new Date();
    if (!Array.isArray(horario)) {
        horario = Object.values(horario)
    }
    return getResultHour(horario, today);
}
function getResultHour(horario, today) {
    let result = (<div className={"d-flex flex-column"}>
        <div className={"d-flex flex-row gap-1"}><Translate string={"schedule-title"}/><div className={"text-danger"}><Translate string={"schedule-closed"}/></div></div>
        <div className={"paraf_info_horario"}><Translate string={"schedule-message-not-open"}/></div>
    </div>);

    for (let i = 0; i < horario.length; i++) {
        //SI ES HOY
        if (getDayNumber(horario[i].day) === today.getDay()) {
            let hora_fin = horario[i].hora_fin;
            if (horario[i].hora_fin === "00:00:00") {
                hora_fin = "24:00:00";
            }
            // LA HORA ES MENOR QUE EL HORARIO (NO = HAY HORAS ADELANTE) (SI = SEGUIR BUSCANDO)
            if (isClosed(fixedDate(horario[i].hora_inicio), today)) {
                result = (<div className={"d-flex flex-column"}>
                    <div key={i} className={"d-flex flex-row gap-1"}>
                        <Translate string={"schedule-title"}/>
                        <div className={"text-warning"}>
                            <Translate string={"schedule-closed"}/>
                        </div>
                    </div>
                    <div className={"paraf_info_horario"}><Translate string={"schedule-message-open-on"}/>{fixedDate(horario[i].hora_inicio)}</div>
                </div>);
            } else {
                // LA HORA +2 ES MAYOR QUE EL HORARIO (SI = APUNTO DE CERRAR) (NO = SEGUIR BUSCANDO)
                if (isNearClose(fixedDate(horario[i].hora_inicio),fixedDate(hora_fin), today)) {
                    // ES TODO CORRECTO ?
                    if (hasPassedTime(fixedDate(horario[i].hora_inicio), fixedDate(hora_fin), today)) {
                        result = (<div className={"d-flex flex-column"}>
                            <div key={i} className={"d-flex flex-row gap-1"}>
                                <Translate string={"schedule-title"}/>
                                <div className={"text-success"}>
                                    <Translate string={"schedule-open"}/>
                                </div>
                            </div>
                            <div className={"paraf_info_horario"}>
                                <i className="bi bi-info-circle pe-1 fw-bold text-warning"/>
                                <Translate string={"schedule-message-near-closed"}/>
                                {fixedDate(hora_fin)}
                            </div>
                        </div>);
                        break;
                    } else {
                        result = (<div className={"d-flex flex-column"}>
                            <div key={i} className={"d-flex flex-row gap-1"}>
                                <Translate string={"schedule-title"}/>
                                <div className={"text-danger"}>
                                    <Translate string={"schedule-closed"}/>
                                </div>
                            </div>
                            <div className={"paraf_info_horario text-secondary"}>
                                <Translate string={"schedule-message-already-closed"}/>
                            </div>
                        </div>);
                    }
                } else {
                    if (hasPassedTime(fixedDate(horario[i].hora_inicio), fixedDate(hora_fin), today)) {
                        result = (<div className={"d-flex flex-column"}>
                            <div key={i} className={"d-flex flex-row gap-1"}>
                                <Translate string={"schedule-title"}/>
                                <div className={"text-success"}>
                                    <Translate string={"schedule-open"}/>
                                </div>
                            </div>
                            <div className={"paraf_info_horario text-secondary"}>
                                <Translate string={"schedule-message-closed-on"}/>
                                {fixedDate(hora_fin)}
                            </div>
                        </div>);
                    } else {
                        result = (<div className={"d-flex flex-column"}>
                            <div key={i} className={"d-flex flex-row gap-1"}>
                                <Translate string={"schedule-title"}/>
                                <div className={"text-danger"}>
                                    <Translate string={"schedule-closed"}/>
                                </div>
                            </div>
                            <div className={"paraf_info_horario text-secondary"}>
                                <Translate string={"schedule-message-already-closed"}/>
                            </div>
                        </div>);
                    }
                }
            }
        }
    }
    return result;
}

function hasPassedTime(hora_inicio, hora_fin, today) {
    let hora_i = hora_inicio.split(":")[0];
    let hora_f = hora_fin.split(":")[0];
    if (hora_i>hora_f) {
        return true;
    }
    today = new Date()

    for (let i = hora_i; i < hora_f; i++) {
        if (today.getHours() === i) {
            return true;
        }
    }
    return false;
}

function isNearClose(hora_inicio,hora_fin, today) {
    let hora_i = hora_inicio.split(":")[0];
    let hora_f = hora_fin.split(":")[0];
    if (hora_i>hora_f) {
        return false;
    }
    today = new Date()

    let fin = new Date(today.getDate()+"/"+today.getMonth()+"/"+today.getFullYear()+" "+hora_fin)
    today.setHours(today.getHours()+2)

    return fin < today;
}

function isClosed(hora, today) {
    hora = hora.split(":");
    today = new Date()

    return parseInt(hora[0]) > today.getHours();
}

function textMake(week, horario, array, days) {
    while (hasFalse(week)) {
        horario.forEach(function (hora, key) {
            days.push(hora.day);
            array.push(<div key={key} className={"hora_day"}>{traductionsDayBBDD(hora.day)}: {fixedDate(hora.hora_inicio)}-{fixedDate(hora.hora_fin)}</div>);
            changeWeekStatus(hora.day, week);
        })
        pushOnTextDay(week, array, days);
    }
}

function hasFalse(week) {
    for (let i = 0; i < week.length; i++) {
        if (week[i] === false) {
            return true;
        }
    }
    return false;
}

function traductionsDayBBDD(day) {
    switch (day) {
        case 'Lunes':
            return <Translate string={"monday"}/>;
        case 'Martes':
            return <Translate string={"tuesday"}/>;
        case 'Miercoles':
            return <Translate string={"wednesday"}/>;
        case 'Jueves':
            return <Translate string={"thursday"}/>;
        case 'Viernes':
            return <Translate string={"friday"}/>;
        case 'Sabado':
            return <Translate string={"saturday"}/>;
        case 'Domingo':
            return <Translate string={"sunday"}/>;
        default:
            return null;
    }
}

function getMonthString(month) {
    switch (month) {
        case 0:
            return <Translate string={"january"}/>;
        case 1:
            return <Translate string={"february"}/>;
        case 2:
            return <Translate string={"march"}/>;
        case 3:
            return <Translate string={"april"}/>;
        case 4:
            return <Translate string={"may"}/>;
        case 5:
            return <Translate string={"june"}/>;
        case 6:
            return <Translate string={"july"}/>;
        case 7:
            return <Translate string={"august"}/>;
        case 8:
            return <Translate string={"september"}/>;
        case 9:
            return <Translate string={"october"}/>;
        case 10:
            return <Translate string={"november"}/>;
        case 11:
            return <Translate string={"december"}/>;
        default:
            return null;
    }
}

function getDayNumber(number) {
    // DAY BBDD NO IMPORTA TRADUCIR
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

function changeWeekStatus(number, week) {
    // DAY BBDD NO IMPORTA TRADUCIR
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

function pushOnTextDay(week, text, days) {
    // BBDD NO IMPORTA TRADUCIR DIAS.PUSH
    if (week[0] === false) {
        days.push("Lunes");
        text.push(<div className={"text-danger text-center"}><Translate string={"monday"}/> <Translate string={"closed"}/></div>);
        week[0] = true;
    }
    if (week[1] === false) {
        days.push("Martes");
        text.push(<div className={"text-danger text-center"}><Translate string={"tuesday"}/> <Translate string={"closed"}/></div>);
        week[1] = true;
    }
    if (week[2] === false) {
        days.push("Miercoles");
        text.push(<div className={"text-danger text-center"}><Translate string={"wednesday"}/> <Translate string={"closed"}/></div>);
        week[2] = true;
    }
    if (week[3] === false) {
        days.push("Jueves");
        text.push(<div className={"text-danger text-center"}><Translate string={"thursday"}/> <Translate string={"closed"}/></div>);
        week[3] = true;
    }
    if (week[4] === false) {
        days.push("Viernes");
        text.push(<div className={"text-danger text-center"}><Translate string={"friday"}/> <Translate string={"closed"}/></div>);
        week[4] = true;
    }
    if (week[5] === false) {
        days.push("Sabado");
        text.push(<div className={"text-danger text-center"}><Translate string={"saturday"}/> <Translate string={"closed"}/></div>);
        week[5] = true;
    }
    if (week[6] === false) {
        days.push("Domingo");
        text.push(<div className={"text-danger text-center"}><Translate string={"sunday"}/> <Translate string={"closed"}/></div>);
        week[6] = true;
    }
}

function orderWeek(week, days) {
    let array = [];
    let hasPassed = [false, false, false, false, false, false, false];

    // BBDD DAYS NO CAMBIAR VIENE DE DDBB
    for (let i = 0; i < days.length; i++) {
        switch (days[i]) {
            case 'Lunes':
                if (array[0] !== undefined) {
                    if (hasPassed[0] === false) {
                        array[0] = <div><Translate string={"monday"}/>: {isThisTimeMoreAproxToday(array[0], week[i])}</div>;
                        hasPassed[0] = true;
                    } else {
                        array[0] = addTimeMore(array[0], week[i]);
                    }
                    break;
                }
                array[0] = week[i];
                break;
            case 'Martes':
                if (array[1] !== undefined) {
                    if (hasPassed[1] === false) {
                        array[1] = <div><Translate string={"tuesday"}/>: {isThisTimeMoreAproxToday(array[1], week[i])}</div>;
                        hasPassed[1] = true;
                    } else {
                        array[1] = addTimeMore(array[1], week[i]);
                    }
                    break;
                }
                array[1] = week[i];
                break;
            case 'Miercoles':
                if (array[2] !== undefined) {
                    if (hasPassed[2] === false) {
                        array[2] = <div><Translate string={"wednesday"}/>: {isThisTimeMoreAproxToday(array[2], week[i])}</div>;
                        hasPassed[2] = true;
                    } else {
                        array[2] = addTimeMore(array[2], week[i]);
                    }
                    break;
                }
                array[2] = week[i];
                break;
            case 'Jueves':
                if (array[3] !== undefined) {
                    if (hasPassed[3] === false) {
                        array[3] = <div><Translate string={"thursday"}/>: {isThisTimeMoreAproxToday(array[3], week[i])}</div>;
                        hasPassed[3] = true;
                    } else {
                        array[3] = addTimeMore(array[3], week[i]);
                    }
                    break;
                }
                array[3] = week[i];
                break;
            case 'Viernes':
                if (array[4] !== undefined) {
                    if (hasPassed[4] === false) {
                        array[4] = <div><Translate string={"friday"}/>: {isThisTimeMoreAproxToday(array[4], week[i])}</div>;
                        hasPassed[4] = true;
                    } else {
                        array[4] = addTimeMore(array[4], week[i]);
                    }
                    break;
                }
                array[4] = week[i];
                break;
            case 'Sabado':
                if (array[5] !== undefined) {
                    if (hasPassed[5] === false) {
                        array[5] = <div><Translate string={"saturday"}/>: {isThisTimeMoreAproxToday(array[5], week[i])}</div>;
                        hasPassed[5] = true;
                    } else {
                        array[5] = addTimeMore(array[5], week[i]);
                    }
                    break;
                }
                array[5] = week[i];
                break;
            default:
                if (array[6] !== undefined) {
                    if (hasPassed[6] === false) {
                        array[6] = <div><Translate string={"sunday"}/>: {isThisTimeMoreAproxToday(array[6], week[i])}</div>;
                        hasPassed[6] = true;
                    } else {
                        array[6] = addTimeMore(array[6], week[i]);
                    }
                    break;
                }
                array[6] = week[i];
                break;
        }
    }
    return array;
}

function isThisTimeMoreAproxToday(actual, week) {
    return actual.props.children[2] + "-" + actual.props.children[4] + " / " + week.props.children[2] + "-" + week.props.children[4];
}

function addTimeMore(actual, week) {
    return actual + " / " + week.props.children[2] + "-" + week.props.children[4];
}

function fixedDate(date) {
    return date.toString().slice(0, 5);
}

export default schedule