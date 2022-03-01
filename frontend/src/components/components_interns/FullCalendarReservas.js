import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { LocaleContext } from "../../LocaleContext.js";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import es from '@fullcalendar/core/locales/es';
import ca from '@fullcalendar/core/locales/ca';
import TimeField from 'react-simple-timefield';

import reservas_anticipacion from "./utilities/reservas_anticipacion";
import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import "./FullCalendarReservas.css";

function FullCalendarReservas(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(false);
    const [time, setTime] = useState(false);

    const {reservas, dia_minimo, aforo, id_restaurante} = props;

    let ArrayReservas = getArrayReservas(reservas);

    let result = reservas_anticipacion.getDateAnticipacion(dia_minimo);
    let lessResult = reservas_anticipacion.getDateLessAnticipacion(result)

    let ip = process.env.REACT_APP_API_URL;

    const onSubmit = data => axios.post( ip + '/reserva', {
        personas: data.personas,
        correo: data.email,
        telefono: data.telefono,
        nombre: data.nombre,
        lenguaje: data.lenguaje,
        fecha: formatDateEN(date,time),
        id_restaurante: data.id_restaurante
    })
        .then((result) => {
            // console.log(result) // ESTO ES UNA AYUDA PARA SABER LO QUE ME A MANDADO EL CONTROLLER DE LARAVEL
            if (result.data==="OKEY") {
                setShow(false);
                document.getElementById("success").hidden = false;
                setTimeout(function (){document.getElementById("success").hidden = true;},2000);
            } else {
                setShow(false);
                document.getElementById("error").hidden = false;
                setTimeout(function (){document.getElementById("error").hidden = true;},2000);
            }

        }).catch((err) => {
            alert(err)
        });

    // if (LocaleContext._currentValue==="es") {
        return (
            <>
                <FullCalendar
                    locale={es}
                    initialDate={result}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    nowIndicator={true}
                    headerToolbar={{
                        center: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}
                    dateClick={(e) => {setShow(true); setDate(new Date(e.date)); setTime(getHoursDate(new Date(e.date)));}}
                    events={ArrayReservas}
                />
                <div id={"success"} className={"message-success"} hidden={true}>Se a creado correctamente</div>
                <div id={"error"} className={"message-error"} hidden={true}>El restaurante no se puede permitir tu aforo</div>
                <Modal
                    show={show}
                    onHide={() => {setShow(false); setDate(new Date(date))}}
                    dialogClassName="modal-80w"
                    aria-labelledby="modalReserva"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="modalReserva" className={"w-100"}>
                            <div className={"pt-2 text-center w-100"}>Realizar una reserva</div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {new Date(date) > lessResult &&
                            <>
                                {filterArrayFromDate(reservas, date) >= aforo &&
                                    <>
                                        <div>Ya no permite mas aforo el restaurante</div>
                                    </>
                                }
                                {filterArrayFromDate(reservas, date) < aforo &&
                                    <>
                                        <div className={"align-self-center text-center"}>
                                            La reserva se realizara el {formatDateESSimple(date)} -
                                            <TimeField className={"ms-2 w-25 form-input"} onChange={(event, time) => setTime(time)} value={time} colon=":" showSeconds={true}/>
                                        </div>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className={"row"}>
                                                <div className={"col-lg-6 col-12 py-2"}>
                                                    <div className={""}>Personas:</div>
                                                    <label className={"w-100"}>
                                                        <input className={"w-100 form-input"} type="number" {...register("personas", { min: 1, max: aforo, required: true})} />
                                                    </label>
                                                    {errors.personas && <span className={"text-danger"}>El minimo es 1 y maximo es {aforo}</span>}
                                                </div>
                                                <div className={"col-lg-6 col-12 py-2"}>
                                                    <div className={""}>Email:</div>
                                                    <label className={"w-100"}>
                                                        <input className={"w-100 form-input"} {...register("email", { pattern: "/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/" , max:40, required: true })} />
                                                    </label>
                                                    {errors.email && <span className={"text-danger"}>Debe ser un correo electronico</span>}
                                                </div>
                                                <div className={"col-lg-6 col-12 py-2"}>
                                                    <div className={""}>Telefono:</div>
                                                    <label className={"w-100"}>
                                                        <input className={"w-100 form-input"} type={"number"} {...register("telefono", { minLength: 7, required: true })} />
                                                    </label>
                                                    {errors.telefono && <span className={"text-danger"}>Longitud minima es 7</span>}
                                                </div>
                                                <div className={"col-lg-6 col-12 py-2"}>
                                                    <div className={""}>Nombre:</div>
                                                    <label className={"w-100"}>
                                                        <input className={"w-100 form-input"} {...register("nombre", { max: 40, required: true })} />
                                                    </label>
                                                    {errors.nombre && <span className={"text-danger"}>Longitud maxima es 40</span>}
                                                </div>
                                                <div className={"col-lg-6 col-12 py-2"}>
                                                    <div className={""}>Lenguaje:</div>
                                                    <label className={"w-100"}>
                                                        <input className={"w-100 form-input"} {...register("lenguaje", { max: 2, min: 2, required: true })} />
                                                    </label>
                                                    {errors.lenguaje && <span className={"text-danger"}>This field is required</span>}
                                                </div>
                                            </div>
                                            <input hidden value={id_restaurante} {...register("id_restaurante", { required: true })} readOnly={true}/>
                                            <input type="submit"/>
                                        </form>
                                        }
                                    </>}
                            </>}
                        {new Date(date) < lessResult &&
                        <div>
                            No es posible realizar la reserva el dia {formatDateESSimple(date)}
                            <br/>
                            Ten encuenta que el restaurante solo acepta reservas desde el dia {formatDateESSimple(result)}
                        </div>}
                    </Modal.Body>
                </Modal>
            </>
        )
    // } else if (LocaleContext._currentValue==="ca") {
    //     return (
    //         <>
    //             <FullCalendar
    //                 locale={ca}
    //                 initialDate={result}
    //                 plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
    //                 initialView="dayGridMonth"
    //                 dateClick={(e) => {setShow(true); setDate(e.dateStr)}}
    //                 nowIndicator={true}
    //                 headerToolbar={{
    //                     center: 'dayGridMonth,timeGridWeek,timeGridDay',
    //                 }}
    //                 events={ArrayReservas}
    //             />
    //             <Modal
    //                 show={show}
    //                 onHide={() => {setShow(false)}}
    //                 dialogClassName="modal-80w"
    //                 aria-labelledby="modalReserva"
    //             >
    //                 <Modal.Header closeButton>
    //                     <Modal.Title id="modalReserva">
    //                         <div className={"ps-2 pt-2"}>Realizar una reserva</div>
    //                     </Modal.Title>
    //                 </Modal.Header>
    //                 <Modal.Body>
    //                     {new Date(date).getDate() >= result.getDate() &&
    //                     <div>
    //                         Formulario reserva
    //                     </div>}
    //                     {new Date(date).getDate() < result.getDate() &&
    //                     <div>
    //                         No es posible realizar la reserva el dia {new Date(date).getDate()+"-"+(new Date(date).getMonth()+1)+"-"+new Date(date).getFullYear()}<br/>Ten encuenta que el restaurante solo acepta reservas desde el dia 11-3-2022
    //                     </div>}
    //                 </Modal.Body>
    //             </Modal>
    //         </>
    //
    //     )
    // } else {
    //     return (
    //         <>
    //             <FullCalendar
    //                 initialDate={result}
    //                 plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
    //                 initialView="dayGridMonth"
    //                 nowIndicator={true}
    //                 headerToolbar={{
    //                     center: 'dayGridMonth,timeGridWeek,timeGridDay',
    //                 }}
    //                 dateClick={(e) => {setShow(true); setDate(e.dateStr)}}
    //                 events={ArrayReservas}
    //             />
    //             <Modal
    //                 show={show}
    //                 onHide={() => {setShow(false)}}
    //                 dialogClassName="modal-80w"
    //                 aria-labelledby="modalReserva"
    //             >
    //                 <Modal.Header closeButton>
    //                     <Modal.Title id="modalReserva">
    //                         <div className={"ps-2 pt-2"}>Realizar una reserva</div>
    //                     </Modal.Title>
    //                 </Modal.Header>
    //                 <Modal.Body>
    //                     Hola
    //                 </Modal.Body>
    //             </Modal>
    //         </>
    //
    //     )
    // }
}

function filterArrayFromDate(array, date) {
    const result = array.filter(item => formatDateESSimple(new Date(item.fecha)) === formatDateESSimple(new Date(date)));
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
    return result.getDate()+"-"+(result.getMonth()+1)+"-"+result.getFullYear();
}

function getArrayReservas(reservas) {
    let array = [];

    // PUSH RESERVAS
    for (let i = 0; i < reservas.length; i++) {
        array.push({
            title: reservas[i].nombre,
            start: reservas[i].fecha,
            end: reservas_anticipacion.getNextHourDate(reservas[i].fecha),
            color: "blue",
            allDay: false
        })
    }

    //PUSH DIAS ABIERTOS / DIAS CERRADOS
    return array;
}

export default FullCalendarReservas;