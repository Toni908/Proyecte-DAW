import React, {useState} from "react";
import {Modal} from "react-bootstrap";
import "./ModalShare.css";
import {HashLink} from "react-router-hash-link";
import Translate from "../../locales/Translate";

function ModalEtiquetas(props) {
    const [show, setShow] = useState(false);

    if (props.etiquetas!==undefined) {
        return (
            <div className={"modal-80w"}>
                <HashLink to="#etiquetas" className="button-share show-more" onClick={() => setShow(true)}>
                    <Translate string={"show-tags"}/>
                </HashLink>

                <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    dialogClassName="modal-80w"
                    aria-labelledby="modalEtiquetas"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="modalEtiquetas" className={"w-100 text-center pt-3"}>
                            <div className={"fw-bold pb-2 text-capitalize"}>
                                <Translate string={"show-tags-title"}/>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {props.etiquetas.length > 0 &&
                        <div className={"row m-0 pt-2 p-0"}>
                            {props.etiquetas.map(function (item, key) {
                                return (
                                    <div className={"col-4 border-color-TYPE-1 text-center rounded-pill"} key={key}>
                                        <a className={"text-decoration-none"}
                                           href={"/search?etiqueta=" + item.nombre}>{item.nombre}</a>
                                    </div>
                                )
                            })}
                        </div>}
                        {props.etiquetas.length===0 &&
                        <div className={"fw-bold"}>
                            <i className="bi bi-info-circle pe-2 text-danger"/>
                            <Translate string={"show-no-tags"}/>
                        </div>}
                    </Modal.Body>
                </Modal>
            </div>
        );
    } else {
        return(<Translate string={"loading"}/>)
    }
}

export default ModalEtiquetas