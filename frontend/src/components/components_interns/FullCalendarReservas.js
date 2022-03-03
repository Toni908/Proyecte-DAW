import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { LocaleContext } from "../../LocaleContext.js";
import {Modal} from "react-bootstrap";
import axios from "axios";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import es from '@fullcalendar/core/locales/es';
import ca from '@fullcalendar/core/locales/ca';

import SelectHorario from "./SelectHorario";

import schedule from "./utilities/schedule";
import reservas_anticipacion from "./utilities/reservas_anticipacion";

import "./FullCalendarReservas.css";


function FullCalendarReservas(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(false);
    const [time, setTime] = useState("");

    function handleChange(time) {
        setTime(time);
    }

    const {reservas, dia_minimo, aforo, restaurant, horario, periodo} = props;
    let periodos = Object.values(periodo);

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
                setTimeout(function (){window.location.reload()},2100);
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
                    height={"100vh"}
                    locale={es}
                    initialDate={result}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    nowIndicator={true}
                    headerToolbar={{
                        center: 'dayGridMonth,timeGridWeek,timeGridDay',
                        end: "prev,next"
                    }}
                    dayHeaderDidMount={function (arg) {
                        arg.el.innerHTML = "<div class='text-center text-black'>"+arg.el.innerText+"</div>";
                    }}
                    dayCellDidMount={function (arg) {
                        arg.el.innerHTML = "<div class='d-flex flex-row justify-content-end pe-2 pt-2'>"+arg.el.innerText+"</div>";
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
                                        // arg.el.style.backgroundColor = "#749EE3";
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
                <div id={"success"} className={"message-success"} hidden={true}>Se a creado correctamente</div>
                <div id={"error"} className={"message-error"} hidden={true}>El restaurante no se puede permitir tu aforo</div>
                <Modal
                    show={show}
                    onHide={() => {setShow(false); setDate(new Date(date)); setTime(""); return false}}
                    dialogClassName="modal-80w"
                    aria-labelledby="modalReserva"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="modalReserva" className={"w-100"}>
                            <div className={"text-center"}>Bienvenido a {restaurant.nombre}!</div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {new Date(date) > lessResult &&
                            <>
                                {time==="" && canClientReservar(date, reservas,horario,aforo) &&
                                    <>
                                        <h5 className={"w-100 text-center pb-1"}>Elige una hora!</h5>
                                        <div className={"d-flex flex-row justify-content-center align-self-center pb-3"}>
                                            <div className={"pt-2 pe-1"}>Realizar reserva para el {formatDateES(date)} -</div>
                                            <SelectHorario date={date} horario={horario} onChange={handleChange}/>
                                        </div>
                                    </>
                                }

                                {!canClientReservar(date, reservas,horario,aforo) && !isClosed(date,horario) &&
                                <div className={"text-center pb-3"}>
                                    <h5>Reserva no disponible!</h5>
                                </div>}
                                {isClosed(date,horario) &&
                                <div className={"text-center pb-3"}>
                                    <h5>Reserva no disponible!</h5>
                                </div>}




                                {filterArrayFromDate(reservas, date, time) >= aforo &&
                                    <>
                                        <div className={"fw-bold"}>
                                            <i className="bi bi-info-circle pe-2 text-danger"/>
                                            Ya no permite mas aforo el restaurante en la fecha {formatDateES(date)} {getHoursDate(date)}
                                        </div>
                                    </>
                                }
                                {filterArrayFromDate(reservas, date, time) < aforo &&
                                    <>
                                        {new Date(periodos[0].fecha_fin)>date &&
                                            <>
                                                {isClosed(date, horario) &&
                                                <>
                                                    <div className={"fw-bold"}>
                                                        <i className="bi bi-info-circle pe-2 text-danger"/>
                                                        No es posible realizar la reserva, el restaurante estara cerrado!
                                                    </div>
                                                </>}
                                                {!isClosed(date, horario) &&
                                                <>
                                                    {!canClientReservar(date, reservas,horario,aforo) &&
                                                        <>
                                                            <div className={"fw-bold"}>
                                                                <i className="bi bi-info-circle pe-2 text-danger"/>
                                                                Lo lamentamos mucho no es posible realizar mas reservas el dia {formatDateES(date)}
                                                            </div>
                                                        </>
                                                    }
                                                    {canClientReservar(date, reservas,horario,aforo) &&
                                                        <>
                                                            {time==="" &&
                                                                <>
                                                                    <div className={"px-3 text-secondary font-size-simple"}>
                                                                        <i className="bi bi-info-circle pe-2 text-warning"/>
                                                                        Para seguir con la realizacion de la reserva selecione una hora de las posibles situada arriba a la derecha de la fecha
                                                                    </div>
                                                                </>}
                                                            {time!=="" &&
                                                            <>
                                                                <h5 className={"w-100 text-center pb-1"}>Ralizar una reserva!</h5>
                                                                <div className={"d-flex flex-row justify-content-center align-self-center pb-3"}>
                                                                    <div className={"pt-2 pe-1"}>Realizar reserva para el {formatDateES(date)} -</div>
                                                                    <SelectHorario date={date} horario={horario} onChange={handleChange}/>
                                                                </div>
                                                                <div className={"px-3 text-secondary font-size-simple"}>
                                                                    <i className="bi bi-info-circle pe-2 text-warning"/>
                                                                    Personas restante a las {time.split(":")[0]}h es {aforo-filterArrayFromDate(reservas, date, time)}
                                                                </div>
                                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                                    <div className={"row"}>
                                                                        <div className={"col-lg-6 col-12 py-2"}>
                                                                            <div className={""}>Personas:</div>
                                                                            <label className={"w-100"}>
                                                                                <input className={"w-100 form-input"} type="number" {...register("personas", { min: 1, max: aforo-filterArrayFromDate(reservas, date, time), required: true})} />
                                                                            </label>
                                                                            {errors.personas && <span className={"text-danger"}>El minimo es 1 y maximo es {aforo-filterArrayFromDate(reservas, date,time)}</span>}
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
                                                                    <input hidden value={restaurant.id_restaurante} {...register("id_restaurante", { required: true })} readOnly={true}/>
                                                                    <input type="submit" className={"btn btn-outline-dark"}/>
                                                                </form>
                                                            </>}
                                                        </>}
                                                </>}
                                            </>}
                                        {new Date(periodos[0].fecha_fin) < date &&
                                            <>
                                                <div className={"fw-bold pb-3"}>
                                                    <i className="bi bi-info-circle pe-2 fw-bold text-danger"/>
                                                    No puedes realizar reservas, la temporada habra terminado
                                                </div>
                                            </>
                                        }
                                    </>}
                            </>}
                        {new Date(date) < lessResult &&
                        <div className={"text-center"}>
                            <div className={"text-center"}>
                                <h5>Reserva no disponible!</h5>
                            </div>
                            <br/>
                            <div className={"fw-bold pb-3"}>
                                <i className="bi bi-info-circle pe-2 fw-bold text-danger"/>
                                No es posible realizar la reserva el dia {formatDateES(date)}
                            </div>
                            <div className={"px-3 text-secondary font-size-simple"}>
                                <i className="bi bi-info-circle pe-2 fw-bold text-warning"/>
                                Ten encuenta que el restaurante solo acepta reservas desde el dia {formatDateES(result)}
                            </div>
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

    var resultProductData = reservas.filter(a => {
        var date = new Date(a.fecha);
        return (date >= startDate && date <= endDate);
    });
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

function isClosed(date, horario) {
    let newHorario = [];
    if (!Array.isArray(horario)) {
        newHorario = Object.values(horario)
    }
    for (let i = 0; i < newHorario.length; i++) {
        let number = schedule.getDayNumber(newHorario[i].day);
        if (number===date.getDay()) {
            return false;
        }
    }
    return true;
}

export default FullCalendarReservas;