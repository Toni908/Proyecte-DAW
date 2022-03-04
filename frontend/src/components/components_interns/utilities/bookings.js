import schedule from "./schedule";
import $ from "jquery";

class bookings {
    static canClientReservar(date, reservas,horario, aforo) {
        return canClientReservar(date, reservas,horario, aforo);
    }
    static formatDateES(date) {
        return formatDateES(date);
    }
    static isClosed(date, horario) {
        return isClosed(date, horario);
    }
    static filterArrayFromDate(array, date,time) {
        return filterArrayFromDate(array, date,time);
    }
    static getHoursDate(date) {
        return getHoursDate(date);
    }
    static formatDateEN(date, time) {
        return formatDateEN(date, time);
    }
    static sendEmail(correo, ruta) {
        sendEmail(correo, ruta);
    }
}

export default bookings

function filterArrayFromDate(array, date,time) {
    if (time===""){
        time = "00:00:00";
    }
    let newDate = formatDateEN(date,time);
    const result = array.filter(item => formatDateESSimple(new Date(item.fecha)) === formatDateESSimple(new Date(newDate)));
    let personasTotal = 0;
    for (let i = 0; i < result.length; i++) {
        personasTotal += result[i].personas;
    }
    return personasTotal;
}

function getHoursDate(date){
    if (date.getHours()<10) {
        return 0+""+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    }
    return date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
}

function formatDateEN(date, time) {
    let result = new Date(date);
    let resultTime = time.split(":");
    return result.getFullYear()+"-"+(result.getMonth()+1)+"-"+result.getDate()+" "+resultTime[0]+":"+resultTime[1]+":"+resultTime[2];
}
function formatDateESSimple(date) {
    let result = new Date(date);
    return result.getDate()+"-"+(result.getMonth()+1)+"-"+result.getFullYear()+" "+result.getHours();
}
function formatDateES(date) {
    let result = new Date(date);
    return result.getDate()+"-"+(result.getMonth()+1)+"-"+result.getFullYear();
}

function canClientReservar(date, reservas,horario, aforo) {
    var startDate = new Date(date);
    var endDate = new Date(date);
    endDate.setDate(endDate.getDate()+1);

    // IS RESERVAS BETWEEN TEMPORADA
    var resultProductData = reservas.filter(a => {
        var date = new Date(a.fecha);
        return (date >= startDate && date <= endDate);
    });

    // SUM TOTAL
    let personasTotal = 0;
    for (let i = 0; i < resultProductData.length; i++) {
        personasTotal += resultProductData[i].personas;
    }
    return personasTotal < (aforo * getHoursNumberFromDate(date,horario));
}

function getHoursNumberFromDate(date, horario) {
    let arrayHorario = 0;

    if (!Array.isArray(horario)) {
        horario = Object.values(horario)
    }

    horario = change0000(horario);

    for (let i = 0; i < horario.length; i++) {
        let number = schedule.getDayNumber(horario[i].day);
        if (number===date.getDay()) {
            let hora_fin = parseInt(horario[i].hora_fin.split(":")[0]);
            let hora_inicio = parseInt(horario[i].hora_inicio.split(":")[0]);
            for (let x = hora_inicio; x < hora_fin; x++) {
                arrayHorario++;
            }
        }
    }
    return arrayHorario;
}

function sendEmail(correo, ruta) {
    var data = {
        service_id: 'service_1oq8hpi',
        template_id: 'template_d3g3uye',
        user_id: '8MM4-J8FO99oHPBq9',
        template_params: {
            'reply_to': correo,
            'ruta': ruta
        }
    };

    $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json'
    }).done(function() {
        // FUNCIONA
    }).fail(function(error) {
        // ERROR
    });
}


function isClosed(date, horario) {
    let newHorario = [];
    if (!Array.isArray(horario)) {
        newHorario = Object.values(horario)
    }
    // EN EL EL DIA DE LA SETMANA HAY ALGUNA FECHA === ESTA ABIERTO
    for (let i = 0; i < newHorario.length; i++) {
        let number = schedule.getDayNumber(newHorario[i].day);
        if (number===date.getDay()) {
            return false;
        }
    }
    return true;
}

function change0000(newHorario) {
    let horario = []

    for (let i = 0; i < newHorario.length; i++) {
        if (newHorario[i].hora_fin==="00:00:00") {
            newHorario[i].hora_fin = "24:00:00";
        }
        horario.push(newHorario[i])
    }
    return horario;
}