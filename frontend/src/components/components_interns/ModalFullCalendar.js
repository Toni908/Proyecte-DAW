import {useForm} from "react-hook-form";
import {Modal} from "react-bootstrap";
import React from "react";
import axios from "axios";

import SelectHorario from "./SelectHorario";

import bookings from "./utilities/bookings.js";

function ModalFullCalendar(props) {

    function handleShow(value) {
        props.onShow(value);
    }
    function handleDate(value) {
        props.onDate(value);
    }
    function handleTime(value) {
        props.onTime(value);
    }
    function handleChange(time) {
        props.onTime(time);
    }

    let ip = process.env.REACT_APP_API_URL;
    const onSubmit = data => axios.post( ip + '/reserva', {
        personas: data.personas,
        correo: data.email,
        telefono: data.telefono,
        nombre: data.nombre,
        lenguaje: data.lenguaje,
        fecha: bookings.formatDateEN(props.date,props.time),
        id_restaurante: data.id_restaurante
    })
        .then((result) => {
            if (result.data["message"]==="OKEY") {
                handleShow(false);
                document.getElementById("success").hidden = false;
                setTimeout(function (){document.getElementById("success").hidden = true;},2000);
                // bookings.sendEmail(result.data["correo"],"https://www."+process.env.REACT_APP_URL+"/comment/"+result.data["id"])
                setTimeout(function (){window.location.reload()},2100);
            } else {
                handleShow(false);
                document.getElementById("error").hidden = false;
                setTimeout(function (){document.getElementById("error").hidden = true;},2000);
            }
        }).catch((err) => {
            alert(err)
        });
    const { register, handleSubmit, formState: { errors } } = useForm();

    return(
        <>
            <Modal
                show={props.show}
                onHide={() => {handleShow(false); handleDate(new Date(props.date)); handleTime(""); return false}}
                dialogClassName="modal-80w"
                aria-labelledby="modalReserva"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modalReserva" className={"w-100"}>
                        <div className={"text-center"}>Bienvenido a {props.restaurant.nombre}!</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {new Date(props.date) > props.lessResult &&
                    <>
                        {props.time==="" && bookings.canClientReservar(props.date,props.reservas,props.horario,props.aforo) && new Date(props.periodos[0].fecha_fin) >= props.date &&
                        <>
                            <h5 className={"w-100 text-center pb-1"}>Elige una hora!</h5>
                            <div className={"d-flex flex-row justify-content-center align-self-center pb-3"}>
                                <div className={"pt-2 pe-1"}>Realizar reserva para el {bookings.formatDateES(props.date)} -</div>
                                <SelectHorario date={props.date} horario={props.horario} onChange={handleChange}/>
                            </div>
                        </>
                        }
                        {bookings.filterArrayFromDate(props.reservas, props.date, props.time) >= props.aforo &&
                        <>
                            <h5 className={"w-100 text-center pb-1"}>Elige una hora!</h5>
                            <div className={"d-flex flex-row justify-content-center align-self-center pb-3"}>
                                <div className={"pt-2 pe-1"}>Realizar reserva para el {bookings.formatDateES(props.date)} -</div>
                                <SelectHorario date={props.date} horario={props.horario} onChange={handleChange}/>
                            </div>
                        </>}

                        {!bookings.canClientReservar(props.date, props.reservas,props.horario,props.aforo) && !bookings.isClosed(props.date,props.horario) &&
                        <div className={"text-center pb-3"}>
                            <h5>Reserva no disponible!</h5>
                        </div>}
                        {bookings.isClosed(props.date,props.horario) &&
                        <div className={"text-center pb-3"}>
                            <h5>Reserva no disponible!</h5>
                        </div>}


                        {bookings.filterArrayFromDate(props.reservas, props.date, props.time) >= props.aforo &&
                        <>
                            <div className={"fw-bold"}>
                                <i className="bi bi-info-circle pe-2 text-danger"/>
                                Ya no permite mas aforo el restaurante en la fecha {bookings.formatDateES(props.date)} {bookings.getHoursDate(props.date)}
                            </div>
                        </>
                        }
                        {bookings.filterArrayFromDate(props.reservas, props.date, props.time) < props.aforo &&
                        <>
                            {new Date(props.periodos[0].fecha_fin)>props.date &&
                            <>
                                {bookings.isClosed(props.date, props.horario) &&
                                <>
                                    <div className={"fw-bold"}>
                                        <i className="bi bi-info-circle pe-2 text-danger"/>
                                        No es posible realizar la reserva, el restaurante estara cerrado!
                                    </div>
                                </>}
                                {!bookings.isClosed(props.date, props.horario) &&
                                <>
                                    {!bookings.canClientReservar(props.date, props.reservas,props.horario,props.aforo) &&
                                    <>
                                        <div className={"fw-bold"}>
                                            <i className="bi bi-info-circle pe-2 text-danger"/>
                                            Lo lamentamos mucho no es posible realizar mas reservas el dia {bookings.formatDateES(props.date)}
                                        </div>
                                    </>
                                    }
                                    {bookings.canClientReservar(props.date, props.reservas,props.horario,props.aforo) &&
                                    <>
                                        {props.time==="" &&
                                        <>
                                            <div className={"px-3 text-secondary font-size-simple"}>
                                                <i className="bi bi-info-circle pe-2 text-warning"/>
                                                Para seguir con la realizacion de la reserva selecione una hora de las posibles situada arriba a la derecha de la fecha
                                            </div>
                                        </>}
                                        {props.time!=="" &&
                                        <>
                                            <h5 className={"w-100 text-center pb-1"}>Ralizar una reserva!</h5>
                                            <div className={"d-flex flex-row justify-content-center align-self-center pb-3"}>
                                                <div className={"pt-2 pe-1"}>Realizar reserva para el {bookings.formatDateES(props.date)} -</div>
                                                <SelectHorario date={props.date} horario={props.horario} onChange={handleChange}/>
                                            </div>
                                            <div className={"px-3 text-secondary font-size-simple"}>
                                                <i className="bi bi-info-circle pe-2 text-warning"/>
                                                Personas restante a las {props.time.split(":")[0]}h es {props.aforo-bookings.filterArrayFromDate(props.reservas, props.date,props.time)}
                                            </div>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className={"row"}>
                                                    <div className={"col-lg-6 col-12 py-2"}>
                                                        <div className={""}>Personas:</div>
                                                        <label className={"w-100"}>
                                                            <input className={"w-100 form-input"} type="number" {...register("personas", { min: 1, max: props.aforo-bookings.filterArrayFromDate(props.reservas, props.date, props.time), required: true})} />
                                                        </label>
                                                        {errors.personas && <span className={"text-danger"}>El minimo es 1 y maximo es {props.aforo-bookings.filterArrayFromDate(props.reservas, props.date,props.time)}</span>}
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
                                                            <input className={"w-100 form-input"} {...register("nombre", { maxLength: 30, required: true })} />
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
                                                <input hidden value={props.restaurant.id_restaurante} {...register("id_restaurante", { required: true })} readOnly={true}/>
                                                <input type="submit" className={"btn btn-outline-dark"}/>
                                            </form>
                                        </>}
                                    </>}
                                </>}
                            </>}
                            {new Date(props.periodos[0].fecha_fin) < props.date &&
                            <>
                                <div className={"fw-bold pb-3"}>
                                    <i className="bi bi-info-circle pe-2 fw-bold text-danger"/>
                                    No puedes realizar reservas, la temporada habra terminado
                                </div>
                            </>
                            }
                        </>}
                    </>}
                    {new Date(props.date) < props.lessResult &&
                    <div className={"text-center"}>
                        <div className={"text-center"}>
                            <h5>Reserva no disponible!</h5>
                        </div>
                        <br/>
                        <div className={"fw-bold pb-3"}>
                            <i className="bi bi-info-circle pe-2 fw-bold text-danger"/>
                            No es posible realizar la reserva el dia {bookings.formatDateES(props.date)}
                        </div>
                        <div className={"px-3 text-secondary font-size-simple"}>
                            <i className="bi bi-info-circle pe-2 fw-bold text-warning"/>
                            Ten encuenta que el restaurante solo acepta reservas desde el dia {bookings.formatDateES(props.result)}
                        </div>
                    </div>}
                </Modal.Body>
            </Modal>
            <aside className="d-flex flex-column pt-5">
                <div className="row pb-2">
                    <div className="col-2 box-color background-TYPE-5"/>
                    <div className="col-10">
                        No puedes realizar la reserva
                    </div>
                </div>
                <div className="row pb-2">
                    <div className="col-2 box-color bg-white"/>
                    <div className="col-10">
                        Reservas disponibles
                    </div>
                </div>
            </aside>
        </>
    )
}

export default ModalFullCalendar