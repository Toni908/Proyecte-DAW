class schedule {
    static isTodayOpen(horario) {
        return isTodayOpen(horario);
    }
    static textHeader(horario) {
        return textHeader(horario);
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
        <div className={"d-flex flex-row gap-1"}>Horario: <div className={"text-danger"}>Cerrado</div></div>
        <div className={"paraf_info_horario"}>Hoy no esta abierto</div>
    </div>);

    for (let i = 0; i < horario.length; i++) {
        //SI ES HOY
        if (getDayNumber(horario[i].day) === today.getDay()) {
            // LA HORA ES MENOR QUE EL HORARIO (NO = HAY HORAS ADELANTE) (SI = SEGUIR BUSCANDO)
            if (isClosed(fixedDate(horario[i].hora_inicio), today)) {

                result = (<div className={"d-flex flex-column"}>
                    <div key={i} className={"d-flex flex-row gap-1"}>Horario:
                        <div className={"text-warning"}>Cerrado</div>
                    </div>
                    <div className={"paraf_info_horario"}>Abierto a las {fixedDate(horario[i].hora_inicio)}</div>
                </div>);
            }

            // LA HORA +2 ES MAYOR QUE EL HORARIO (SI = APUNTO DE CERRAR) (NO = SEGUIR BUSCANDO)
            if (isNearClose(fixedDate(horario[i].hora_inicio),fixedDate(horario[i].hora_fin), today)) {
                // ES TODO CORRECTO ?
                if (hasPassedTime(fixedDate(horario[i].hora_inicio), fixedDate(horario[i].hora_fin), today)) {
                    result = (<div className={"d-flex flex-column"}>
                        <div key={i} className={"d-flex flex-row gap-1"}>Horario: <div
                            className={"text-success"}>Abierto</div></div>
                        <div className={"paraf_info_horario text-warning"}>Cierra
                            pronto {fixedDate(horario[i].hora_fin)}</div>
                    </div>);
                    break;
                } else {
                    result = (<div className={"d-flex flex-column"}>
                        <div key={i} className={"d-flex flex-row gap-1"}>Horario: <div
                            className={"text-danger"}>Cerrado</div></div>
                        <div className={"paraf_info_horario text-secondary"}>Ya a cerrado</div>
                    </div>);
                }
            } else {
                if (isClosed(fixedDate(horario[i].hora_inicio), today)) {
                    result = (<div className={"d-flex flex-column"}>
                        <div key={i} className={"d-flex flex-row gap-1"}>Horario:
                            <div className={"text-warning"}>Cerrado</div>
                        </div>
                        <div className={"paraf_info_horario"}>Abierto a las {fixedDate(horario[i].hora_inicio)}</div>
                    </div>);
                } else {
                    result = (<div className={"d-flex flex-column"}>
                        <div key={i} className={"d-flex flex-row gap-1"}>Horario: <div
                            className={"text-success"}>Abierto</div></div>
                        <div className={"paraf_info_horario text-secondary"}>Cierra
                            a las {fixedDate(horario[i].hora_fin)}</div>
                    </div>);
                    break;
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


    hora_fin = hora_fin.split(":");
    let time = today.getHours();
    let hora = parseInt(hora_fin[0]);

    time = time + 1;
    if (time === 24) {
        time = 0;
    }

    time = time + 1;
    if (time === 24) {
        time = 0;
    }

    return hora < time;
}

function isClosed(hora, today) {
    hora = hora.split(":");

    return parseInt(hora[0]) > today.getHours();
}

function textMake(week, horario, array, days) {
    while (hasFalse(week)) {
        horario.forEach(function (hora, key) {
            days.push(hora.day);
            array.push(<div key={key} className={"hora_day"}>{hora.day}: {fixedDate(hora.hora_inicio)}-{fixedDate(hora.hora_fin)}</div>);
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

function changeWeekStatus(number, week) {
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
    if (week[0] === false) {
        days.push("Lunes");
        text.push(<div className={"text-danger text-center"}>Lunes cerrado</div>);
        week[0] = true;
    }
    if (week[1] === false) {
        days.push("Martes");
        text.push(<div className={"text-danger text-center"}>Martes cerrado</div>);
        week[1] = true;
    }
    if (week[2] === false) {
        days.push("Miercoles");
        text.push(<div className={"text-danger text-center"}>Miercoles cerrado</div>);
        week[2] = true;
    }
    if (week[3] === false) {
        days.push("Jueves");
        text.push(<div className={"text-danger text-center"}>Jueves cerrado</div>);
        week[3] = true;
    }
    if (week[4] === false) {
        days.push("Viernes");
        text.push(<div className={"text-danger text-center"}>Viernes cerrado</div>);
        week[4] = true;
    }
    if (week[5] === false) {
        days.push("Sabado");
        text.push(<div className={"text-danger text-center"}>Sabado cerrado</div>);
        week[5] = true;
    }
    if (week[6] === false) {
        days.push("Domingo");
        text.push(<div className={"text-danger text-center"}>Domingo cerrado</div>);
        week[6] = true;
    }
}

function orderWeek(week, days) {
    let array = [];
    let hasPassed = [false, false, false, false, false, false, false];

    for (let i = 0; i < days.length; i++) {
        switch (days[i]) {
            case 'Lunes':
                if (array[0] !== undefined) {
                    if (hasPassed[0] === false) {
                        array[0] = "Lunes: " + isThisTimeMoreAproxToday(array[0], week[i]);
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
                        array[1] = "Martes: " + isThisTimeMoreAproxToday(array[1], week[i]);
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
                        array[2] = "Miercoles: " + isThisTimeMoreAproxToday(array[2], week[i]);
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
                        array[3] = "Jueves: " + isThisTimeMoreAproxToday(array[3], week[i]);
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
                        array[4] = "Viernes: " + isThisTimeMoreAproxToday(array[4], week[i]);
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
                        array[5] = "Sabado: " + isThisTimeMoreAproxToday(array[5], week[i]);
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
                        array[6] = "Domingo: " + isThisTimeMoreAproxToday(array[6], week[i]);
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