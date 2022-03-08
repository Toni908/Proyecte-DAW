import React, {useState} from "react";
import { LocaleContext } from "../../LocaleContext.js";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import es from '@fullcalendar/core/locales/es';
import ca from '@fullcalendar/core/locales/ca';

import ModalFullCalendar from "./ModalFullCalendar";

import reservas_anticipacion from "./utilities/reservas_anticipacion";
import {canClientReservar, isClosed} from "./utilities/bookings.js";

import "./FullCalendarReservas.css";
import Translate from "../../locales/Translate";


function FullCalendarReservas(props) {
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(false);
    const [time, setTime] = useState("");

    function handleShow(value) {
        setShow(value);
    }
    function handleDate(value) {
        setDate(value);
    }
    function handleTime(value) {
        setTime(value);
    }

    const {reservas, dia_minimo, aforo, restaurant, horario, periodo} = props;
    let periodos = Object.values(periodo);

    let result = reservas_anticipacion.getDateAnticipacion(dia_minimo);
    let lessResult = reservas_anticipacion.getDateLessAnticipacion(result)


    /// EXPLICACION PORQUE LO HAGO CON IFS ->
    /*
        1-> EL LOCALE DE FULLCALENDAR ES UN ARCHIVO QUE SE IMPORTA SEGUN EL IDIOMA Y NO PUEDE SER UN STRING
        2-> MAS PERSONALIZABLE, PUEDO HACER QUE EN ALGUNOS IDIOMAS PUEDA PERSONALIZAR O CAMBIAR COLORES

        EL QUE ESTA MAL-> Pues es el mismo codigo o mismos plugings, y gasta mas recursos de lo que deberia
     */
    if (LocaleContext._currentValue==="es") {
        return (
            <>
                <FullCalendar
                    height={"800px"}
                    locale={es}
                    initialDate={result}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    fixedWeekCount={false}
                    nowIndicator={true}
                    headerToolbar={{
                        center: 'dayGridMonth,timeGridWeek,timeGridDay',
                        end: "prev,next"
                    }}
                    dayCellDidMount={function (arg) {
                        arg.el.innerHTML = "<div class='p-0 m-0'><div class='d-flex flex-row justify-content-end pe-2 py-4 height-from-cells'>"+arg.el.innerText+"</div></div>";
                        if (arg.date>=new Date(lessResult)) {
                            // EN ROJO SI YA NO SE PUEDE HACER MAS RESERVAS
                            if (!canClientReservar(arg.date, reservas,horario,aforo)) {
                                arg.el.style.backgroundColor = "rgba(216,230,242,1)";
                            } else {
                                // ESTA CERRADO ESE DIA?
                                if (isClosed(arg.date, horario,reservas,aforo)) {
                                    arg.el.style.backgroundColor = "rgba(216,230,242,1)";
                                } else {
                                    // HA TERMINADO LA TEMPORADA
                                    if (new Date(periodos[0].fecha_fin)<arg.date) {
                                        arg.el.style.backgroundColor = "rgba(216,230,242,1)";
                                    } else {
                                        arg.el.innerHTML = "<div class='pe-2 pt-2 text-success height-from-cells'><i class=\"bi bi-check fs-4 d-flex flex-row justify-content-end\"/><div class='d-flex flex-row justify-content-end'>"+arg.el.innerText+"</div></div>";
                                    }
                                }
                            }
                        } else {
                            arg.el.style.backgroundColor = "rgba(216,230,242,1)";
                        }
                        // arg.el.style.border = "#51718C solid 2px";
                    }}
                    dateClick={(e) => {setShow(true); setDate(new Date(e.date));}}
                    eventClick={(arg) => {setShow(true); setDate(arg.event.start);}}
                />
                <div id={"success"} className={"message-success"} hidden={true}><Translate string={"message-success"}/></div>
                <div id={"error"} className={"message-error"} hidden={true}><Translate string={"message-error"}/></div>
                <ModalFullCalendar restaurant={restaurant} date={date} time={time} periodos={periodos} result={result} lessResult={lessResult} reservas={reservas} horario={horario} aforo={aforo} show={show} onShow={handleShow} onDate={handleDate} onTime={handleTime}/>
            </>
        )
    } else if (LocaleContext._currentValue==="ca") {
        return (
            <>
                <FullCalendar
                    height={"700px"}
                    locale={ca}
                    initialDate={result}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    fixedWeekCount={false}
                    nowIndicator={true}
                    headerToolbar={{
                        center: 'dayGridMonth,timeGridWeek,timeGridDay',
                        end: "prev,next"
                    }}
                    dayCellDidMount={function (arg) {
                        arg.el.innerHTML = "<div class='d-flex flex-row justify-content-end pe-2 py-4 height-from-cells'>"+arg.el.innerText+"</div>";
                        if (arg.date>=new Date(lessResult)) {
                            // EN ROJO SI YA NO SE PUEDE HACER MAS RESERVAS
                            if (!canClientReservar(arg.date, reservas,horario,aforo)) {
                                arg.el.style.backgroundColor = "rgba(216,230,242,1)";
                            } else {
                                // ESTA CERRADO ESE DIA?
                                if (isClosed(arg.date, horario,reservas,aforo)) {
                                    arg.el.style.backgroundColor = "rgba(216,230,242,1)";
                                } else {
                                    // HA TERMINADO LA TEMPORADA
                                    if (new Date(periodos[0].fecha_fin)<arg.date) {
                                        arg.el.style.backgroundColor = "rgba(216,230,242,1)";
                                    } else {
                                        arg.el.innerHTML = "<div class='h-100 pe-2 pt-2 text-success height-from-cells'><i class=\"bi bi-check fs-4 d-flex flex-row justify-content-end\"/><div class='d-flex flex-row justify-content-end'>"+arg.el.innerText+"</div></div>";
                                    }
                                }
                            }
                        } else {
                            arg.el.style.backgroundColor = "rgba(216,230,242,1)";
                        }
                        arg.el.style.border = "ECFBFF solid 2px";
                    }}
                    dateClick={(e) => {setShow(true); setDate(new Date(e.date));}}
                    eventClick={(arg) => {setShow(true); setDate(arg.event.start);}}
                />
                <div id={"success"} className={"message-success"} hidden={true}><Translate string={"message-success"}/></div>
                <div id={"error"} className={"message-error"} hidden={true}><Translate string={"message-error"}/></div>
                <ModalFullCalendar restaurant={restaurant} date={date} time={time} periodos={periodos} lessResult={lessResult} result={result} reservas={reservas} horario={horario} aforo={aforo} show={show} onShow={handleShow} onDate={handleDate} onTime={handleTime}/>
            </>
        )
    } else {
        return (
            <>
                <FullCalendar
                    height={"700px"}
                    initialDate={result}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    fixedWeekCount={false}
                    nowIndicator={true}
                    headerToolbar={{
                        center: 'dayGridMonth,timeGridWeek,timeGridDay',
                        end: "prev,next"
                    }}
                    dayCellDidMount={function (arg) {
                        arg.el.innerHTML = "<div class='d-flex flex-row justify-content-end pe-2 py-4 height-from-cells'>"+arg.el.innerText+"</div>";
                        if (arg.date>=new Date(lessResult)) {
                            // EN ROJO SI YA NO SE PUEDE HACER MAS RESERVAS
                            if (!canClientReservar(arg.date, reservas,horario,aforo)) {
                                arg.el.style.backgroundColor = "rgba(216,230,242,1)";
                            } else {
                                // ESTA CERRADO ESE DIA?
                                if (isClosed(arg.date, horario,reservas,aforo)) {
                                    arg.el.style.backgroundColor = "rgba(216,230,242,1)";
                                } else {
                                    // HA TERMINADO LA TEMPORADA
                                    if (new Date(periodos[0].fecha_fin)<arg.date) {
                                        arg.el.style.backgroundColor = "rgba(216,230,242,1)";
                                    } else {
                                        arg.el.innerHTML = "<div class='h-100 pe-2 pt-2 text-success height-from-cells'><i class=\"bi bi-check fs-4 d-flex flex-row justify-content-end\"/><div class='d-flex flex-row justify-content-end'>"+arg.el.innerText+"</div></div>";
                                    }
                                }
                            }
                        } else {
                            arg.el.style.backgroundColor = "rgba(216,230,242,1)";
                        }
                        arg.el.style.border = "ECFBFF solid 2px";
                    }}
                    dateClick={(e) => {setShow(true); setDate(new Date(e.date)); return false}}
                    eventClick={(arg) => {setShow(true); setDate(arg.event.start); return false}}
                />
                <div id={"success"} className={"message-success"} hidden={true}><Translate string={"message-success"}/></div>
                <div id={"error"} className={"message-error"} hidden={true}><Translate string={"message-error"}/></div>
                <ModalFullCalendar restaurant={restaurant} date={date} time={time} periodos={periodos} lessResult={lessResult} result={result} reservas={reservas} horario={horario} aforo={aforo} show={show} onShow={handleShow} onDate={handleDate} onTime={handleTime}/>
            </>
        )
    }
}

export default FullCalendarReservas;