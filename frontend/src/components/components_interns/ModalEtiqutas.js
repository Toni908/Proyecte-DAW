import React, {useState} from "react";
import {Modal} from "react-bootstrap";
import "./ModalShare.css";
import {HashLink} from "react-router-hash-link";

function ModalEtiquetas(props) {
    const [show, setShow] = useState(false);

    if (props.etiquetas!==undefined) {
        return (
            <div className={"modal-80w"}>
                <HashLink to="#etiquetas" className="button-share show-more" onClick={() => setShow(true)}>
                    Mostrar Las Etiquetas
                </HashLink>

                <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    dialogClassName="modal-80w"
                    aria-labelledby="modalEtiquetas"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="modalEtiquetas">
                            <div className={"fw-bold pb-2 text-capitalize"}>¿Que etiquetas tiene?</div>
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
                    </Modal.Body>
                </Modal>
            </div>
        );
    } else {
        return("<div>Loading...</div>")
    }
}

export default ModalEtiquetas