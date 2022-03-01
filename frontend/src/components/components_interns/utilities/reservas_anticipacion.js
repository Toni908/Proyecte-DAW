class reservas_anticipacion {
    static getDayAnticipacion(day) {
        return getDayAnticipacion(day);
    }

    static getDateAnticipacion(day) {
        return getDateAnticipacion(day);
    }

    static getNextHourDate(date) {
        return getNextHourDate(date);
    }

    static getDateLessAnticipacion(date) {
        return getDateLessAnticipacion(date);
    }
}

function getDateAnticipacion(day) {
    let date = new Date();
    date.setDate(date.getDate() + day);

    return date;
}

function getDateLessAnticipacion(date) {
    let less = new Date(date);
    less.setDate(less.getDate() - 1);
    return less;
}

function getNextHourDate(date) {
    let result = new Date(date);
    result.setHours(result.getHours() + 1);
    return result;
}

function getDayAnticipacion(day) {
    var date = new Date();
    date.setDate(date.getDate() + day);
    return date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()
}

export default reservas_anticipacion