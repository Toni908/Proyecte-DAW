class reservas_anticipacion {
    static getDayAnticipacion(day) {
        return getDayAnticipacion(day);
    }
}

function getDayAnticipacion(day) {
    var date = new Date();
    date.setDate(date.getDate() + day);
    return date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()
}

export default reservas_anticipacion