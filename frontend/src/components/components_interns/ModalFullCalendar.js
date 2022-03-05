import {useForm} from "react-hook-form";
import {Modal} from "react-bootstrap";
import React from "react";
import axios from "axios";

import SelectHorario from "./SelectHorario";

import {formatDateEN,sendEmail,canClientReservar,formatDateES,filterArrayFromDate,isClosed, getHoursDate} from "./utilities/bookings.js";
import Translate from "../../locales/Translate";

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
        fecha: formatDateEN(props.date,props.time),
        id_restaurante: data.id_restaurante
    })
        .then((result) => {
            if (result.data["message"]==="OKEY") {
                handleShow(false);
                document.getElementById("success").hidden = false;
                setTimeout(function (){document.getElementById("success").hidden = true;},2000);
                sendEmail(result.data["correo"],"https://www."+process.env.REACT_APP_URL+"/comment/"+result.data["id"])
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
                        <div className={"text-center"}><Translate string={"welcome-to"}/> {props.restaurant.nombre}!</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {new Date(props.date) > props.lessResult &&
                    <>
                        {props.time==="" && canClientReservar(props.date,props.reservas,props.horario,props.aforo) && new Date(props.periodos[0].fecha_fin) >= props.date &&
                        <>
                            <h5 className={"w-100 text-center pb-1"}><Translate string={"choose-hour"}/></h5>
                            <div className={"d-flex flex-row justify-content-center align-self-center pb-3"}>
                                <div className={"pt-2 pe-1"}><Translate string={"booking-at"}/> {formatDateES(props.date)} -</div>
                                <SelectHorario date={props.date} horario={props.horario} onChange={handleChange}/>
                            </div>
                        </>
                        }
                        {filterArrayFromDate(props.reservas, props.date, props.time) >= props.aforo &&
                        <>
                            <h5 className={"w-100 text-center pb-1"}><Translate string={"choose-hour"}/></h5>
                            <div className={"d-flex flex-row justify-content-center align-self-center pb-3"}>
                                <div className={"pt-2 pe-1"}><Translate string={"booking-at"}/> {formatDateES(props.date)} -</div>
                                <SelectHorario date={props.date} horario={props.horario} onChange={handleChange}/>
                            </div>
                        </>}

                        {!canClientReservar(props.date, props.reservas,props.horario,props.aforo) && !isClosed(props.date,props.horario) &&
                        <div className={"text-center pb-3"}>
                            <h5><Translate string={"no-available-booking"}/></h5>
                        </div>}
                        {isClosed(props.date,props.horario) &&
                        <div className={"text-center pb-3"}>
                            <h5><Translate string={"no-available-booking"}/></h5>
                        </div>}


                        {filterArrayFromDate(props.reservas, props.date, props.time) >= props.aforo &&
                        <>
                            <div className={"fw-bold"}>
                                <i className="bi bi-info-circle pe-2 text-danger"/>
                                <Translate string={"capacity-max-booking"}/> {formatDateES(props.date)} {getHoursDate(props.date)}
                            </div>
                        </>
                        }
                        {filterArrayFromDate(props.reservas, props.date, props.time) < props.aforo &&
                        <>
                            {new Date(props.periodos[0].fecha_fin)>props.date &&
                            <>
                                {isClosed(props.date, props.horario) &&
                                <>
                                    <div className={"fw-bold"}>
                                        <i className="bi bi-info-circle pe-2 text-danger"/>
                                        <Translate string={"closed-booking"}/>
                                    </div>
                                </>}
                                {!isClosed(props.date, props.horario) &&
                                <>
                                    {!canClientReservar(props.date, props.reservas,props.horario,props.aforo) &&
                                    <>
                                        <div className={"fw-bold"}>
                                            <i className="bi bi-info-circle pe-2 text-danger"/>
                                            <Translate string={"max-capacity-day-booking"}/>
                                             {formatDateES(props.date)}
                                        </div>
                                    </>
                                    }
                                    {canClientReservar(props.date, props.reservas,props.horario,props.aforo) &&
                                    <>
                                        {props.time==="" &&
                                        <>
                                            <div className={"px-3 text-secondary font-size-simple"}>
                                                <i className="bi bi-info-circle pe-2 text-warning"/>
                                                 <Translate string={"select-hour-booking"}/>
                                            </div>
                                        </>}
                                        {props.time!=="" &&
                                        <>
                                            <h5 className={"w-100 text-center pb-1"}><Translate string={"make-booking"}/></h5>
                                            <div className={"d-flex flex-row justify-content-center align-self-center pb-3"}>
                                                <div className={"pt-2 pe-1"}><Translate string={"make-booking-on"}/> {formatDateES(props.date)} -</div>
                                                <SelectHorario date={props.date} horario={props.horario} onChange={handleChange}/>
                                            </div>
                                            <div className={"px-3 text-secondary font-size-simple"}>
                                                <i className="bi bi-info-circle pe-2 text-warning"/>
                                                <Translate string={"capacity-rest"}/> {props.time.split(":")[0]}h <Translate string={"is"}/> {props.aforo-filterArrayFromDate(props.reservas, props.date,props.time)}
                                            </div>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className={"row"}>
                                                    <div className={"col-lg-6 col-12 py-2"}>
                                                        <div className={""}><Translate string={"form-booking-person"}/></div>
                                                        <label className={"w-100"}>
                                                            <input className={"w-100 form-input"} type="number" {...register("personas", { min: 1, max: props.aforo-filterArrayFromDate(props.reservas, props.date, props.time), required: true})} />
                                                        </label>
                                                        {errors.personas && <span className={"text-danger"}><Translate string={"form-booking-person-error"}/>{props.aforo-filterArrayFromDate(props.reservas, props.date,props.time)}</span>}
                                                    </div>
                                                    <div className={"col-lg-6 col-12 py-2"}>
                                                        <div className={""}><Translate string={"form-booking-email"}/></div>
                                                        <label className={"w-100"}>
                                                            <input className={"w-100 form-input"} {...register("email", { pattern: "/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/" , max:40, required: true })} />
                                                        </label>
                                                        {errors.email && <span className={"text-danger"}><Translate string={"form-booking-email-error"}/></span>}
                                                    </div>
                                                    <div className={"col-lg-6 col-12 py-2"}>
                                                        <div className={""}><Translate string={"form-booking-phone"}/></div>
                                                        <label className={"w-100"}>
                                                            <input className={"w-100 form-input"} type={"number"} {...register("telefono", { minLength: 7, required: true })} />
                                                        </label>
                                                        {errors.telefono && <span className={"text-danger"}><Translate string={"form-booking-phone-error"}/></span>}
                                                    </div>
                                                    <div className={"col-lg-6 col-12 py-2"}>
                                                        <div className={""}><Translate string={"form-booking-name"}/></div>
                                                        <label className={"w-100"}>
                                                            <input className={"w-100 form-input"} {...register("nombre", { maxLength: 30, required: true })} />
                                                        </label>
                                                        {errors.nombre && <span className={"text-danger"}><Translate string={"form-booking-name-error"}/></span>}
                                                    </div>
                                                    <div className={"col-lg-6 col-12 py-2"}>
                                                        <div className={""}><Translate string={"form-booking-lenguaje"}/></div>
                                                        <label className={"w-100"}>
                                                            <input className={"w-100 form-input"} {...register("lenguaje", { max: 2, min: 2, required: true })} />
                                                        </label>
                                                        {errors.lenguaje && <span className={"text-danger"}><Translate string={"form-booking-lenguaje-error"}/></span>}
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
                                    <Translate string={"season-finished"}/>
                                </div>
                            </>
                            }
                        </>}
                    </>}
                    {new Date(props.date) < props.lessResult &&
                    <div className={"text-center"}>
                        <div className={"text-center"}>
                            <h5><Translate string={"booking-no-available"}/></h5>
                        </div>
                        <br/>
                        <div className={"fw-bold pb-3"}>
                            <i className="bi bi-info-circle pe-2 fw-bold text-danger"/>
                            <Translate string={"booking-no-available-on"}/> {formatDateES(props.date)}
                        </div>
                        {props.result!==undefined &&
                        <div className={"px-3 text-secondary font-size-simple"}>
                            <i className="bi bi-info-circle pe-2 fw-bold text-warning"/>
                            <Translate string={"booking-only-accepts-bookings-after"}/> {formatDateES(props.result)}
                        </div>}
                    </div>}
                </Modal.Body>
            </Modal>
            <aside className="d-flex flex-column pt-5">
                <div className="row pb-2">
                    <div className="col-2 box-color background-TYPE-5"/>
                    <div className="col-10">
                        <Translate string={"lejenda-cant"}/>
                    </div>
                </div>
                <div className="row pb-2">
                    <div className="col-2 box-color bg-white"/>
                    <div className="col-10">
                        <Translate string={"lejenda-can"}/>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default ModalFullCalendar